import React from 'react'
import { useUsers, useUsersJotai } from 'user/queries'
import Typography from '@mui/material/Typography';

const UsersDelayedComponent = () => {

  const query = useUsers({
    staleTime: 6_000,
  })

  const queryJotai = useUsersJotai()

  return (
    <Typography>Delayed Component</Typography>
  )
}

export default UsersDelayedComponent