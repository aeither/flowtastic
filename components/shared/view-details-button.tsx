import { Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'

export const ViewDetailsButton: FC<{ playId: string }> = ({ playId }) => {
  return (
    <NextLink href={`/play?playId=${playId}`}>
      <Button
        w="full"
        variant="solid"
        textTransform={'uppercase'}
        borderTopRadius={0}
        colorScheme="teal"
      >
        Reviews
      </Button>
    </NextLink>
  )
}
