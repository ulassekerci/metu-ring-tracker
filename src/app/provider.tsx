import { queryClient } from '@/lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
