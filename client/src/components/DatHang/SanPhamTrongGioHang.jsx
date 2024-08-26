import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Tooltip, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { GioHangContext } from './../../context/GioHangProvider';
import { AuthContext } from '../../context/AuthProvider';

export default function SanPhamTrongGioHang({ sanPham }) {
  const { setNotifyOpen, setNotificationMessage, setNotificationSeverity } = useContext(AuthContext);
  const { setGioHang } = useContext(GioHangContext);
  const [openDialog, setOpenDialog] = useState(false);
  const giaCuaSanPham = (sanPham.gia + ((sanPham.kichThuoc?.giaKichThuoc) ?? 0) + ((sanPham.loaiDe?.giaLoaiDe) ?? 0)) * sanPham.soLuong;
  const xoaSanPham = () => {
    setGioHang((prevGioHang) => { 
      const danhSachSanPham = prevGioHang?.danhSachSanPham || [];
      const updatedDanhSachSanPham = danhSachSanPham.filter(item => item.maSanPham !== sanPham.maSanPham);
      const updatedGioHang = {
        ...prevGioHang,
        danhSachSanPham: updatedDanhSachSanPham
      };
      localStorage.setItem('gioHang', JSON.stringify(updatedGioHang));
      return updatedGioHang;
    });
    setOpenDialog(false);
    setNotifyOpen(true);
    setNotificationMessage('Đã xóa sản phẩm khỏi giỏ hàng');
    setNotificationSeverity('success');
  }

  const handleDialogOpen = () => {
    setOpenDialog(true);
  }

  const handleDialogClose = () => {
    setOpenDialog(false);
  }
  return (
    <>

      <Grid container sx={{ padding: '10px' }}>
        <Grid item xs={1}>
          <Typography sx={{ marginRight: '5px', backgroundColor: '#e8ebe9', color: '#0a8020', paddingX: '4px', borderRadius: '2px', fontWeight: '600',display: 'inline-block' }}>{sanPham.soLuong}x</Typography>
        </Grid>
        <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: '600' }}>{sanPham.tenSanPham}</Typography>
          <Typography sx={{ fontWeight: '600', marginRight: '2px' }}>{giaCuaSanPham.toLocaleString('vi-VN')}₫</Typography>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Xóa khỏi giỏ hàng" onClick={handleDialogOpen}>
            <ClearIcon sx={{ cursor: 'pointer', marginLeft: '10px' }} />
          </Tooltip>
        </Grid>

        {sanPham.kichThuoc && (
          <>
            <Grid item xs={1} >
            </Grid>
            <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'gray', marginLeft: '5px' }}>{sanPham.kichThuoc?.tenKichThuoc}</Typography>
              <Typography sx={{ color: 'gray', marginLeft: '5px' }}>{sanPham.kichThuoc?.giaKichThuoc.toLocaleString('vi-VN')}₫</Typography>
            </Grid>
            <Grid item xs={1}>
            </Grid>
          </>
        )}

        {sanPham.loaiDe && (
          <>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'gray', marginLeft: '5px' }}>{sanPham.loaiDe?.tenLoaiDe}</Typography>
              <Typography sx={{ color: 'gray', marginLeft: '5px' }}>{sanPham.loaiDe?.giaLoaiDe.toLocaleString('vi-VN')}₫</Typography>
            </Grid>
            <Grid item xs={1}>
            </Grid>
          </>
        )}
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={xoaSanPham} color="secondary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
