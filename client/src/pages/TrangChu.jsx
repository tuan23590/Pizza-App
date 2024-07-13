import React from 'react'
import SlideShow from './../components/TrangChu/SlideShow';
import DiaChi from '../components/TrangChu/DiaChi';
import { Box } from '@mui/material';
import KhuyenMai from '../components/TrangChu/KhuyenMai';
import Footer from '../components/Footer';

export default function TrangChu() {
  return (
   <>
    <Box sx={{
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    }}>
    <SlideShow />
    <DiaChi />
   
    </Box>
    <Box sx={{marginTop: '130px'}}>
    <KhuyenMai />
    </Box>
    <Footer />
   </>
  )
}
