// The existing signup Page is also the footer's editorial source.
// Older saved public snapshots predate that Page; keep the form usable with approved copy.
export function signupContent(site) {
  const page = site?.pages?.signup;
  return page || {
    title: 'Get the launch email.',
    intro: "We'll email you when the Kickstarter launches and occasionally share news about the collection.",
    body: 'This subscribes you to Dagger & Bone Apothecary emails. It does not follow the campaign on Kickstarter.',
  };
}
