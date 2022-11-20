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

// import { useQueryClient } from '@tanstack/react-query';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const UsersPreview = () => {
  // const queryClient = useQueryClient()

  // alt-1
  const query = useUsers({
    staleTime: 6_000
  })

  // alt-2
  // const queryJotai = useUsersJotai()

  const { data, isLoading } = query

  return (
    <Stack spacing={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align={'center'}>{'ID'}</StyledTableCell>
              <StyledTableCell align={'center'}>{'Name'}</StyledTableCell>
              <StyledTableCell align={'center'}>{'Address'}</StyledTableCell>
              <StyledTableCell align={'center'}>{'Email'}</StyledTableCell>
              <StyledTableCell align={'center'}>{'Phone'}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow >
                <StyledTableCell colSpan={5} align={'center'} component={'th'} scope={'row'}>
                  <CircularProgress />
                </StyledTableCell>
              </TableRow>
            ) : data.map(user => (
              <TableRow key={user.id}>
                <StyledTableCell align={'center'}>{user.id}</StyledTableCell>
                <StyledTableCell align={'center'}>{user.name}</StyledTableCell>
                <StyledTableCell align={'center'}>{user.address.city}</StyledTableCell>
                <StyledTableCell align={'center'}>{user.email}</StyledTableCell>
                <StyledTableCell align={'center'}>{user.phone}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default UsersPreview