import { ViewDetailsButton } from '@/components/shared/view-details-button'
import { useCopyToClipboard } from '@/libs/hooks/use-copy-to-clipboard'
import { useDB } from '@/libs/hooks/use-db'
import {
  useCollectionIDs,
  useMomentProperties,
  useNftEditions,
  useNftMetadata,
} from '@/libs/hooks/use-flow'
import {
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useAuthentication, verifyUserSignatures } from '@flowity/react'
import { type NextPage } from 'next'
import NextLink from 'next/link'
import { FC } from 'react'

const MESSAGE = Buffer.from('Use as Collection wallet').toString('hex')

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
  const nftEditions = useNftEditions({
    momentNFT: id,
    targetAddress: userAddress.data && userAddress.data.address,
  })

  const cardBorderColor = useColorModeValue('white', 'gray.800')

  return (
    <>
      {nftMetadata.data && momentProperties.data && nftEditions.data && (
        <VStack>
          <Card
            maxW="sm"
            border={'2px'}
            borderColor={cardBorderColor}
            _hover={{ borderColor: 'teal.400' }}
          >
            <CardBody>
              <Image
                src={nftMetadata.data.thumbnail.url}
                alt={nftMetadata.data.name}
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md" minH={'16'}>
                  {nftMetadata.data.name}
                </Heading>
                <Text minH={'32'}>{nftMetadata.data.description}</Text>
                <Tag w={'fit-content'} borderRadius="full" colorScheme="teal">
                  {`${Number(momentProperties.data[2]).toFixed(0)}/${Number(
                    nftEditions.data.infoList[0]?.max,
                  )}`}
                </Tag>
                <Text>
                  {`${new Date(
                    Number(momentProperties.data[3]) * 1000 || 0,
                  ).getMonth()} ${new Date(
                    Number(momentProperties.data[3]) * 1000 || 0,
                  ).getDate()} ${new Date(
                    Number(momentProperties.data[3]) * 1000 || 0,
                  ).getFullYear()} `}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <NextLink href={`/play?playId=${momentProperties.data[1]}`}>
              <ViewDetailsButton playId={momentProperties.data[1] || '0'} />
            </NextLink>
          </Card>
        </VStack>
      )}
    </>
  )
}

const Collection: NextPage = () => {
  const { login, isLoggedIn, isReady, logout, user, signUserMessage } =
    useAuthentication()
  const { userAddress, addAddress } = useDB()
  const collectionIDs = useCollectionIDs({
    targetAddress: userAddress.data && userAddress.data.address,
  })
  const { copyToClipboard, hasCopied } = useCopyToClipboard()

  return (
    <>
      <Container maxW="container.xl">
        <Center>
          <VStack>
            <Heading as="h3" size="lg">
              Connect to add or update address
            </Heading>
            <HStack>
              <Text>
                Current associated address:{' '}
                {userAddress.data && userAddress.data.address?.substring(0, 6)}
                ...
              </Text>
              <Button
                onClick={() =>
                  copyToClipboard((userAddress.data && userAddress.data.address) || '')
                }
              >
                {hasCopied ? 'Copied' : 'Copy'}
              </Button>
            </HStack>
            <HStack p={4}>
              {isLoggedIn ? (
                <>
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
                  <Button
                    colorScheme={'red'}
                    onClick={async () => {
                      await logout()
                    }}
                  >
                    Logout
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
            </HStack>
          </VStack>
        </Center>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} px={4}>
          {collectionIDs.data &&
            collectionIDs.data.map((id) => (
              <>
                <Moment key={id} id={id} />
              </>
            ))}
        </SimpleGrid>
      </Container>
    </>
  )
}

export default Collection
