import { MediaModal } from '@/components/home/media-modal'
import { ReviewFormModal } from '@/components/home/review-form-modal'
import Rating from '@/components/shared/rating'
import { useDB, useReviewAverage, useReviewsByPlayId } from '@/libs/hooks/use-db'
import { usePlayData, useTipReviewer, useUploadReview } from '@/libs/hooks/use-flow'
import { ImageType, PlayData, VideoType } from '@/libs/types'
import { getPlayImage, getPlayVideo, timeAgo } from '@/libs/utils/helpers'
import { LockIcon } from '@chakra-ui/icons'
import {
  Button,
  Card,
  CardBody,
  Center,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useAuthentication } from '@flowity/react'
import { Review } from '@prisma/client'
import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { toast } from 'react-hot-toast'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SubmitHandler, useForm } from 'react-hook-form'

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

const FundraisingForm: FC<{ reviewer: string }> = ({ reviewer }) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<{ amount: string }>()
  const tipReviewer = useTipReviewer()
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  const onSubmit: SubmitHandler<{ amount: string }> = async ({ amount }, e) => {
    e?.preventDefault()
    const formattedAmount = Number(amount).toFixed(8)

    const promise = tipReviewer.mutateAsync({
      args: (arg, t) => [arg(formattedAmount, t.UFix64), arg(reviewer, t.Address)],
    })

    toast.promise(promise, {
      loading: 'Funding...',
      success: 'Success!!!',
      error: 'Something went wront :(',
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack boxShadow={'lg'} bg={bgColor} p="2" borderRadius={'lg'}>
          <Text fontWeight={'bold'}>Fundraising</Text>
          <Input
            type={'number'}
            step=".00000001"
            placeholder="0.01"
            {...register('amount', {
              required: 'This is required',
            })}
          />
          <Button variant={'outline'} w="full" type="submit" isLoading={isSubmitting}>
            Fund
          </Button>
        </VStack>
      </form>
    </>
  )
}

const UploadOnChain: FC<{ review: Review; playId: number | undefined }> = ({
  review,
  playId,
}) => {
  const reviewsByPlayId = useReviewsByPlayId({ playId })
  const uploadReview = useUploadReview()
  const { login, isLoggedIn } = useAuthentication()
  const { updateReview } = useDB()

  return (
    <>
      {isLoggedIn ? (
        <Button
          onClick={async () => {
            const metadata = [
              { key: 'rating', value: review.rating.toString() },
              { key: 'title', value: review.title || '' },
              { key: 'description', value: review.description || '' },
              { key: 'editionID', value: review.playId.toString() || '' },
            ]

            const promise = uploadReview.mutateAsync({
              args: (arg, t) => [
                arg(metadata, t.Dictionary({ key: t.String, value: t.String })),
              ],
            })

            const promises = Promise.all([
              promise,
              updateReview.mutateAsync(
                {
                  onChain: true,
                  reviewId: review.id,
                },
                {
                  onSuccess() {
                    reviewsByPlayId.refetch()
                  },
                },
              ),
            ])

            toast.promise(promises, {
              loading: 'Uploading...',
              success: 'Success!!!',
              error: 'Something went wront :(',
            })
          }}
        >
          Upload to Flow
        </Button>
      ) : (
        <Button
          onClick={async () => {
            await login()
          }}
        >
          Connect Wallet to Save on-chain
        </Button>
      )}
    </>
  )
}

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
                IMAGE_MEDIA_TYPES[id]! as ImageType,
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
                VIDEO_MEDIA_TYPES[id]! as VideoType,
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
  const timeTextColor = useColorModeValue('gray.600', 'gray.500')
  const { data } = useSession()

  return (
    <>
      {reviewsByPlayId.data &&
        reviewsByPlayId.data.map((review) => (
          <Center key={review.id}>
            <Card maxW="sm">
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="md">{review.title}</Heading>
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

                  <Text>
                    {review.description} - {review.rating}
                  </Text>
                  <Text textColor={timeTextColor}>{timeAgo(review.createdAt)}</Text>
                  {review.user.address && review.fundraising === true && (
                    <>
                      <FundraisingForm reviewer={review.user.address} />
                    </>
                  )}
                  {review.onChain === true ? (
                    <>
                      <HStack>
                        <LockIcon />
                        <Text>Securely stored on-chain</Text>
                      </HStack>
                    </>
                  ) : (
                    <>
                      {data && data.user && data.user.id ? (
                        <UploadOnChain review={review} playId={playId} />
                      ) : (
                        <></>
                      )}
                    </>
                  )}
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
                        play.metadata.MatchDate,
                      ).getFullYear()}`}
                    </Text>
                    <Text>
                      {`${play.metadata.MatchHomeTeam} ${play.metadata.MatchHomeScore} - ${play.metadata.MatchAwayScore} ${play.metadata.MatchAwayTeam}`}
                    </Text>
                  </Stack>

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
                  <Center>
                    {(reviewAverage.data && reviewAverage.data._avg.rating) || 0} -{' '}
                    {reviewAverage.data && reviewAverage.data._count.rating} reviews
                  </Center>
                </CardBody>
              </Card>
            </Center>

            <ReviewFormModal />

            <Reviews playId={playId} />
          </VStack>
        )}
      </main>
    </>
  )
}

export default Play
