import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component={'nav'}>
        <Toolbar>
          <Typography
            variant={'h6'}
            component={'div'}
            sx={{ flexGrow: 1, display: 'block' }}
          >
            {'React Query Introduction'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component={'main'} sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Navbar