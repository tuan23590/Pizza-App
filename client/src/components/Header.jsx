import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import User from './User';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
      <Link href="/" sx={{ padding: '10px' }}>
        <img
          src="https://cdn.pizzahut.vn/images/Web_V3/Homepage/bd3555a.png"
          alt="Pizza Hut Banner"
          style={{ width: '150px', height: 'auto' }}
        />
      </Link>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginRight: '20px', width: 'auto', }}>
        <Box sx={{
          cursor: 'pointer',
          paddingTop: '5px',
        }}>
          <NotificationsNoneIcon />
        </Box>
        <User />
        <Link
          onClick={() => navigate('/TheoDoiDonHang')}
          sx={{
            display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: 'black', padding: '5px', ':hover': {
              cursor: 'pointer',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }
          }} >
          <TravelExploreIcon sx={{ color: 'red' }} />
          <Typography sx={{ fontWeight: '500' }}>Theo dõi đơn hàng</Typography>
        </Link>
      </Box>
    </Box>
  );
}
