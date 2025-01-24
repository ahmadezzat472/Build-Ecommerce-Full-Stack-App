import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import InternetConnectionProvider from './provider/InternetConnection.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <InternetConnectionProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </InternetConnectionProvider>
      </Provider> 
    </QueryClientProvider>
)
