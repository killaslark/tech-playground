import React from 'react'
// import { useUsers, useUsersJotai } from 'user/queries'
import { UsersActions, UsersPreview } from '../components'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const QueryStatusContainer = () => {

  // const query = useUsers()
  // const queryJotai = useUsersJotai()

  return (
    <Stack spacing={2}>
      <Typography variant={'h5'}>{'isLoading vs isFetching vs isRefetching'}</Typography>
      <UsersPreview />
      <UsersActions />
    </Stack>
  )
}

export default QueryStatusContainer
