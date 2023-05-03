import {
  getElementCenterCoordinates,
  getTierPointCount,
  getPassiveLine
} from '../skills'

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

describe('getTierPointCount', () => {
  test('returns the total skill points spent in a tier', () => {
    const mockTier = {
      name: 'Metalcore',
      rankRequired: 0,
      skills: [{
        rank: 2,
        modifier: {
          active: false,
          choiceModifiers: [{
            active: false
          }]
        }
      }, {
        rank: 1,
        modifier: {
          active: true,
          choiceModifiers: [{
            active: true
          }]
        }
      }],
      passives: [{
        items: [{
          rank: 2
        }]
      }]
    }
    const skillCount = getTierPointCount(mockTier as any)

    expect(skillCount).toBe(7)
  })
})

describe('getPassiveLine', () => {
  test('returns an array of a connected IPassiveLine', () => {
    const passive = {
      name: 'string',
      description: 'string',
      descriptionValues: '',
      icon: 'string',
      transform: 'string',
      rank: 0,
      rankMax: 3,
      connected: true
    }

    const group = {
      name: 'myGroup',
      items: [{
        name: 'string',
        description: 'string',
        descriptionValues: '',
        icon: 'string',
        transform: 'string',
        rank: 0,
        rankMax: 3,
        connected: true
      }]
    }

    const result = getPassiveLine(
      passive as any,
      group as any,
      'foo' as any,
      []
    )

    expect(JSON.stringify(result))
      .toBe(
        JSON.stringify([{
          active: false,
          el: 'foo',
          direction: '',
          path: undefined
        }])
      )
  })

  test('returns an array of a group of IPassiveLine', () => {
    const passive = {
      name: 'lolcats',
      description: 'string',
      descriptionValues: '',
      icon: 'string',
      transform: 'string',
      rank: 1,
      rankMax: 3,
      connected: false
    }

    const group = {
      name: 'myGroup',
      items: [{
        name: 'passive',
        description: 'string',
        descriptionValues: '',
        icon: 'string',
        transform: 'string',
        rank: 1,
        rankMax: 3,
        connected: true,
        requiredFor: [{ name: 'lolcats' }]
      }, {
        name: 'lolcats',
        description: 'string',
        descriptionValues: '',
        icon: 'string',
        transform: 'string',
        rank: 1,
        rankMax: 3,
        connected: true
      }]
    }

    const result = getPassiveLine(
      passive as any,
      group as any,
      'foo' as any,
      {
        passive: { $el: 'test' }
      }
    )

    expect(JSON.stringify(result))
      .toBe(
        JSON.stringify([{
          active: true,
          el: 'test',
          name: 'passive',
          path: undefined
        }])
      )
  })
})
