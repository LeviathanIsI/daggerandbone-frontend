'use client';

import { useEffect, useRef, useState } from 'react';

/** Entry is latched once; visibility only pauses the existing CSS animation timeline. */
export default function MotionSurface({ as: Tag = 'div', children, className = '', ...props }) {
  const root = useRef(null);
  const inView = useRef(false);
  const [state, setState] = useState({ entered: false, active: false, reduced: true });
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setState(old => ({
      entered: old.entered || (inView.current && !document.hidden),
      active: inView.current && !document.hidden,
      reduced: media.matches,
    }));
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
      inView.current = entries[0].isIntersecting;
      update();
    }, { threshold: .08 });
    if (observer) observer.observe(root.current);
    // Without observation support the complete, unanimated drawing is the safe fallback.
    update();
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer?.disconnect();
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  return <Tag {...props} ref={root} data-motion={state.reduced ? 'still' : state.active ? 'running' : 'paused'} className={`motion-surface ${className}${state.entered ? ' has-entered' : ''}${state.active ? ' is-in-view' : ''}`}>{children}</Tag>;
}
