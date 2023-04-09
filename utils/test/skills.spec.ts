import { getElementCenterCoordinates } from '../skills'

describe('getElementCenterCoordinates', () => {
  test('returns the center coordinates of an element relative to its parent', () => {
    const { x, y } = getElementCenterCoordinates({
      getBoundingClientRect: vi.fn(() => ({ left: 0, right: 0, top: 0, bottom: 0 }))
    } as any,
    {
      getBoundingClientRect: vi.fn(() => ({ left: 5, right: 10, top: 5, bottom: 10 }))
    } as any)

    expect(x).toBe(7.5)
    expect(y).toBe(7.5)
  })
})
