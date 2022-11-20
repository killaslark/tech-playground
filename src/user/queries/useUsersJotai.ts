import { useAtom } from 'jotai'
import { usersAtom } from 'user/atoms'

const useUsersJotai = () => {
  const [, queryAtom] = usersAtom
  const [query] = useAtom(queryAtom)

  return query
}

export default useUsersJotai