import { Box, Typography } from '@mui/material';
import React from 'react';

export default function SanPhamTrongGioHang({sanPham}) {
    const giaCuaSanPham = (sanPham.gia + ((sanPham.kichThuocBanh?.giaKichThuoc) ?? 0) + ((sanPham.loaiDe?.giaLoaiDe) ?? 0)) * sanPham.soLuong;
  return (
          <Box sx={{display : 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display : 'flex'}}>
            <Typography sx={{marginX: '20px'}}>{sanPham.soLuong}x</Typography>
            <Typography>{sanPham.tenSanPham}</Typography>
            </Box>
            <Box>{giaCuaSanPham.toLocaleString('vi-VN')}₫</Box>
          </Box>
  );
}
