import Rating from '@/components/shared/rating'
import { useAllReviewsByOwner } from '@/libs/hooks/use-flow'
import { LockIcon } from '@chakra-ui/icons'
import {
  Card,
  CardBody,
  Center,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useAuthentication } from '@flowity/react'
import { type NextPage } from 'next'

const MyReviews: NextPage = () => {
  const { user } = useAuthentication()
  const { data } = useAllReviewsByOwner({ address: user?.addr })

  return (
    <>
      <VStack>
        {data &&
          data.map((review) => (
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
                        viewRating={Number(review.rating)}
                      />
                    </div>

                    <Text>
                      {review.description} - {review.rating}
                    </Text>
                    <HStack spacing={6} pt={4}>
                      <LockIcon />
                      <Text textColor={'gray.400'}>
                        This Review is Securely stored on Flow Blockchain
                      </Text>
                    </HStack>
                  </Stack>
                </CardBody>
              </Card>
            </Center>
          ))}
        {data === undefined && (
          <Center>
            <Card maxW="sm">
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="md">No Review Found on the Blockchain</Heading>
                </Stack>
              </CardBody>
            </Card>
          </Center>
        )}
      </VStack>
    </>
  )
}

export default MyReviews
