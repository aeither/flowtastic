import { Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'
import posthog from 'posthog-js'

export const ViewDetailsButton: FC<{ playId: string }> = ({ playId }) => {
  const viewDetails = () => {
    posthog.capture('view-details', { playId })
  }
  return (
    <NextLink href={`/play?playId=${playId}`}>
      <Button
        w="full"
        variant="solid"
        textTransform={'uppercase'}
        borderTopRadius={0}
        colorScheme="teal"
        onClick={viewDetails}
      >
        Reviews
      </Button>
    </NextLink>
  )
}
