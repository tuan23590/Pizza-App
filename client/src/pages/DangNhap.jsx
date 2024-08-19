import React, { useContext, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
export default function DangNhap() {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const xuLuDangNhapVoiGooogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
    navigate('/')
  }
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/')
    }
  }, [])
  return (
    <Box sx={{width: '100%',justifyContent: 'center',textAlign: 'center'}}>
    <Typography variant="h4">Đăng nhập</Typography>
    <Button variant='contained' color='info' onClick={xuLuDangNhapVoiGooogle} >
      Đăng Nhập với Google
    </Button>
    </Box>
  )
}
