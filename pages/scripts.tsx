import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { api } from '@/libs/api'
import { useFlow } from '@/libs/hooks/use-flow'
import {
  Card,
  CardHeader,
  Text,
  Image,
  CardBody,
  CardFooter,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Stack,
} from '@chakra-ui/react'

const Home: NextPage = () => {
  const { medias, allPlays, collectionIDs, nftMetadata, properties, playData } =
    useFlow()
  console.log('🚀 ~ file: scripts.tsx:23 ~ playData:', playData.data)
  console.log('🚀 ~ file: scripts.tsx:23 ~ properties:', properties.data)
  console.log('🚀 ~ file: scripts.tsx:23 ~ nftMetadata:', nftMetadata.data)
  console.log('🚀 ~ file: scripts.tsx:23 ~ collectionIDs:', collectionIDs.data)
  console.log('🚀 ~ file: scripts.tsx:23 ~ allPlays:', allPlays.data)
  console.log('🚀 ~ file: scripts.tsx:23 ~ medias:', medias.data)

  // hello query cause refetch
  // const hello = api.db.hello.useQuery({ text: 'from tRPC' })

  return (
    <>
      <p>hello world</p>
      {/* {allPlays.data &&
        allPlays.data.map((play) => (
          <>
            <Card maxW="sm">
              <CardBody>
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">hello </Heading>
                  <Text>
                    This sofa is perfect for modern tropical spaces, baroque
                    inspired spaces, earthy toned spaces and for people who love
                    a chic design with a sprinkle of vintage design.
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    $450
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="blue">
                    Buy now
                  </Button>
                  <Button variant="ghost" colorScheme="blue">
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </>
        ))} */}
    </>
  )
}

export default Home
