import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query'
import { useEffect, useState } from 'react';
import GlobalStyles from 'styles/global';

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
        <GlobalStyles />
        <Component {...pageProps} />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp;
