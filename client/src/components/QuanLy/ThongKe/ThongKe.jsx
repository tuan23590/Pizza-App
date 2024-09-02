import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import BieuDoDuong from "./BieuDoDuong";
import {
  APIThongKeSoLuongDonHang,
  APIThongKeSoLuongDonNhap,
  APIThongKeGiaTriDonHang,
  APIThongKeGiaTriDonNhap,
} from "../../../utils/thongKeUtils";
import BieuDoCot from "./BieuDoCot";
import BieuDoTron from "./BieuDoTron";

export default function ThongKe() {
  const select = [
    { name: "1 Ngày", active: true, value: 1 },
    { name: "7 Ngày", active: false, value: 7 },
    { name: "30 Ngày", active: false, value: 30 },
    { name: "180 Ngày", active: false, value: 180 },
    { name: "365 Ngày", active: false, value: 365 },
  ];
  const [soLuongDonHang, setSoLuongDonHang] = useState({
    select,
    chartName: "Số Lượng Đơn Hàng",
    unit: "Đơn hàng",
  });
  const [tongTienDonHang, setTongTienDonHang] = useState({
    select,
    chartName: "Doanh Thu Đơn Hàng",
    unit: "VNĐ",
  });
  const [soLuongDonNhap, setSoLuongDonNhap] = useState({
    select,
    chartName: "Số Lượng Đơn Nhập",
    unit: "Đơn nhập",
  });
  const [tongTienDonNhap, setTongTienDonNhap] = useState({
    select,
    chartName: "Số Lượng Đơn Nhập",
    unit: "VNĐ",
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await APIThongKeGiaTriDonHang(
        tongTienDonHang.select.find((item) => item.active).value
      );
      setTongTienDonHang(() => ({
        ...data,
        select: tongTienDonHang.select,
        chartName: tongTienDonHang.chartName,
        unit: tongTienDonHang.unit,
      }));
    };
    fetchData();
  }, [tongTienDonHang.select]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await APIThongKeSoLuongDonHang(
        soLuongDonHang.select.find((item) => item.active).value
      );
      setSoLuongDonHang(() => ({
        ...data,
        select: soLuongDonHang.select,
        chartName: soLuongDonHang.chartName,
        unit: soLuongDonHang.unit,
      }));
    };
    fetchData();
  }, [soLuongDonHang.select]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await APIThongKeSoLuongDonNhap(
        soLuongDonNhap.select.find((item) => item.active).value
      );
      setSoLuongDonNhap(() => ({
        ...data,
        select: soLuongDonNhap.select,
        chartName: soLuongDonNhap.chartName,
        unit: soLuongDonNhap.unit,
      }));
    };
    fetchData();
  }, [soLuongDonNhap.select]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIThongKeGiaTriDonNhap(
        tongTienDonNhap.select.find((item) => item.active).value
      );
      setTongTienDonNhap(() => ({
        ...data,
        select: tongTienDonNhap.select,
        chartName: tongTienDonNhap.chartName,
        unit: tongTienDonNhap.unit,
      }));
    };
    fetchData();
  }, [tongTienDonNhap.select]);
  return (
    <Grid container spacing={2}>

      <Grid item xs={3} sx={{height: 300}}>
        {soLuongDonHang.datas ? (
          <BieuDoDuong duLieu={soLuongDonHang} setDuLieu={setSoLuongDonHang} />
        ):(
          <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 284}}>
            <CircularProgress />
          </Paper>
        )}
      </Grid>
      <Grid item xs={3} sx={{height: 300}}>
        {tongTienDonHang.datas ? (
          <BieuDoDuong duLieu={tongTienDonHang} setDuLieu={setTongTienDonHang} />
        ):(
          <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 284}}>
            <CircularProgress />
          </Paper>
        )}
      </Grid>
      <Grid item xs={3} sx={{height: 300}}>
        {soLuongDonNhap.datas ? (
          <BieuDoDuong duLieu={soLuongDonNhap} setDuLieu={setSoLuongDonNhap} />
        ):(
          <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 284}}>
            <CircularProgress />
          </Paper>
        )}
      </Grid>
      <Grid item xs={3} sx={{height: 300}}>
        {soLuongDonNhap.datas ? (
          <BieuDoDuong duLieu={tongTienDonNhap} setDuLieu={setTongTienDonNhap} />
        ):(
          <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 284}}>
            <CircularProgress />
          </Paper>
        )}
      </Grid>

      <Grid item xs={6}>
        <BieuDoCot />
      </Grid>
      <Grid item xs={6}>
        <BieuDoTron />
      </Grid>
    </Grid>
  );
}
