import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { GioHangContext } from '../../pages/DatHang';
import SanPhamTrongGioHang from './SanPhamTrongGioHang';

export default function GioHang() {
  const { gioHang } = useContext(GioHangContext);
  console.log("gioHang: ",gioHang);
  return (
    <Box sx={{border: 1, borderColor: 'gray', height: '93vh'}}>
      <Typography sx={{
          textAlign: 'center',
          fontSize: '1rem',
          fontWeight: '500',
          padding: '10px',
          borderBottom: 1,
          borderColor: 'gray'
      }}>
        {gioHang.map((sanPham) => (
          <SanPhamTrongGioHang key={sanPham.maSanPham} sanPham={sanPham} />
        ))  
        }
      </Typography>
    </Box>
  );
}
