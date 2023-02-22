import { useDB } from '@/libs/hooks/use-db'
import {
  useCollectionIDs, useMomentProperties,
  useNftMetadata
} from '@/libs/hooks/use-flow'
import { useStore } from '@/libs/store'
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import { useAuthentication, verifyUserSignatures } from '@flowity/react'
import { type NextPage } from 'next'
import NextLink from 'next/link'
import { FC } from 'react'

const MESSAGE = Buffer.from('Use as Portfolio wallet').toString('hex')

export const Moment: FC<{ id: string }> = ({ id }) => {
  const { userAddress } = useDB()
  const momentProperties = useMomentProperties({
    momentNFT: id,
    targetAddress: userAddress.data && userAddress.data.address,
  })
  const nftMetadata = useNftMetadata({
    momentNFT: id,
    targetAddress: userAddress.data && userAddress.data.address,
  })
  const setPlayId = useStore((state) => state.setPlayId)

  return (
    <>
      {nftMetadata.data && momentProperties.data && (
        <VStack>
          <Text>{id}</Text>
          <Card maxW="sm">
            <CardBody>
              <Image
                src={nftMetadata.data.thumbnail.url}
                alt={nftMetadata.data.name}
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{nftMetadata.data.name}</Heading>
                <Text>{nftMetadata.data.description}</Text>
                <Text>
                  Serial number: {Number(momentProperties.data[2]).toFixed(0)}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <NextLink href={`/play/${momentProperties.data[1]}`}>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => {
                      if (!momentProperties.data) return
                      setPlayId(Number(momentProperties.data[1]))
                    }}
                  >
                    View Moment Details
                  </Button>
                </NextLink>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </VStack>
      )}
    </>
  )
}

const Portfolio: NextPage = () => {
  const { login, isLoggedIn, isReady, logout, user, signUserMessage } =
    useAuthentication()
  const { userAddress, addAddress } = useDB()
  const collectionIDs = useCollectionIDs({
    targetAddress: userAddress.data && userAddress.data.address,
  })
  console.log('🚀 ~ file: portfolio.tsx:17 ~ collectionIDs:', collectionIDs)

  // search another wallet
  //   const address = (user?.addr as `0x${string}`) || '0x123'
  //   const { data } = useAccount({ address: address })

  return (
    <>
      <main>
        <Text>
          Current associated address:{' '}
          {userAddress.data && userAddress.data.address}
        </Text>
        <Text>Connect to add or update address</Text>
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
              Update address
            </Button>
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
              <Moment key={id} id={id} />
            </>
          ))}
      </main>
    </>
  )
}

export default Portfolio
