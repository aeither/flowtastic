import Rating from '@/components/shared/rating'
import { ViewDetailsButton } from '@/components/shared/view-details-button'
import { useReviewAverage } from '@/libs/hooks/use-db'
import { useFlow } from '@/libs/hooks/use-flow'
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
  useColorModeValue,
} from '@chakra-ui/react'
import { type NextPage } from 'next'
import NextLink from 'next/link'
import { FC } from 'react'

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
          viewRating={
            (reviewAverage.data && reviewAverage.data._avg.rating) || 0
          }
        />
      </div>
    </>
  )
}

const Home: NextPage = () => {
  const { allPlays } = useFlow()
  const cardBorderColor = useColorModeValue('white', 'gray.800')

  return (
    <>
      <Heading as="h2" size="xl" p={4}>
        Traits
      </Heading>
      <Heading as="h2" size="xl" p={4}>
        View All
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} px={4}>
        {allPlays.data &&
          allPlays.data.map((play) => (
            <>
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
                        'capture_Hero_Black'
                      )}
                      alt={play.metadata.PlayDataID}
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading minH={'16'} size="md">
                        {`${play.metadata.PlayerFirstName} ${play.metadata.PlayerLastName}`}
                      </Heading>
                      <Text>
                        {`${play.metadata.PlayType} - ${new Date(
                          play.metadata.MatchDate
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
            </>
          ))}
      </SimpleGrid>
    </>
  )
}

export default Home
