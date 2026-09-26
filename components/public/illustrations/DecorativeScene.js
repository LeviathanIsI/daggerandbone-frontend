'use client';

import MotionSurface from '../MotionSurface';

/** Automatic decoration: no focus targets, hit areas, or playback controls. */
export default function DecorativeScene({ children, className = '' }) {
  return <MotionSurface className={`illustrated-scene ${className}`} aria-hidden="true"><div className="scene-drawing">{children}</div></MotionSurface>;
}
