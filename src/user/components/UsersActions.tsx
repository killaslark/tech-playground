import React from 'react'
import { useUsers } from '../queries'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import { useQueryClient } from '@tanstack/react-query';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const UsersActions = () => {
  const queryClient = useQueryClient()

  // alt-1
  const query = useUsers({
    staleTime: 6_000
  })

  // alt-2
  // const queryJotai = useUsersJotai()

  const { isLoading, isFetching, isRefetching, refetch, queryKey } = query

  /**
   * All of method below will put the query status into fetching
   * then move to fresh
   * then will put back to stale after meet the staleTime
   * 
   * Set your connection to be slower to see the different
   */
  const refetchWithQueryResult = () => refetch()

  const refetchWithQueryClient = () => queryClient.refetchQueries(queryKey)

  const invalidateQueries = () => queryClient.invalidateQueries(queryKey)

  const resetQuery = () => queryClient.resetQueries(queryKey)


  return (
    <Stack spacing={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align={'center'}>{'isLoading'}</StyledTableCell>
              <StyledTableCell align={'center'}>{'isFetching'}</StyledTableCell>
              <StyledTableCell align={'center'}>{'isRefetching'}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell align={'center'}>{isLoading && <CircularProgress />}</StyledTableCell>
              <StyledTableCell align={'center'}>{isFetching && <CircularProgress />}</StyledTableCell>
              <StyledTableCell align={'center'}>{isRefetching && <CircularProgress />}</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} direction={'row'}>
        <Button onClick={refetchWithQueryResult} variant={'contained'}>{'Query Result Refetch'}</Button>
        <Button onClick={invalidateQueries} variant={'contained'}>{'Query Client Invalidate Query'}</Button>
        <Button onClick={refetchWithQueryClient} variant={'contained'}>{'Query Client Refetch'}</Button>
        <Button onClick={resetQuery} variant={'contained'}>{'Query Client Reset Query'}</Button>
      </Stack>
    </Stack>
  )
}

export default UsersActions