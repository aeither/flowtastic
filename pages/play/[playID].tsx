import { ReviewForm } from '@/components/home/review-form'
import Rating from '@/components/shared/rating'
import { useDB } from '@/libs/hooks/use-db'
import { useFlow } from '@/libs/hooks/use-flow'
import { useStore } from '@/libs/store'
import { getPlayImage } from '@/libs/utils/helpers'
import {
  Card,
  CardBody,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

const Play: NextPage = () => {
  const setPlayId = useStore((state) => state.setPlayId)
  const { reviewAverage, reviewsByPlayId } = useDB()
  const { query, asPath } = useRouter()
  const { playData } = useFlow()
  const play = playData.data

  useEffect(() => {
    if (query.playId) {
      setPlayId(Number(query.playId))
      reviewAverage.refetch()
      reviewsByPlayId.refetch()
    }
  }, [query.playId])

  return (
    <>
      <main>
        {play && (
          <VStack>
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
              </Card>
            </Center>

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
              {reviewAverage.data && reviewAverage.data._avg.rating} -{' '}
              {reviewAverage.data && reviewAverage.data._count.rating} reviews
            </div>

            <ReviewForm />

            <Reviews />
          </VStack>
        )}
      </main>
    </>
  )
}

const Reviews: FC = () => {
  const { reviewsByPlayId } = useDB()
  return (
    <>
      {reviewsByPlayId.data &&
        reviewsByPlayId.data.map((review) => (
          <Center key={review.id}>
            <Card maxW="sm">
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="md">{review.title}</Heading>
                  <Text>
                    {review.description} - {review.rating}
                  </Text>

                  <div>
                    <Rating
                      size={4}
                      icon="star"
                      scale={5}
                      fillColor="gold"
                      strokeColor="grey"
                      viewOnly
                      viewRating={review.rating}
                    />
                  </div>
                </Stack>
              </CardBody>
            </Card>
          </Center>
        ))}
    </>
  )
}

export default Play
