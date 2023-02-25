import Rating from '@/components/shared/rating'
import { useReviewsByPlayId } from '@/libs/hooks/use-db'
import { useAllReviewsByOwner } from '@/libs/hooks/use-flow'
import { timeAgo } from '@/libs/utils/helpers'
import { LockIcon } from '@chakra-ui/icons'
import {
  Card,
  CardBody,
  Center,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useAuthentication } from '@flowity/react'
import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'

const MyReviews: NextPage = () => {
  const { user } = useAuthentication()
  const { data } = useAllReviewsByOwner({ address: user?.addr })
  console.log('🚀 ~ file: my-reviews.tsx:23 ~ data:', data)
  const timeTextColor = useColorModeValue('gray.600', 'gray.500')

  return (
    <>
      {/* 
    <>
      {data &&
        data.items.map((review) => (
          <Center key={review.}>
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
} */}
    </>
  )
}

export default MyReviews
