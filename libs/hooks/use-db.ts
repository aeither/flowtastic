import { api } from '../api'
import toast from 'react-hot-toast'
import { useStore } from '../store'

export function useDB() {
  const playId = useStore((state) => state.playId)

  const reviewAverage = api.db.reviewAverage.useQuery(
    { playId },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  )

  const reviewsByPlayId = api.db.reviewsByPlayId.useQuery(
    { playId },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  )

  const createReview = api.db.createReview.useMutation({
    onMutate() {
      toast.loading('Loading...')
    },
    onSuccess() {
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
        toast.error('mutation error')
      }
    },
  })

  const addAddress = api.db.addAddress.useMutation({
    onMutate() {
      toast.loading('Loading...')
    },
    onSuccess() {
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
        toast.error('mutation error')
      }
    },
  })
  return {
    reviewAverage,
    createReview,
    reviewsByPlayId,
    addAddress,
  }
}
