import { Box } from '@mui/material';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SanPham from './SanPham';

export default function DanhSachSanPham() {
  const danhSachSanPham = useLoaderData();  

  return (
    <Box 
      sx={{
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'start',
        margin: 'auto',
        marginLeft: '10px',
        marginTop: '20px',
        maxHeight: '87vh',
        overflow: 'auto',
      }}
    >
      {danhSachSanPham.map((sanPham) => {
        const kichThuocParsed = JSON.parse(sanPham.kichThuoc || '[]');
        const loaiDeParsed = JSON.parse(sanPham.loaiDe || '[]');

        return (
          <SanPham 
            key={sanPham.maSanPham} 
            sanPham={{ 
              ...sanPham, 
              kichThuoc: kichThuocParsed,
              loaiDe: loaiDeParsed
            }} 
          />
        );
      })}
    </Box>
  );
}
