vi.stubGlobal('defineNuxtPlugin', vi.fn((app: any) => {
  return app
}))

vi.stubGlobal('useRuntimeConfig', vi.fn(() => {
  return { public: {}, app: { baseUrl: '' } }
}))

vi.stubGlobal('useHead', vi.fn(() => ({
  // titleTemplate: (titleChunk: string) => {
  //   return titleChunk ? `${titleChunk} - D4 Tools` : 'D4 Tools'
  // }
})))
