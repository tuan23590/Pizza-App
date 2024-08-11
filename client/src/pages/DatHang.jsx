import React, { createContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import DanhMuc from '../components/DatHang/DanhMuc';
import GioHang from '../components/DatHang/GioHang';
import { Outlet } from 'react-router-dom';

export const GioHangContext = createContext();

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
  );
}
