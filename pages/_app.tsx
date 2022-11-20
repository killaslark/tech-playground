import { useEffect, useState } from 'react';

import Router from 'next/router';

import { hydrate, Hydrate, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Provider } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import GlobalStyles from 'styles/global';

const defaultQueryOptions = {
  queries: {
    refetchOnWindowFocus: false,
  }
}

const queryCache = new QueryCache()
const queryClient = new QueryClient({
  queryCache,
  defaultOptions: defaultQueryOptions,
})

const atomsProviderInitialValue = [[queryClientAtom, queryClient]] as const

const MyApp = (props) => {
  const { Component, pageProps } = props
  const [isMounted, setIsMounted] = useState(false)

  hydrate(queryClient, props.pageProps.dehydratedState)

  const routeChangeCompleteHandler = () => {
    NProgress.done();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', NProgress.start);
    Router.events.on('routeChangeComplete', routeChangeCompleteHandler);
    Router.events.on('routeChangeError', NProgress.done);
    return () => {
      Router.events.off('routeChangeStart', NProgress.start);
      Router.events.off('routeChangeComplete', routeChangeCompleteHandler);
      Router.events.off('routeChangeError', NProgress.done);
    }
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={props.dehydratedState}>
        <Provider initialValues={atomsProviderInitialValue}>
          <GlobalStyles />
          <Component {...pageProps} />
        </Provider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp;
