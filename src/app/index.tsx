import { AppProvider } from '@/app/provider'
import { AppRouter } from '@/app/router'
import { Toaster } from 'react-hot-toast'

export const App = () => {
  return (
    <AppProvider>
      <Toaster position='top-right' />
      <AppRouter />
    </AppProvider>
  )
}
