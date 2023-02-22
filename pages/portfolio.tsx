import { type NextPage } from 'next'

import { useDB } from '@/libs/hooks/use-db'
import { Button } from '@chakra-ui/react'
import { useAuthentication, verifyUserSignatures } from '@flowity/react'

const MESSAGE = Buffer.from('Use as Portfolio wallet').toString('hex')

const Portfolio: NextPage = () => {
  const { login, isLoggedIn, isReady, logout, user, signUserMessage } =
    useAuthentication()
  const { addAddress } = useDB()

  // search another wallet
  //   const address = (user?.addr as `0x${string}`) || '0x123'
  //   const { data } = useAccount({ address: address })

  return (
    <>
      <main>
        <p>hello world</p>

        {isLoggedIn ? (
          <>
            <Button
              onClick={async () => {
                await logout()
              }}
            >
              Logout
            </Button>
            <Button
              onClick={async () => {
                const sigs = await (signUserMessage && signUserMessage(MESSAGE))
                if (!sigs) return
                const sigVerified = await verifyUserSignatures(MESSAGE, sigs)
                if (!sigVerified) return
                if (user) {
                  addAddress.mutate({ address: user.addr })
                }
              }}
            >
              Use Wallet
            </Button>
            <p>{user?.addr}</p>
          </>
        ) : (
          <Button
            onClick={async () => {
              await login()
            }}
          >
            Connect Wallet
          </Button>
        )}
      </main>
    </>
  )
}

export default Portfolio
