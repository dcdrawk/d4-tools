export const useLineCoordinates = (el1, el2) => {
  const { x: x1, y: y1 } = useElementCenterCoordinates(el1)
  const { x: x2, y: y2 } = useElementCenterCoordinates(el2)

  return { x1, y1, x2, y2 }
}

export const useElementCenterCoordinates = (el) => {
  const box = el?.getBoundingClientRect()
  const x = ((box?.left + box?.right) || 0) / 2
  const y = ((box?.top + box?.bottom) || 0) / 2

  return { x, y }
}
