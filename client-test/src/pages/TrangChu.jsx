import React from 'react'
import SlideShow from './../components/TrangChu/SlideShow';
import DiaChi from '../components/TrangChu/DiaChi';
import { Box } from '@mui/material';
import Map from '../components/TrangChu/Map';

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
    <Map />
   </>
  )
}