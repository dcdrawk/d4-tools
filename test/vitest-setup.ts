vi.stubGlobal('defineNuxtPlugin', vi.fn((app: any) => {
  return app
}))

vi.stubGlobal('useRuntimeConfig', vi.fn(() => {
  return { public: {}, app: { baseUrl: '' } }
}))
