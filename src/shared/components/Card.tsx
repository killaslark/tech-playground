import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Card = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1),
}));

export default Card