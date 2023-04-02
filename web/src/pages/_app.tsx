import Head from 'next/head'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from 'govuk-react'
import { appWithTranslation } from 'next-i18next'

interface MyAppProps extends AppProps {
  Component: NextPage & {
    getLayout?: (page: ReactNode) => ReactNode
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 1000 } }
})

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={{}}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
