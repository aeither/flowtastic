import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'

import { api } from '@/libs/api'

import '@/styles/globals.css'
import { theme } from '@/styles/theme'
import ClientOnly from '@/components/layout/client-only'
import Layout from '@/components/layout'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <ClientOnly>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ClientOnly>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
