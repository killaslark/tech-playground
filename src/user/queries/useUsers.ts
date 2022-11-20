import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import getUsers, { GetUsersAPIResponse, GET_USERS_API } from '../services/getUsers'

type UseUsersQueryKeys = string[]
type UseUsersOptions = UseQueryOptions<
  GetUsersAPIResponse,
  unknown,
  GetUsersAPIResponse,
  UseUsersQueryKeys
>

const useUsers = (config?: UseUsersOptions) => {
  const queryKey = [GET_USERS_API]

  const query = useQuery({
    queryKey,
    queryFn: getUsers,
    ...config,
  })

  return {
    queryKey,
    ...query
  }
}

export default useUsers;