import { ReviewForm } from '@/components/home/review-form'
import Rating from '@/components/shared/rating'
import { api } from '@/libs/api'
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
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { type NextPage } from 'next'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'

const Play: NextPage = () => {
  const hello = api.db.hello.useQuery({ text: 'from tRPC' })
  const { query, asPath } = useRouter()
  const { playData } = useFlow()
  const play = playData.data

  console.log('🚀 ~ file: [play].tsx:12 ~ asPath:', asPath)
  console.log('🚀 ~ file: [play].tsx:12 ~ query:', query.playID)

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

            <ButtonGroup spacing="2">
              <NextLink href={`/play/${play.id}`}>
                <Button
                  onClick={() => {
                    console.log('')
                  }}
                >
                  View Moment Details
                </Button>
              </NextLink>
            </ButtonGroup>

            <ReviewForm />
          </VStack>
        )}
      </main>
    </>
  )
}

export default Play
