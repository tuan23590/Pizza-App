import { Box, Menu, MenuItem, Paper, Select, Typography } from '@mui/material';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SanPham from './SanPham';

export default function DanhSachSanPham() {
  const danhSachSanPham = useLoaderData();
  console.log(danhSachSanPham);
  return (
    <Box 
      sx={{
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'start',
        margin: 'auto',
        marginLeft: '10px',
        marginTop: '20px',
      }}
    >
      {danhSachSanPham.map((sanPham) => (
       <SanPham key={sanPham.maSanPham} sanPham={sanPham} />
      ))}
    </Box>
  );
}
