import { api } from '../api'

export function useDB() {
  const user = api.db.user.useQuery(undefined, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  return {
    user,
  }
}
