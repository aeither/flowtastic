import { useDB } from '@/libs/hooks/use-db'
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Rating from '../shared/rating'

export interface ReviewFormInput {
  rating: number
  title: string
  description: string
  fundraising: boolean
}

export const ReviewForm: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { createReview } = useDB()
  const { query } = useRouter()
  const playId = Number(query.playId) as number

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormInput>()

  const onSubmit: SubmitHandler<ReviewFormInput> = async (input, e) => {
    e?.preventDefault()
    createReview.mutate({ playId, ...input })
    onClose()
  }

  return (
    <form
      style={{ width: '100%', maxWidth: '390px', padding: '2px' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={!!errors.title}>
        <div>
          <Rating
            size={8}
            icon="star"
            scale={5}
            fillColor="gold"
            strokeColor="grey"
            setValue={setValue}
          />
        </div>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          placeholder="title"
          {...register('title', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.description}>
        <FormLabel htmlFor="description">Review</FormLabel>
        <Textarea
          id="description"
          placeholder="description"
          {...register('description', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.fundraising}>
        <FormLabel htmlFor="fundraising">Is fundraising?</FormLabel>
        <Checkbox {...register('fundraising')}>
          Allow receiving funds. Remember to add your wallet address in your profile.
        </Checkbox>

        <FormErrorMessage>
          {errors.fundraising && errors.fundraising.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} w="full" colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  )
}
