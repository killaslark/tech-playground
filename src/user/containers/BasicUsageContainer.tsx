import React from 'react'
// import { useUsers, useUsersJotai } from 'user/queries'
import { UsersPreview } from '../components'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const BasicUsageContainer = () => {
  /**
  * Alternative-1 : Custom React Query
  * Pros: 
  * - Able to use do a dynamic config (staleTime, on Success, etc)
  * 
  * Cons:
  * - Need to handle state manually (can be useState, jotai, context, etc)
  * 
  */
  // const query = useUsers()

  /**
   * Alternative-2 : Integrated jotai with useQuery
   * Pros: 
   * - all handled by jotai
   * - can access other jotai as parameter / request data
   * 
   * Cons:
   * - Hard to do a dynamic config (staleTime, on Success, etc)
   * 
   */
  // const queryJotai = useUsersJotai()

  return (
    <Stack spacing={2}>
      <Typography variant={'h5'}>{'Basic Usage'}</Typography>
      <UsersPreview />
    </Stack>
  )
}

export default BasicUsageContainer
