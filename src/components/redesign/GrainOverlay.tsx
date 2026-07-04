/** Site-wide film grain. Fixed, non-interactive, blended over everything so the
 *  whole surface reads as a physical substrate rather than flat pixels. */
export function GrainOverlay() {
  return <div className="r-grain" aria-hidden />
}
