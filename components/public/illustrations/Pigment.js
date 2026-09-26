/** Hand-drawn pools of pigment, separate from the preserved engraving paths.
 * Keep these inside the object group they belong to so ink and color move together.
 * Compound paths leave dry-paper gaps; the shared filter adds grain, not a glow.
 */
export default function Pigment({ id, tone = 'sea', d, light = false, transform }) {
  return <path className={`pigment-wash pigment-${tone}${light ? ' pigment-light' : ''}`}
    data-pigment={tone} d={d} fillRule="evenodd" transform={transform}
    filter={`url(#${id}-pigment)`}/>;
}
