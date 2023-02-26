import Rating from '@/components/shared/rating'
import { ViewDetailsButton } from '@/components/shared/view-details-button'
import { useReviewAverage } from '@/libs/hooks/use-db'
import { useFlow } from '@/libs/hooks/use-flow'
import { getPlayImage } from '@/libs/utils/helpers'
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
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
import { type NextPage } from 'next'
import { FC, useEffect, useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export const CardRating: FC<{ playId: number }> = ({ playId }) => {
  const reviewAverage = useReviewAverage({
    playId,
  })

  return (
    <>
      {(reviewAverage.data && reviewAverage.data._avg.rating) || 0} -{' '}
      {reviewAverage.data && reviewAverage.data._count.rating} reviews
      <div>
        <Rating
          size={6}
          icon="star"
          scale={5}
          fillColor="gold"
          strokeColor="grey"
          viewOnly
          viewRating={(reviewAverage.data && reviewAverage.data._avg.rating) || 0}
        />
      </div>
    </>
  )
}

const Home: NextPage = () => {
  const [selectedSet, setSelectedSet] = useState<string>()
  const { allPlays, allSetDatas, allEditions } = useFlow()
  console.log('🚀 ~ file: golazos.tsx:56 ~ allPlays:', allPlays)
  console.log('🚀 ~ file: golazos.tsx:56 ~ allEditions:', allEditions)
  console.log('🚀 ~ file: golazos.tsx:56 ~ allSetDatas:', allSetDatas)
  const cardBorderColor = useColorModeValue('gray.200', 'gray.800')

  const filteredEditions = useMemo(() => {
    let res = allEditions.data
    if (allEditions.data && selectedSet) {
      res = allEditions.data.filter((edition) => {
        return edition.setID === selectedSet
      })
    }
    return res
  }, [allEditions.data, selectedSet])
  console.log(
    '🚀 ~ file: golazos.tsx:59 ~ filteredEditions ~ filteredEditions:',
    filteredEditions,
  )

  return (
    <>
      <Box pos={'relative'} w="full" h="400px">
        <Image
          fit={'cover'}
          pos={'absolute'}
          src="/hero.png"
          alt="hero"
          w="full"
          h={'full'}
        />
        <VStack h={'full'} pos={'relative'} align={'center'} justify={'center'}>
          <Heading>Get Started</Heading>
          <Text>Explore your moments.</Text>
          <Link
            as={NextLink}
            _hover={{
              textDecoration: 'none',
            }}
            href="/collection"
          >
            <Button>Go to Collection</Button>
          </Link>
        </VStack>
      </Box>
      <Heading as="h2" size="xl" p={4}>
        Sets
      </Heading>
      <Box>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          // modules={[Pagination]}
        >
          {allSetDatas.data &&
            allSetDatas.data.map((setData) => (
              <SwiperSlide key={setData.id}>
                <Card
                  mx={2}
                  minH="24"
                  border={'2px'}
                  borderColor={selectedSet === setData.id ? 'teal.400' : cardBorderColor}
                  _hover={{ borderColor: 'teal.400' }}
                  onClick={() => {
                    if (selectedSet === setData.id) {
                      setSelectedSet(undefined)
                    } else {
                      setSelectedSet(setData.id)
                    }
                  }}
                >
                  <CardBody
                    display={'flex'}
                    alignItems="center"
                    justifyContent={'center'}
                    h={'full'}
                    cursor={'pointer'}
                  >
                    <Center>
                      <Text>{setData.name}</Text>
                    </Center>
                  </CardBody>
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>

      <Heading as="h2" size="xl" p={4}>
        View All
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} px={4}>
        {allPlays.data &&
          filteredEditions &&
          filteredEditions.slice(0, 50).map((edition) => {
            const play = allPlays.data[Number(edition.playID)]

            return (
              <>
                {play && (
                  <Center>
                    <Card
                      maxW="sm"
                      border={'2px'}
                      borderColor={cardBorderColor}
                      _hover={{ borderColor: 'teal.400' }}
                    >
                      <CardBody>
                        <Image
                          src={getPlayImage(
                            play.metadata.PlayDataID,
                            'capture_Hero_Black',
                          )}
                          alt={play.metadata.PlayDataID}
                          borderRadius="lg"
                        />
                        <Stack mt="6" spacing="3">
                          <HStack>
                            <Tag w={'fit-content'} borderRadius="full" colorScheme="blue">
                              {edition.numMinted}/{edition.maxMintSize}
                            </Tag>
                            <Tag w={'fit-content'} borderRadius="full" colorScheme="pink">
                              {edition.tier}
                            </Tag>
                          </HStack>
                          <Heading minH={'16'} size="md">
                            {`${play.metadata.PlayerFirstName} ${play.metadata.PlayerLastName}`}
                          </Heading>
                          <Text>
                            {`${play.metadata.PlayType} - ${new Date(
                              play.metadata.MatchDate,
                            ).getFullYear()}`}
                          </Text>
                          <Text minH={12}>
                            {`${play.metadata.MatchHomeTeam} ${play.metadata.MatchHomeScore} - ${play.metadata.MatchAwayScore} ${play.metadata.MatchAwayTeam}`}
                          </Text>

                          <CardRating playId={Number(play.id)} />
                        </Stack>
                      </CardBody>
                      <Divider />
                      <NextLink href={`/play?playId=${play.id}`}>
                        <ViewDetailsButton playId={play.id} />
                      </NextLink>
                    </Card>
                  </Center>
                )}
              </>
            )
          })}
      </SimpleGrid>
    </>
  )
}

export default Home
