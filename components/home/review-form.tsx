import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import Rating from '../shared/rating'
import { useDB } from '@/libs/hooks/use-db'
import { useStore } from '@/libs/store'

export interface ReviewFormInput {
  rating: number
  title: string
  description: string
}

export const ReviewForm: FC = () => {
  const { createReview } = useDB()
  const playId = useStore((state) => state.playId)

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormInput>()

  const onSubmit: SubmitHandler<ReviewFormInput> = async (
    { description, rating, title },
    e
  ) => {
    e?.preventDefault()

    createReview.mutate({ description, playId, rating, title })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.title}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          placeholder="title"
          {...register('title', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.description}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
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
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  )
}
