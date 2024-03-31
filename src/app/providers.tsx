'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

const getQueryClient = () => {
  if (typeof window === 'undefined') makeQueryClient()

  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default Providers
