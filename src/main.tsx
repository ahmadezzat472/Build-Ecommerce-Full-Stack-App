import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import InternetConnectionProvider from './provider/InternetConnection.tsx'

// import { extendTheme } from '@chakra-ui/react'
// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

// const theme = extendTheme({ colors })

// // 3. Pass the `theme` prop to the `ChakraProvider`

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
