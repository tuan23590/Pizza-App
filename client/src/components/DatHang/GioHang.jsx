import { Box, Typography } from '@mui/material'
import React from 'react'

export default function GioHang() {
  return (
    <Box sx={{border: 1, borderColor: 'gray', height: '93vh'}}>
        <Typography sx={{
            textAlign: 'center',
            fontSize: '1 rem',
            fontWeight: '500',
            padding: '10px',
            borderBottom: 1,
            borderColor: 'gray'
        }}>
            Giỏ hàng
        </Typography>
    </Box>
  )
}
