import { StarIcon } from '@chakra-ui/icons'
import { Button, HStack } from '@chakra-ui/react'
import React, { ForwardedRef, useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { ReviewFormInput } from '../home/review-form'

interface RatingProps {
  size: number
  icon: string
  scale: number
  fillColor: string
  strokeColor: string
  setValue?: UseFormSetValue<ReviewFormInput>
  viewOnly?: boolean
  viewRating?: number
}

const Rating = React.forwardRef(
  (
    { size, scale, fillColor, strokeColor, setValue, viewOnly, viewRating }: RatingProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const buttons = []
    const [rating, setRating] = useState(0)
    useEffect(() => {
      if (viewOnly) setRating((viewRating && viewRating) || 0)
    }, [viewOnly, viewRating])

    const onClick = (idx: number) => {
      if (!isNaN(idx)) {
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && idx === 1) {
          setRating(0)
        } else {
          setRating(idx)
          setValue && setValue('rating', idx)
        }
      }
    }

    const RatingIcon = ({ fill }: { fill: boolean }) => {
      return (
        <StarIcon
          color={fillColor}
          stroke={strokeColor}
          boxSize={size}
          fillOpacity={fill ? '100%' : '0'}
        />
      )
    }

    const RatingButton = ({ idx, fill }: { idx: number; fill: boolean }) => {
      return (
        <Button
          as="button"
          aria-label={`Rate ${idx}`}
          variant={'unstyled'}
          minW={{ base: '7', md: '12' }}
          onClick={() => (viewOnly ? {} : onClick(idx))}
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
      <HStack my={2} justify="center" spacing={0} gap={0}>
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
      </HStack>
    )
  },
)

Rating.displayName = 'Rating'

export default Rating
