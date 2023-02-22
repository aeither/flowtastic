import Rating from '@/components/shared/rating'
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
        {(reviewAverage.data && reviewAverage.data._avg.rating) || 0} -{' '}
        {reviewAverage.data && reviewAverage.data._count.rating} reviews
      </div>
    </>
  )
}

const Home: NextPage = () => {
  const { allPlays } = useFlow()

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
                      <CardRating playId={Number(play.id)} />
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <NextLink href={`/play/${play.id}`}>
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          onClick={() => {}}
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
