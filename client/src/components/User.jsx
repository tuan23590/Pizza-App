import React, { useContext, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

export default function User() {
  const { user } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const xuLyDangXuat = () => {
    user.auth.signOut();
    navigate('/DangNhap');
  }
  const xuLyDongMenu = () => {
    setAnchorEl(null);
  }
  return (
   <>
    <Box sx={{
      display: 'flex', justifyContent: 'space-between', padding: '5px', ':hover': {
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }
    }} onClick={()=>{
      setAnchorEl(event.currentTarget);
    }}>
      <AccountCircleIcon sx={{ color: 'red' }} />
      {user.uid ? 
      <Typography sx={{ fontWeight: '500' }} onClick={xuLyDangXuat}>{(user.displayName || user.email) + '(Đăng xuất)'}</Typography> : 
      <Typography sx={{ fontWeight: '500' }} onClick={()=>{navigate('/DangNhap')}}>Tài khoản</Typography>}
      {/* <Typography sx={{ fontWeight: '500' }}>{user.displayName}</Typography> */}
    </Box>
   </>
  )
}
