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
import { Toaster } from 'react-hot-toast'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const client = createClient({
  fclConfig: {
    ...networks.mainnet,
    'app.detail.icon':
      'https://user-images.githubusercontent.com/36173828/221360584-d1cc8df1-f7ad-4fb8-b29b-cc05966eca74.png',
    'app.detail.title': 'Flowtastic',
    '0xNONFUNGIBLETOKENADDRESS': '0x1d7e57aa55817448',
    '0xGOLAZOSADDRESS': '0x87ca73a41bb50ad5',
    '0xMETADATAVIEWSADDRESS': '0x1d7e57aa55817448',
    '0xFLOWTASTIC': '0x574277684a825973',
  },
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter()

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
