import React, { createContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import DanhMuc from '../components/DatHang/DanhMuc';
import GioHang from '../components/DatHang/GioHang';
import { Outlet } from 'react-router-dom';

export const GioHangContext = createContext();

export default function DatHang() {
  const [gioHang, setGioHang] = useState([]);
  // useEffect(() => {
  //   const gioHangString = localStorage.getItem('gioHang');
  //   if (gioHangString) {
  //     console.log("[gioHangString]: ", gioHangString);
  //     setGioHang(JSON.parse(gioHangString));
  //   }
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem('gioHang', JSON.stringify(gioHang));
  // }, [gioHang]);
  return (
    <GioHangContext.Provider value={{gioHang, setGioHang}}>
      <Grid container>
        <Grid item xs={9}>
          <DanhMuc/>
          <Outlet/>
        </Grid>
        <Grid item xs={3}>
          <GioHang/>
        </Grid>
      </Grid>
    </GioHangContext.Provider>
  );
}
