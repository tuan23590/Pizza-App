import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
export default function DangNhap() {
  const xuLuDangNhapVoiGooogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
  }
  return (
    <Box sx={{width: '100%',justifyContent: 'center',textAlign: 'center'}}>
    <Typography variant="h4">Đăng nhập</Typography>
    <Button variant='contained' color='info' onClick={xuLuDangNhapVoiGooogle} >
      Đăng Nhập với Google
    </Button>
    </Box>
  )
}
