import React from 'react'
import { Grid, Typography } from '@mui/material';
import DanhMuc from '../components/DatHang/DanhMuc';
import GioHang from '../components/DatHang/GioHang';
import { Outlet } from 'react-router-dom';

export default function DatHang() {
  return (
    <Grid container>
        <Grid item xs={9}>
            <DanhMuc/>
            <Outlet/>
        </Grid>
        <Grid item xs={3}>
            <GioHang/>
        </Grid>
    </Grid>
  )
}
