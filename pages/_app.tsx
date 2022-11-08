import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query'
import Container from '@mui/material/Container';
import 'styles/global.css'
import Navbar from 'shared/components/Navbar';
import { useEffect, useState } from 'react';

const queryCache = new QueryCache()
const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

const atomsProviderInitialValue = [[queryClientAtom, queryClient]] as const

const MyApp = ({ Component, pageProps }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <QueryClientProvider client={queryClient}>
      <Provider initialValues={atomsProviderInitialValue}>
        <Navbar />
        <Container style={{ height: '100%' }} maxWidth="xl">
          <Component {...pageProps} />
        </Container>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp;
