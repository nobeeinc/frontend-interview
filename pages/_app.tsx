import '../src/frontend/assets/styles/tailwind.css'
import '../src/frontend/assets/styles/proxima-nova-600.css'

import type { AppProps } from 'next/app'

import axios from 'axios'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Fragment, useState } from 'react'
import { MuiThemeProvider } from '../src/frontend/core/MuiThemeProvider'
import { useRouter } from 'next/router'
import { Hydrate } from 'react-query/hydration'

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true

  const router = useRouter()

  /**
   * React Query
   */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  )

  return (
    <Fragment>
      <QueryClientProvider client={queryClient} key={router.asPath}>
        <Hydrate state={pageProps.dehydratedState}>
          <MuiThemeProvider>
            <Component {...pageProps} />
          </MuiThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </Fragment>
  )
}

export default MyApp
