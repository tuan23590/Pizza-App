import { Box, Button, MenuItem, Paper, Select, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { GioHangContext } from '../../context/GioHangProvider';
import { AuthContext } from '../../context/AuthProvider';

export default function SanPham({ sanPham }) {
  const { setNotifyOpen, setNotificationMessage, setNotificationSeverity } = useContext(AuthContext);
  const { setGioHang } = useContext(GioHangContext);
  const [kichThuoc, setkichThuoc] = useState(null);
  const [loaiDe, setLoaiDe] = useState(null);
  const gia = (loaiDe?.giaLoaiDe || 0) + (kichThuoc?.giaKichThuoc || 0) + sanPham.giaSanPham;

  useEffect(() => {
    setkichThuoc(sanPham.kichThuoc[0]);
    setLoaiDe(sanPham.loaiDe[0]);
  }, [sanPham.kichThuoc, sanPham.loaiDe]);

  const themSanPhamVaoGioHang = (sanPham) => {
    setGioHang((prevGioHang) => {
      // Đảm bảo prevGioHang.danhSachSanPham là một mảng
      const danhSachSanPham = prevGioHang?.danhSachSanPham || [];
  
      const existingProductIndex = danhSachSanPham.findIndex(item => 
        item.maSanPham === sanPham.maSanPham && 
        item.kichThuoc === kichThuoc && 
        item.loaiDe === loaiDe
      );
  
      let updatedDanhSachSanPham;
  
      if (existingProductIndex !== -1) {
        updatedDanhSachSanPham = [...danhSachSanPham];
        updatedDanhSachSanPham[existingProductIndex].soLuong += 1;
      } else {
        updatedDanhSachSanPham = [...danhSachSanPham, {
          id: sanPham.id,
          maSanPham: sanPham.maSanPham,
          tenSanPham: sanPham.tenSanPham,
          kichThuoc: kichThuoc,
          loaiDe: loaiDe,
          gia: sanPham.giaSanPham,
          soLuong: 1,
          hinhAnh: sanPham.hinhAnh,
          ghiChu: sanPham.ghiChu,
          moTa: sanPham.moTa,
          danhMuc: sanPham.danhMuc.maDanhMuc,
          giaSanPham: sanPham.giaSanPham,
        }];
      }
  
      const updatedGioHang = {
        ...prevGioHang,
        danhSachSanPham: updatedDanhSachSanPham
      };
  
      localStorage.setItem('gioHang', JSON.stringify(updatedGioHang));
      return updatedGioHang;
    });
    setNotifyOpen(true);
    setNotificationMessage('Đã thêm sản phẩm vào giỏ hàng');
    setNotificationSeverity('success');
    
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
              value={kichThuoc}
              onChange={(e) => setkichThuoc(e.target.value)}
            >
              {sanPham.kichThuoc.map((kt) => (
                <MenuItem key={kt.id} value={kt}>{kt.tenKichThuoc}</MenuItem>
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
                <MenuItem key={ld.id} value={ld}>{ld.tenLoaiDe} ({kichThuoc?.tenKichThuoc})</MenuItem>
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
