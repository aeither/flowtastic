import { type NextPage } from 'next'

import { useDB } from '@/libs/hooks/use-db'
import { Button, Text, VStack } from '@chakra-ui/react'
import { useAuthentication, verifyUserSignatures } from '@flowity/react'
import { useFlow } from '@/libs/hooks/use-flow'

const MESSAGE = Buffer.from('Use as Portfolio wallet').toString('hex')

const Portfolio: NextPage = () => {
  const { login, isLoggedIn, isReady, logout, user, signUserMessage } =
    useAuthentication()
  const { userAddress, addAddress } = useDB()
  const { collectionIDs } = useFlow({
    targetAddress: userAddress.data && (userAddress.data.address as any),
  })
  console.log('🚀 ~ file: portfolio.tsx:17 ~ collectionIDs:', collectionIDs)

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

        {collectionIDs.data &&
          collectionIDs.data.map((id) => (
            <>
              <VStack>
                <Text>{id}</Text>
              </VStack>
            </>
          ))}
      </main>
    </>
  )
}

export default Portfolio
