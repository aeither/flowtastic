import Rating from '@/components/shared/rating'
import { useDB, useReviewAverage } from '@/libs/hooks/use-db'
import { useFlow, usePlayData } from '@/libs/hooks/use-flow'
import { getPlayImage } from '@/libs/utils/helpers'
import {
  Button,
  ButtonGroup,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  Select,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { type NextPage } from 'next'
import NextLink from 'next/link'
import { FC, useState } from 'react'

export const MomentA: FC = () => {
  // get all editions for select
  const { allPlays } = useFlow()
  const [playId, setPlayId] = useState<number>()
  const playData = usePlayData({ playId })
  const reviewAverage = useReviewAverage({
    playId,
  })
  return (
    <>
      <VStack p={4}>
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
          <VStack justify={'start'}>
            <Image
              // boxSize="100px"
              maxBlockSize={'350px'}
              src={getPlayImage(playData.data.metadata.PlayDataID, 'capture_Hero_Black')}
              alt={playData.data.metadata.PlayDataID}
              borderRadius="lg"
            />
            <ButtonGroup spacing="2">
              <NextLink href={`/play?playId=${playData.data.id}`}>
                <Button variant="solid" colorScheme="teal" onClick={() => {}}>
                  Reviews
                </Button>
              </NextLink>
            </ButtonGroup>
            <Divider />
            <Stack mt="6" spacing="3">
              <div>
                <Center>
                  {(reviewAverage.data && reviewAverage.data._avg.rating) || 0} -{' '}
                  {reviewAverage.data && reviewAverage.data._count.rating} reviews
                </Center>

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

              <Divider />

              <Heading size={{ sm: 'sm', md: 'md' }}>Player</Heading>
              <Heading size={{ sm: 'xs', md: 'sm' }} minH={'16'}>
                {`${playData.data.metadata.PlayerFirstName} ${playData.data.metadata.PlayerLastName}`}
              </Heading>
              <Text>{playData.data.metadata.PlayerCountry}</Text>
              <Text>Number {playData.data.metadata.PlayerNumber}</Text>
              <Text>{playData.data.metadata.PlayerPosition}</Text>

              <Divider />

              <Heading size={{ sm: 'sm', md: 'md' }}>Play</Heading>
              <Text>{playData.data.metadata.PlayType}</Text>
              <Text>{playData.data.metadata.PlayHalf} Half</Text>
              <Text>Minute {playData.data.metadata.PlayTime} </Text>

              <Divider />

              <Heading size={{ sm: 'sm', md: 'md' }}>Match</Heading>
              <Text>
                {`${new Date(playData.data.metadata.MatchDate).getMonth()} ${new Date(
                  playData.data.metadata.MatchDate,
                ).getDate()} ${new Date(playData.data.metadata.MatchDate).getFullYear()}`}
              </Text>
              <Text>Season {playData.data.metadata.MatchSeason}</Text>
              <Text>Match day {playData.data.metadata.MatchDay}</Text>
              <Text minH={'10'}>
                {`${playData.data.metadata.MatchHomeTeam} ${playData.data.metadata.MatchHomeScore} - ${playData.data.metadata.MatchAwayScore} ${playData.data.metadata.MatchAwayTeam}`}
              </Text>
            </Stack>
          </VStack>
        )}
      </VStack>
    </>
  )
}

const Collection: NextPage = () => {
  const { userAddress, addAddress } = useDB()

  return (
    <>
      <HStack
        w="full"
        align={'start'}
        justify="center"
        minH={'calc(100vh - 104px - 32px)'}
      >
        <MomentA />
        <MomentA />
      </HStack>
    </>
  )
}

export default Collection
