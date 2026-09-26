import { useId } from 'react';
import { InkDefinitions } from './EngravedParts';

/** Artwork alone is masked. Paint and mask IDs remain independent even in repeated renders. */
export default function IllustrationFrame({ children, viewBox = '0 0 1000 720', className = '', scene }) {
  const id = `db-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [x, y, width, height] = viewBox.split(/\s+/).map(Number);
  return <svg className={`original-illustration ${className}`} data-scene={scene} viewBox={viewBox} width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
    <InkDefinitions id={id}/>
    <defs>
      <filter id={`${id}-feather`} x="-.2" y="-.2" width="1.4" height="1.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation=".026"/></filter>
      <mask id={`${id}-edge`} x={x} y={y} width={width} height={height} maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}>
        <g transform={`translate(${x} ${y}) scale(${width} ${height})`}>
          <path d="M.047.491C.03.298.165.106.358.079C.483.035.614.065.715.108C.899.142.974.315.948.497C.97.668.839.855.662.904C.524.959.354.935.225.858C.102.79.046.664.047.491Z" fill="white" filter={`url(#${id}-feather)`}/>
        </g>
      </mask>
    </defs>
    <g mask={`url(#${id}-edge)`}><g className="scene-artwork">{children(id)}</g></g>
  </svg>;
}
