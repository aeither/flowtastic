import Layout from '@/components/layout'
import ClientOnly from '@/components/layout/client-only'
import { api } from '@/libs/api'
import '@/styles/globals.css'
import { theme } from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { createClient, FlowProvider, networks } from '@flowity/react'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { useRouter } from 'next/router'
import posthog from 'posthog-js'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

if (typeof window !== 'undefined') {
  // This ensures that as long as we are client-side, posthog is always ready
  // NOTE: If set as an environment variable be sure to prefix with `NEXT_PUBLIC_`
  // For more info see https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser

  posthog.init('phc_sWDxbFNZZmk4B4LLFK27ZVkNsh06nUC36HrbaVQFKtC', {
    // api_host: 'https://app.posthog.com',
    // loaded: (posthog) => {
    //   if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
    // },
  })
}

const client = createClient({
  fclConfig: {
    ...networks.mainnet,
    '0xNONFUNGIBLETOKENADDRESS': '0x1d7e57aa55817448',
    '0xGOLAZOSADDRESS': '0x87ca73a41bb50ad5',
    '0xMETADATAVIEWSADDRESS': '0x1d7e57aa55817448',
  },
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter()

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog.capture('$pageview')
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <FlowProvider client={client}>
          <ClientOnly>
            <Layout>
              <Component {...pageProps} />
              <Toaster />
            </Layout>
          </ClientOnly>
        </FlowProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
