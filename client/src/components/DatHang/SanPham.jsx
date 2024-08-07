import { Box, Button, MenuItem, Paper, Select, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { GioHangContext } from '../../pages/DatHang';

export default function SanPham({ sanPham }) {
  const { gioHang,setGioHang } = useContext(GioHangContext);
  const [kichThuocBanh, setKichThuocBanh] = React.useState(sanPham.kichThuoc[0]);
  const [loaiDe, setLoaiDe] = React.useState(sanPham.loaiDe[0]);
  const gia = (loaiDe?.giaLoaiDe || 0) + (kichThuocBanh?.giaKichThuoc || 0) + sanPham.giaSanPham;

  const themSanPhamVaoGioHang = (sanPham) => {
    setGioHang((prevGioHang) => {
      const existingProductIndex = prevGioHang.findIndex(item => item.maSanPham === sanPham.maSanPham);
  
      if (existingProductIndex !== -1) {
        const updatedGioHang = [...prevGioHang];
        updatedGioHang[existingProductIndex].soLuong += 1;
        return updatedGioHang;
      } else {
        return [...prevGioHang, {
          maSanPham: sanPham.maSanPham,
          tenSanPham: sanPham.tenSanPham,
          kichThuocBanh: kichThuocBanh,
          loaiDe: loaiDe,
          gia: sanPham.giaSanPham,
          soLuong: 1
        }];
      }
    });
  };
  

  return (
    <Paper
      key={sanPham.maSanPham}
      sx={{
        width: 'calc(25% - 15px)', // to account for the gap
        boxSizing: 'border-box',
        marginLeft: '10px',
        marginBottom: '10px',
        overflow: 'hidden', // Ensure the zoom effect doesn't overflow the Paper component
      }}
    >
      <Box
        component="img"
        src={sanPham.hinhAnh}
        alt={sanPham.tenSanPham}
        sx={{
          width: '100%',
          height: 'auto',
          transition: 'transform 0.3s ease-in-out', // Smooth transition for the zoom effect
          ':hover': {
            transform: 'scale(1.1)', // Zoom effect
          }
        }}
      />
      <Box sx={{ padding: '10px' }}>
        <Typography variant='h6'>{sanPham.tenSanPham}</Typography>
        {/* <Typography height={"20px"} color='green' mb={'5px'} variant='subtitle2'>{sanPham.ghiChu}</Typography> */}
        <Typography variant='body1' mb={'5px'} >{sanPham.moTa}</Typography>


        {sanPham.kichThuoc.length > 0 && (
          <>
            <Typography>Chọn kích thước bánh</Typography>
            <Select
              fullWidth
              size='small'
              sx={{ marginBottom: '5px' }}
              value={kichThuocBanh}
              onChange={(e) => setKichThuocBanh(e.target.value)}
            >
              {sanPham.kichThuoc.map((kt) => (
                <MenuItem key={kt} value={kt}>{kt.tenKichThuoc}</MenuItem>
              ))}
            </Select>
          </>
        )
        }

        {sanPham.loaiDe.length > 0 && (
          <>
            <Typography>Chọn loại đế</Typography>
            <Select
              fullWidth
              size='small'
              sx={{ marginBottom: '10px' }}
              value={loaiDe}
              onChange={(e) => setLoaiDe(e.target.value)}
            >
              {sanPham.loaiDe.map((ld) => (
                <MenuItem key={ld} value={ld}>{ld.tenLoaiDe} ({kichThuocBanh?.tenKichThuoc})</MenuItem>
              ))}
            </Select>
          </>
        )}
        <Button fullWidth variant='contained' color='success' sx={{ display: 'flex', justifyContent: 'space-between' }} onClick={()=>themSanPhamVaoGioHang(sanPham)}>
          <Typography variant='button'>Chọn</Typography>
          <Typography variant='inherit'>{gia.toLocaleString('vi-VN') + 'đ'}</Typography>
        </Button>
      </Box>
    </Paper>
  )
}
