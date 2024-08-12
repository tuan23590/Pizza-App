import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import SanPhamTrongGioHang from './SanPhamTrongGioHang';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { GioHangContext } from '../../context/GioHangProvider';

export default function GioHang() {
  const { gioHang } = useContext(GioHangContext);
  const navigate = useNavigate();
  return (
    <Box sx={{ border: 1, borderColor: 'gray', height: '93vh' }}>
      <Box sx={{ height: '78%', overflowX: 'hidden', overflowY: 'scroll' }}>
        <Typography sx={{
          textAlign: 'center',
          fontSize: '1rem',
          fontWeight: '500',
          padding: '10px',
          borderBottom: 1,
        }}>
          Giỏ hàng
        </Typography>
        {gioHang.danhSachSanPham.map((sanPham, index) => (
          <SanPhamTrongGioHang key={index} sanPham={sanPham} />
        ))
        }
      </Box>
      <Box sx={{ height: '22%', borderTop: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <RequestPageOutlinedIcon />
            <Typography>Phiếu giảm giá</Typography>
          </Box>
          <KeyboardArrowRightIcon />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Tạm tính</Typography>
          </Box>
          <Typography>
            {gioHang.tamTinh.toLocaleString('vi-VN')} ₫
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Giảm khuyến mại</Typography>
          </Box>
          <Typography>
          {gioHang.giamGia.toLocaleString('vi-VN')} ₫
          </Typography>
        </Box>
        <Box sx={{ borderTop: 1, padding: '5px'}}>
          <Typography fullWidth sx={{textAlign: 'end'}}>Đã bao gồm VAT</Typography>
          <Button 
          color='success' 
          variant="contained" 
          fullWidth 
          sx={{display: 'flex',justifyContent: 'space-between'}} 
          onClick={()=>{navigate('/ThanhToan')}}
          disabled={gioHang.length === 0}
          >
            <Typography >Thanh Toán - {gioHang.danhSachSanPham.length} món</Typography>
            <Typography>{gioHang.tongTien.toLocaleString('vi-VN')} ₫</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
