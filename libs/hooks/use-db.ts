import { api } from '../api'
import toast from 'react-hot-toast'
import { useStore } from '../store'
import { useSession } from 'next-auth/react'

export function useDB({ playId }: { playId?: number }) {
  // const playId = useStore((state) => state.playId)
  const { data: session } = useSession()

  const reviewAverage = api.db.reviewAverage.useQuery(
    { playId: playId! },
    {
      enabled: !!playId,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  )

  const reviewsByPlayId = api.db.reviewsByPlayId.useQuery(
    { playId: playId! },
    {
      enabled: !!playId,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  )

  const userAddress = api.db.userAddress.useQuery(undefined, {
    enabled: (session && !!session.user.id) || false,
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const createReview = api.db.createReview.useMutation({
    onMutate() {
      toast.loading('Loading...')
    },
    onSuccess() {
      toast.remove()
      toast.success('Success')

      if (playId) {
        reviewAverage.refetch()
        reviewsByPlayId.refetch()
      }
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
    userAddress,
  }
}
