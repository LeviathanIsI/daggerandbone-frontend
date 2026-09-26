const test = require('node:test');
const assert = require('node:assert/strict');
const { harness, React } = require('./public-harness.cjs');

// Run the real form handlers and API client with intercepted fetch; no listener or email.
function formHarness(file) {
  const values = [];
  let cursor = 0;
  const h = harness({
    useId: () => 'offline-form-email',
    useState(initial) {
      const index = cursor++;
      if (!(index in values)) values[index] = initial;
      return [values[index], value => { values[index] = typeof value === 'function' ? value(values[index]) : value; }];
    },
  });
  const Component = h.load(file).default;
  return () => { cursor = 0; return Component({ visibleLabel: true }); };
}
function elements(tree, predicate) {
  if (!React.isValidElement(tree)) return [];
  return [...(predicate(tree) ? [tree] : []), ...React.Children.toArray(tree.props.children).flatMap(child => elements(child, predicate))];
}
const input = (tree, type) => elements(tree, node => node.type === 'input' && node.props.type === type)[0];
const message = tree => elements(tree, node => node.props.role === 'status')[0];

test('signup preserves explicit consent, the subscription endpoint and accurate feedback', async () => {
  const originalFetch = global.fetch;
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ path: new URL(url).pathname, method: options.method, body: JSON.parse(options.body) });
    return Response.json({ message: 'Subscribed through the email service.' });
  };
  try {
    const render = formHarness('components/NewsletterForm.js');
    let tree = render();
    assert.equal(input(tree, 'checkbox').props.required, true);
    assert.equal(input(tree, 'checkbox').props.checked, false);
    assert.equal(input(tree, 'email').props.required, true);
    assert.equal(elements(tree, node => node.type === 'button')[0].props.children, 'Email me updates');
    input(tree, 'email').props.onChange({ target: { value: 'visitor@example.test' } });
    tree = render();
    input(tree, 'checkbox').props.onChange({ target: { checked: true } });
    tree = render();
    await tree.props.onSubmit({ preventDefault() {} });
    assert.deepEqual(calls, [{ path: '/api/public/subscribe', method: 'POST', body: { email: 'visitor@example.test', consent: true, website: '' } }]);
    tree = render();
    assert.equal(message(tree).props.children, 'Subscribed through the email service.');
    assert.equal(input(tree, 'email').props.value, '');
    assert.equal(input(tree, 'checkbox').props.checked, false);
  } finally { global.fetch = originalFetch; }
});

test('contact does not subscribe; a delivery error preserves entered values and shows the error', async () => {
  const originalFetch = global.fetch;
  const calls = [];
  let fail = true;
  global.fetch = async (url, options) => {
    calls.push({ path: new URL(url).pathname, body: JSON.parse(options.body) });
    return fail ? Response.json({ error: 'Message stored, but the notification could not be sent.' }, { status: 503 }) : Response.json({ message: 'Notification delivered.' });
  };
  try {
    const render = formHarness('components/ContactForm.js');
    let tree = render();
    elements(tree, node => node.type === 'input' && node.props.autoComplete === 'name')[0].props.onChange({ target: { value: 'Visitor' } });
    tree = render();
    input(tree, 'email').props.onChange({ target: { value: 'visitor@example.test' } });
    tree = render();
    elements(tree, node => node.type === 'textarea')[0].props.onChange({ target: { value: 'A question about the collection.' } });
    tree = render();
    const button = elements(tree, node => node.type === 'button')[0];
    assert.equal(button.props.children, 'Send message');
    await tree.props.onSubmit({ preventDefault() {} });
    tree = render();
    assert.equal(message(tree).props.className, 'form-message error');
    assert.match(message(tree).props.children, /could not be sent/);
    assert.equal(input(tree, 'email').props.value, 'visitor@example.test');
    assert.deepEqual(calls[0], { path: '/api/public/contact', body: { name: 'Visitor', email: 'visitor@example.test', message: 'A question about the collection.', website: '' } });
    fail = false;
    await tree.props.onSubmit({ preventDefault() {} });
    tree = render();
    assert.equal(message(tree).props.className, 'form-message success');
    assert.equal(input(tree, 'email').props.value, '');
    assert.ok(calls.every(call => call.path === '/api/public/contact'));
  } finally { global.fetch = originalFetch; }
});

test('unsubscribe and rejected subscriptions preserve the service response without false success', async () => {
  const originalFetch = global.fetch;
  const calls = [];
  global.fetch = async (url, options) => {
    const path = new URL(url).pathname;
    calls.push({ path, body: JSON.parse(options.body) });
    return path.endsWith('/subscribe') ? Response.json({ error: 'This address is unsubscribed.' }, { status: 409 }) : Response.json({ message: 'You have been unsubscribed.' });
  };
  try {
    const signup = formHarness('components/NewsletterForm.js');
    input(signup(), 'email').props.onChange({ target: { value: 'visitor@example.test' } });
    input(signup(), 'checkbox').props.onChange({ target: { checked: true } });
    await signup().props.onSubmit({ preventDefault() {} });
    assert.equal(message(signup()).props.className, 'form-message error');
    assert.equal(message(signup()).props.children, 'This address is unsubscribed.');
    assert.equal(input(signup(), 'email').props.value, 'visitor@example.test');
    const unsubscribe = formHarness('components/UnsubscribeForm.js');
    input(unsubscribe(), 'email').props.onChange({ target: { value: 'visitor@example.test' } });
    await unsubscribe().props.onSubmit({ preventDefault() {} });
    assert.equal(message(unsubscribe()).props.children, 'You have been unsubscribed.');
    assert.deepEqual(calls[1], { path: '/api/public/unsubscribe', body: { email: 'visitor@example.test' } });
  } finally { global.fetch = originalFetch; }
});

test('public form connection, validation and server errors give plain feedback without clearing input', async () => {
  const originalFetch = global.fetch;
  try {
    const render = formHarness('components/NewsletterForm.js');
    input(render(), 'email').props.onChange({ target: { value: 'visitor@example.test' } });
    input(render(), 'checkbox').props.onChange({ target: { checked: true } });
    for (const [fetchImpl, expected] of [
      [async () => { throw new TypeError('Failed to fetch'); }, /couldn.t connect to send your request/],
      [async () => Response.json({ error: 'Invalid input', details: { fieldErrors: { consent: ['Please agree to receive email updates before signing up.'] } } }, { status: 400 }), /^Please agree to receive email updates before signing up\.$/],
      [async () => Response.json({ error: 'Server error' }, { status: 500 }), /couldn.t complete your request/],
      [async () => new Response('not valid json', { headers: { 'content-type': 'application/json' } }), /couldn.t confirm the result/],
      [async () => new Response('<html>Service unavailable</html>', { headers: { 'content-type': 'text/html' } }), /couldn.t confirm the result/],
    ]) {
      global.fetch = fetchImpl;
      await render().props.onSubmit({ preventDefault() {} });
      assert.equal(message(render()).props.className, 'form-message error');
      assert.match(message(render()).props.children, expected);
      assert.equal(input(render(), 'email').props.value, 'visitor@example.test');
      assert.equal(input(render(), 'checkbox').props.checked, true);
    }
  } finally { global.fetch = originalFetch; }
});
