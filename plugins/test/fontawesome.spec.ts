import fontawesome from '../fontawesome.js'

const mockNuxtApp = {
  vueApp: {
    component: vi.fn()
  }
}

describe('Fontawesome Plugin', () => {
  test('adds FontAwesomeIcon global component', () => {
    fontawesome(mockNuxtApp as any)

    expect(mockNuxtApp.vueApp.component).toHaveBeenCalledWith(
      'FontAwesomeIcon',
      expect.any(Object),
      {}
    )
  })
})
