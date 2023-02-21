import React, { ForwardedRef, useState } from 'react'
import { Box, Button, Icon, IconButton, Stack, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

interface RatingProps {
  size: number
  icon: string
  scale: number
  fillColor: string
  strokeColor: string
}

const Rating = React.forwardRef(
  (
    { size, icon, scale, fillColor, strokeColor }: RatingProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [rating, setRating] = useState(0)
    const buttons = []

    const onClick = (idx: number) => {
      if (!isNaN(idx)) {
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && idx === 1) {
          setRating(0)
        } else {
          setRating(idx)
        }
      }
    }

    const RatingIcon = ({ fill }: { fill: boolean }) => {
      return (
        <IconButton
          name={icon}
          size={`${size}px`}
          color={fillColor}
          stroke={strokeColor}
          background="transparent"
          _hover={{ bg: 'transparent' }}
          icon={<StarIcon boxSize={'8'} fillOpacity={fill ? '100%' : '0'} />}
          aria-label={''} //   onClick={onClick}
        />
      )
    }

    const RatingButton = ({ idx, fill }: { idx: number; fill: boolean }) => {
      return (
        <Button
          as="button"
          aria-label={`Rate ${idx}`}
          height={`${size}px`}
          width={`${size}px`}
          variant={'unstyled'}
          mx={1}
          onClick={() => onClick(idx)}
          _focus={{ outline: 0 }}
        >
          <RatingIcon fill={fill} />
        </Button>
      )
    }

    for (let i = 1; i <= scale; i++) {
      buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />)
    }

    return (
      <Stack isInline mt={8} justify="center">
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
        <Box width={`${size * 1.5}px`} textAlign="center">
          <Text fontSize="sm" textTransform="uppercase">
            Rating
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" lineHeight="1.2em">
            {rating}
          </Text>
        </Box>
      </Stack>
    )
  }
)

Rating.displayName = 'Rating'

export default Rating
