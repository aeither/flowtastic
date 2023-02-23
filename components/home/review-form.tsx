import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
} from '@chakra-ui/react'
import Rating from '../shared/rating'
import { useDB } from '@/libs/hooks/use-db'
import { useStore } from '@/libs/store'
import { useRouter } from 'next/router'

export interface ReviewFormInput {
  rating: number
  title: string
  description: string
}

export const ReviewForm: FC = () => {
  const { createReview } = useDB()
  const { query } = useRouter()
  const playId = Number(query.playId) as number

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
    <form
      style={{ width: '100%', maxWidth: '390px', padding: '2px' }}
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <Button
        mt={4}
        w="full"
        colorScheme="teal"
        isLoading={isSubmitting}
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}
