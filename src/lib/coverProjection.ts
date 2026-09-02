export function projectCoveredSourceY(
  viewportWidth: number,
  viewportHeight: number,
  imageWidth: number,
  imageHeight: number,
  sourceYFromBottom: number,
) {
  const screenAspect = viewportWidth / viewportHeight;
  const imageAspect = imageWidth / imageHeight;
  const verticalScale = screenAspect > imageAspect ? imageAspect / screenAspect : 1;
  const screenYFromBottom = (sourceYFromBottom - 0.5) / verticalScale + 0.5;
  return (1 - screenYFromBottom) * viewportHeight;
}
