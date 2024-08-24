import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Grid,
} from '@mui/material';
import DanhMucQuanLy from '../components/QuanLy/DanhMucQuanLy';

export default function QuanLy() {
  return (
    <>
        <Grid container sx={{
            height: '93vh',
            backgroundColor: '#f5f5f5',
            }}>
    <Grid item xs={2} sx={{height: '93vh'}}>
         <DanhMucQuanLy DanhSachDanhMuc={[
            {'link':'QuanLyHangHoa','text':'Quản Lý Hàng Hóa', 'phanQuyen': []},
            {'link':'QuanLyDonHang','text':'Quản Lý Dơn Hàng', 'phanQuyen': []},
            {'link':'QuanLyPhieuNhap','text':'Quản Lý Phiếu Nhập', 'phanQuyen': []},
            {'link':'QuanLyDanhThu','text':'Quản Lý Danh Thu', 'phanQuyen': []},
            {'link':'QuanLyTonKho','text':'Quản Lý Tồn Kho', 'phanQuyen': []},
            {'link':'QuanLyKhuyenMai','text':'Quản Lý Khuyến Mãi', 'phanQuyen': []},
            ]} />
    </Grid>
    <Grid item xs={10} sx={{height: '100%', paddingTop: '15px',paddingRight: '15px'}}>
    <Outlet />
    </Grid>
    </Grid>
    </>
  );
}