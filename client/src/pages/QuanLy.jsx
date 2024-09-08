import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Grid,
  CircularProgress
} from '@mui/material';
import DanhMucQuanLy from '../components/QuanLy/DanhMucQuanLy';
import { AuthContext } from '../context/AuthProvider';

export default function QuanLy() {
  const {taiKhoan} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(taiKhoan != null && taiKhoan.phanQuyen !='Quản lý'){
      window.location.href = '/';
    }else if(taiKhoan != null && taiKhoan.phanQuyen =='Quản lý'){
      setLoading(false);
    }
  }, [taiKhoan]);
  if (loading)
  return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    < CircularProgress />
  </Box>
  return (
    <>
        <Grid container sx={{
            height: '93vh',
            backgroundColor: '#f5f5f5',
            }}>
    <Grid item xs={2} sx={{height: '93vh'}}>
         <DanhMucQuanLy DanhSachDanhMuc={[
            {'link':'ThongKe','text':'Thống Kê Doanh Thu', 'phanQuyen': []},
            {'link':'QuanLyHangHoa','text':'Quản Lý Hàng Hóa', 'phanQuyen': []},
            {'link':'QuanLyDonHang','text':'Quản Lý Dơn Hàng', 'phanQuyen': []},
            {'link':'QuanLyPhieuNhap','text':'Quản Lý Phiếu Nhập', 'phanQuyen': []},
            {'link':'QuanLyTaiKhoan','text':'Quản Lý Tài Khoản', 'phanQuyen': []},
            {'link':'QuanLyKhac','text':'Quản Lý Khác', 'phanQuyen': []},
            ]} />
    </Grid>
    <Grid item xs={10} sx={{height: '94%', paddingTop: '15px',paddingRight: '15px'}}>
    <Outlet />
    </Grid>
    </Grid>
    </>
  );
}