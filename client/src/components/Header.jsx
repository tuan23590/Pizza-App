import React, { useContext } from 'react';
import { Box, Link, Typography } from '@mui/material';
import User from './User';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useNavigate } from 'react-router-dom';
import DiaChi from './TrangChu/DiaChi';
import { GioHangContext } from '../context/GioHangProvider';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ThongBao from './ThongBao';

export default function Header() {
  const { gioHang,hienThiDiaChi,setHienThiDiaChi } = useContext(GioHangContext);
  const navigate = useNavigate();
  return (
    <>
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
            display: 'flex',
            marginRight: '5px',
          }}
          onClick={() => setHienThiDiaChi(!hienThiDiaChi)}
          >
            <LocationOnOutlinedIcon />
            <Typography
            sx={{
              fontWeight: '500',
            }}
            >{gioHang.diaChiGiaoHang}</Typography>
          </Box>
          <ThongBao />
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
      {hienThiDiaChi && (
        <>
          {/* Overlay to darken the background */}
          <Box
            onClick={() => setHienThiDiaChi(false)} // Close DiaChi when clicking outside
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Tối nền với độ mờ
              zIndex: 999, // Đặt bên dưới Box nhưng trên các phần tử khác
            }}
          />
          <Box
            sx={{
              position: 'fixed',
              zIndex: 1000,
              left: 'calc(50% - 290px)',
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the Box
          >
            <DiaChi />
          </Box>
        </>
      )}
    </>
  );
}
