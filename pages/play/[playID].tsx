import { ReviewForm } from '@/components/home/review-form'
import Rating from '@/components/shared/rating'
import { useDB } from '@/libs/hooks/use-db'
import { useFlow } from '@/libs/hooks/use-flow'
import { useStore } from '@/libs/store'
import { ImageType, PlayData } from '@/libs/types'
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
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const MEDIA_TYPES = [
  'capture_Hero_Black',
  'capture_Front_Black',
  'capture_Legal_Black',
  'capture_Details_Black',
]

const MediaSlider: FC<{ play: PlayData }> = ({ play }) => {
  return (
    <>
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        navigation={true}
        spaceBetween={500}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {[0, 1, 2, 3, 4, 5].map((id) => (
          <SwiperSlide key={id}>
            <Image
              src={getPlayImage(
                play.metadata.PlayDataID,
                MEDIA_TYPES[id]! as ImageType
              )}
              alt={play.metadata.PlayDataID}
              borderRadius="lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

const Reviews: FC<{ playId: number | undefined }> = ({ playId }) => {
  const { reviewsByPlayId } = useDB({ playId })
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

const Play: NextPage = () => {
  const { query } = useRouter()
  const playId = Number(query.playId) as number | undefined
  const { reviewAverage, reviewsByPlayId } = useDB({
    playId,
  })
  const { playData } = useFlow({})
  const play = playData.data

  return (
    <>
      <main>
        {play && (
          <VStack>
            <Center>
              <Card maxW="sm">
                <CardBody>
                  <MediaSlider play={play} />
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

            <Reviews playId={playId} />
          </VStack>
        )}
      </main>
    </>
  )
}

export default Play
