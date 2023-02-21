import { useFlow } from '@/libs/hooks/use-flow'
import { useStore } from '@/libs/store'
import { getPlayImage } from '@/libs/utils/helpers'
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { type NextPage } from 'next'
import NextLink from 'next/link'

const Home: NextPage = () => {
  const setPlayId = useStore((state) => state.setPlayId)

  const {
    medias,
    allPlays,
    collectionIDs,
    nftMetadata,
    properties,
    playData,
    traits,
    allEditions,
    allSeriesNames,
    seriesData,
  } = useFlow()
  // console.log('🚀 ~ file: scripts.tsx:34 ~ seriesData:', seriesData.data)
  // console.log(
  //   '🚀 ~ file: scripts.tsx:33 ~ allSeriesNames:',
  //   allSeriesNames.data
  // )
  // console.log('🚀 ~ file: scripts.tsx:32 ~ allEditions:', allEditions.data)
  // console.log('🚀 ~ file: scripts.tsx:32 ~ traits:', traits.data)
  // console.log('🚀 ~ file: scripts.tsx:23 ~ playData:', playData.data)
  // console.log('🚀 ~ file: scripts.tsx:23 ~ properties:', properties.data)
  // console.log('🚀 ~ file: scripts.tsx:23 ~ nftMetadata:', nftMetadata.data)
  // console.log('🚀 ~ file: scripts.tsx:23 ~ collectionIDs:', collectionIDs.data)
  console.log('🚀 ~ file: scripts.tsx:23 ~ allPlays:', allPlays.data)
  // console.log('🚀 ~ file: scripts.tsx:23 ~ medias:', medias.data)

  // hello query cause refetch
  // const hello = api.db.hello.useQuery({ text: 'from tRPC' })

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} px={4}>
        {allPlays.data &&
          allPlays.data.map((play) => (
            <>
              <Center>
                <Card maxW="sm">
                  <CardBody>
                    <Image
                      src={getPlayImage(
                        play.metadata.PlayDataID,
                        'capture_Hero_Black'
                      )}
                      alt={play.metadata.PlayDataID}
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">
                        {`${play.metadata.PlayerFirstName} ${play.metadata.PlayerLastName}`}
                      </Heading>
                      <Text>
                        {`${play.metadata.PlayType} - ${new Date(
                          play.metadata.MatchDate
                        ).getFullYear()}`}
                      </Text>
                      <Text>
                        {`${play.metadata.MatchHomeTeam} ${play.metadata.MatchHomeScore} - ${play.metadata.MatchAwayScore} ${play.metadata.MatchAwayTeam}`}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <NextLink href={`/play/${play.id}`}>
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          onClick={() => {
                            setPlayId(Number(play.id))
                          }}
                        >
                          View Moment Details
                        </Button>
                      </NextLink>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Center>
            </>
          ))}
      </SimpleGrid>
    </>
  )
}

export default Home
