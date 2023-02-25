import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { api } from '../api'

export const useReviewAverage = ({ playId }: { playId: number | undefined }) => {
  const reviewAverage = api.db.reviewAverage.useQuery(
    { playId: playId! },
    {
      enabled: !!playId,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  )
  return reviewAverage
}

export const useReviewsByPlayId = ({ playId }: { playId: number | undefined }) => {
  const reviewsByPlayId = api.db.reviewsByPlayId.useQuery(
    { playId: playId! },
    {
      enabled: !!playId,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  )
  return reviewsByPlayId
}

export function useDB() {
  const { data: session } = useSession()
  const [playId, setPlayId] = useState<number>()
  const reviewAverage = useReviewAverage({ playId })
  const reviewsByPlayId = useReviewsByPlayId({ playId })

  const userAddress = api.db.userAddress.useQuery(undefined, {
    enabled: (session && !!session.user.id) || false,
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const createReview = api.db.createReview.useMutation({
    onMutate(variables) {
      const { playId: _playId } = variables
      setPlayId(_playId)

      toast.loading('Loading...')
    },
    onSuccess(data, variables, context) {
      toast.remove()
      toast.success('Success')

      reviewAverage.refetch()
      reviewsByPlayId.refetch()
    },
    onError: ({ data }) => {
      toast.remove()
      if (data?.code === 'UNAUTHORIZED') {
        toast.error('Require sign in')
      } else {
        toast.error('Erorr. Make sure all fields are filled.')
      }
    },
  })

  const updateReview = api.db.updateReview.useMutation()

  const addAddress = api.db.addAddress.useMutation({
    onMutate() {
      toast.loading('Loading...')
    },
    onSuccess() {
      toast.remove()
      toast.success('Success')
    },
    onError: ({ data }) => {
      toast.remove()
      if (data?.code === 'UNAUTHORIZED') {
        toast.error('Require sign in')
      } else {
        toast.error('mutation error')
      }
    },
  })
  return {
    createReview,
    updateReview,
    addAddress,
    userAddress,
  }
}
