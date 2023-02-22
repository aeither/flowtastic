import { MediaModal } from '@/components/home/media-modal'
import { ReviewForm } from '@/components/home/review-form'
import Rating from '@/components/shared/rating'
import { useReviewAverage, useReviewsByPlayId } from '@/libs/hooks/use-db'
import { usePlayData } from '@/libs/hooks/use-flow'
import { ImageType, PlayData, VideoType } from '@/libs/types'
import { getPlayImage, getPlayVideo } from '@/libs/utils/helpers'
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
import { FC } from 'react'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const IMAGE_MEDIA_TYPES = [
  'capture_Hero_Black',
  'capture_Front_Black',
  'capture_Legal_Black',
  'capture_Details_Black',
]
const VIDEO_MEDIA_TYPES = [
  'capture_Animated_Video_Popout_Black',
  'capture_Animated_Video_Idle_Black',
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
        {[0, 1, 2, 3].map((id) => (
          <SwiperSlide key={id}>
            <MediaModal
              playId={play.metadata.PlayDataID}
              srcUrl={getPlayImage(
                play.metadata.PlayDataID,
                IMAGE_MEDIA_TYPES[id]! as ImageType
              )}
            />
          </SwiperSlide>
        ))}
        {[0, 1].map((id) => (
          <SwiperSlide key={id}>
            <MediaModal
              playId={play.metadata.PlayDataID}
              srcUrl={'https://cdn-icons-png.flaticon.com/512/1110/1110736.png'}
              videolUrl={getPlayVideo(
                play.metadata.PlayDataID,
                VIDEO_MEDIA_TYPES[id]! as VideoType
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

const Reviews: FC<{ playId: number | undefined }> = ({ playId }) => {
  const reviewsByPlayId = useReviewsByPlayId({ playId })
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
  const reviewAverage = useReviewAverage({
    playId,
  })

  const playData = usePlayData({ playId })
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
