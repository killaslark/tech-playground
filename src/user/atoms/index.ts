import { atomsWithQuery } from 'jotai-tanstack-query'
import { getUsers } from 'user/services'
import { GET_USERS_API } from 'user/services/getUsers'

export const usersAtom = atomsWithQuery(() => ({
  queryKey: [GET_USERS_API],
  queryFn: getUsers,
  staleTime: 3_000
}))
