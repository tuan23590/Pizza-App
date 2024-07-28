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
            {'link':'QuanLySanPham','text':'Danh Sách Sản Phẩm', 'phanQuyen': []},
            ]} />
    </Grid>
    <Grid item xs={10} sx={{height: '100%', paddingTop: '15px',paddingRight: '15px'}}>
    <Outlet />
    </Grid>
    </Grid>
    </>
  );
}