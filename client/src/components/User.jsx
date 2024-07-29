import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Link, Typography } from '@mui/material';

export default function User() {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between',padding: '5px',':hover': {
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}}>
        <AccountCircleIcon sx={{color: 'red'}} />
        <Typography sx={{fontWeight: '500'}}>Tài Khoản</Typography>
        <Link href='/QuanLy'>
            Quản lý
        </Link>
    </Box>
  )
}
