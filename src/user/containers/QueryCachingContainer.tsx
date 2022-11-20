import React, { useEffect, useState } from 'react'
import { useUsers } from 'user/queries'
import { UsersDelayedComponent, UsersPreview } from '../components'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';

const QueryCachingContainer = () => {
  const [isRefetched, setIsRefetched] = useState(false)
  const [isFromCache, setIsFromCache] = useState(false)
  const [showToggledComponent, setShowToggledComponent] = useState(false)


  const { isStale, isFetching } = useUsers({
    staleTime: 6_000,
  })

  // const queryJotai = useUsersJotai()

  /**
    * staleTime is duration for query to be determined as fresh
    * staleTime start counted from first query with same keys called
    * only get value from cache when query is fresh
    * render time of component > staleTime ? refetch : use cache
    */
  useEffect(() => {
    // Case 1: query still fresh, will take from cache
    const timeout = 4_000

    const timer = setTimeout(() => setIsFromCache(true), timeout)
    return () => clearTimeout(timer)
  }, [])


  useEffect(() => {
    // Case 1: query is stale, will refetch it
    const timeout = 7_000

    const timer = setTimeout(() => setIsRefetched(true), timeout)
    return () => clearTimeout(timer)
  }, [])


  return (
    <Stack spacing={1}>
      <Typography variant={'h5'}>{'StaleTime vs CacheTime'}</Typography>
      <Stack direction={'row'} spacing={2}>
        <Chip label={isStale ? 'stale' : 'fresh'} color={isStale ? 'warning' : 'success'} />
        <Chip label={isFetching ? 'isFetching' : 'isIddle'} color={isFetching ? 'primary' : 'secondary'} />
      </Stack>
      <Stack direction={'row'}>
        <Button
          onClick={() => setShowToggledComponent(prev => !prev)}
          variant={'contained'}
        >
          {showToggledComponent ? 'hide' : 'show'} {'component'}
        </Button>
      </Stack>

      {showToggledComponent && (
        <Stack direction={'row'} spacing={1}>
          <Typography>{'Toggled Component '}</Typography>
          <UsersDelayedComponent />
        </Stack>
      )}

      {isFromCache && (
        <Stack direction={'row'} spacing={1}>
          <Typography>{' From Cache '}</Typography>
          <UsersDelayedComponent />
        </Stack>
      )}
      {isRefetched && (
        <Stack direction={'row'} spacing={1}>
          <Typography>{' Refetched '}</Typography>
          <UsersDelayedComponent />
        </Stack>
      )}
      <UsersPreview />
    </Stack >
  )
}

export default QueryCachingContainer
