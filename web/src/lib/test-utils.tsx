import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, renderHook, RenderOptions, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'

beforeAll(() => {
  Object.defineProperty(global, 'sessionStorage', { value: mockStorage })
  Object.defineProperty(global, 'localStorage', { value: mockStorage })
  jest.spyOn(console, 'error').mockImplementation(jest.fn())
})

afterEach(() => {
  window.sessionStorage.clear()
})

const mockStorage = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: function (key: string) {
      return store[key] || null
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString()
    },
    removeItem: function (key: string) {
      delete store[key]
    },
    clear: function () {
      store = {}
    }
  }
})()

export const wrapper = (ui: ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
      <>{ui}</>
    </QueryClientProvider>
  )
}

export const renderWithProviders = async (
  ui: ReactNode,
  options: Omit<RenderOptions, 'queries'> = {}
) => {
  const rendered = await render(wrapper(ui), options)
  return {
    ...rendered,
    rerender: (ui: ReactNode, options: Omit<RenderOptions, 'queries'> = {}) =>
      renderWithProviders(ui, { container: rendered.container, ...options })
  }
}

export const renderHookWithProviders: typeof renderHook = (...parameters) =>
  renderHook(parameters[0], {
    wrapper: ({ children }) => wrapper(children),
    ...parameters[1]
  })

export const bugfixForTimeout = async () =>
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))

export * from '@testing-library/react'
export { renderWithProviders as render }
