import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/cover.png';

import { Box, IconButton, Stack, Button, Input, Divider } from '@mui/joy';

import { Search } from '@mui/icons-material';

export const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
    navigate(`/search/${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          mt: '0.8rem',
          ml: '1.8rem',
          mr: '1.8rem',
          mb: '0.8rem',
        }}
      >
        <Link to='/' style={{ textDecoration: 'none' }}>
          <IconButton size='xs' edge='start' aria-label='logo'>
            <Box pt='6px'>
              <img src={logo} width='130px' />
            </Box>
          </IconButton>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Input
          component='form'
          onSubmit={handleSearchSubmit}
          placeholder='Search for products...'
          endDecorator={
            <IconButton type='submit' variant='soft' color='neutral' size='md'>
              <Search />
            </IconButton>
          }
          sx={{
            '--Input-focusedInset': 'var(--any, )',
            '--Input-focusedThickness': '0.13rem',
            '--Input-focusedHighlight': 'rgba(13,110,253,.25)',
            '&::before': {
              transition: 'box-shadow .15s ease-in-out',
            },
            '&:focus-within': {
              borderColor: '#86b7fe',
            },
            minWidth: '370px',
          }}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction='row' spacing={1}>
          <Button variant='outlined'>Categories</Button>
          <Button variant='plain' color='neutral'>
            Deals
          </Button>
          <Button variant='plain' color='neutral'>
            About
          </Button>
        </Stack>
      </Box>
      <Divider />
    </>
  );
};
