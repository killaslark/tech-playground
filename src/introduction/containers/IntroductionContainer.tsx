import React from 'react'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from 'shared/components/Card';
import { Link } from '@mui/material';

const IntroductionContainer = () => {
  return (
    <Card>
      <Stack spacing={2}>
        <Typography variant={'h5'}>{'Introduction'}</Typography>
        <Stack spacing={1}>
          <Link href={'/basic-usage'}>{'1. Basic Usage'}</Link>
          <Link href={'/isLoading-vs-isFetching-vs-isReFetching'}>{'2. isLoading vs isFetching vs isRefetching'}</Link>
          <Link href={'/staleTime-vs-cacheTime'}>{'3. StaleTime vs CacheTime'}</Link>
        </Stack>
      </Stack>
    </Card>
  )
}

export default IntroductionContainer
