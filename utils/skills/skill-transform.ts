interface ISkillPosition {
  x: number
  y: number
}

export const getSkillTransform = (degrees: number, radius: number): string => {
  const { x, y } = getSkillPosition(degrees, radius)

  return `translate(${x}px, ${y}px)`
}

function getSkillPosition (degrees: number, radius: number): ISkillPosition {
  const radians = (360 - degrees) * (Math.PI / 180)
  const x = radius * Math.cos(radians)
  const y = radius * Math.sin(radians)

  return { x, y }
}
