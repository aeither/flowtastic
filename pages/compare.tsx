import Rating from '@/components/shared/rating'
import { useDB, useReviewAverage } from '@/libs/hooks/use-db'
import { useFlow, usePlayData } from '@/libs/hooks/use-flow'
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
  HStack,
  Image,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import { type NextPage } from 'next'
import NextLink from 'next/link'
import { FC } from 'react'

export const MomentA: FC = () => {
  // get all editions for select
  const { allPlays } = useFlow()
  const setPlayId = useStore((state) => state.setPlayId)
  const playId = useStore((state) => state.playId)
  const playData = usePlayData({ playId })
  const reviewAverage = useReviewAverage({
    playId,
  })
  // components to show media
  // components to show details
  return (
    <>
      <Select
        placeholder="Select option"
        onChange={(e) => setPlayId(Number(e.target.value))}
      >
        {allPlays.data &&
          allPlays.data.map((play) => (
            <>
              <option value={play.id}>
                {play.id} -{' '}
                {`${play.metadata.PlayerFirstName} ${play.metadata.PlayerLastName}`}
              </option>
            </>
          ))}
      </Select>
      {playId !== 0 && playData.data && (
        <Center>
          <Card maxW="sm">
            <CardBody>
              <Image
                src={getPlayImage(
                  playData.data.metadata.PlayDataID,
                  'capture_Hero_Black'
                )}
                alt={playData.data.metadata.PlayDataID}
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">
                  {`${playData.data.metadata.PlayerFirstName} ${playData.data.metadata.PlayerLastName}`}
                </Heading>
                <Text>
                  {`${playData.data.metadata.PlayType} - ${new Date(
                    playData.data.metadata.MatchDate
                  ).getFullYear()}`}
                </Text>
                <Text>
                  {`${playData.data.metadata.MatchHomeTeam} ${playData.data.metadata.MatchHomeScore} - ${playData.data.metadata.MatchAwayScore} ${playData.data.metadata.MatchAwayTeam}`}
                </Text>
                <div>
                  <Rating
                    size={6}
                    icon="star"
                    scale={5}
                    fillColor="gold"
                    strokeColor="grey"
                    viewOnly
                    viewRating={
                      (reviewAverage.data && reviewAverage.data._avg.rating) ||
                      0
                    }
                  />
                  {(reviewAverage.data && reviewAverage.data._avg.rating) || 0}{' '}
                  - {reviewAverage.data && reviewAverage.data._count.rating}{' '}
                  reviews
                </div>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <NextLink href={`/play/${playData.data.id}`}>
                  <Button variant="solid" colorScheme="blue" onClick={() => {}}>
                    View Moment Details
                  </Button>
                </NextLink>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Center>
      )}
    </>
  )
}

const Portfolio: NextPage = () => {
  const { userAddress, addAddress } = useDB()

  return (
    <>
      <main>
        <HStack>
          <MomentA />
          {/* <MomentA /> */}
        </HStack>
      </main>
    </>
  )
}

export default Portfolio
