import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import BieuDoDuong from "./BieuDoDuong";
import { APIThongKeDoanhThu, APIThongKeDonHang, APIThongKeDonNhap } from "../../../utils/thongKeUtils";

export default function ThongKe() {
  const [duLieuDoanhThu, setDuLieuDoanhThu] = useState(
    {
      // labels: ['', '', '', '', '', '', '', '', '', ''],
      // datas:[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // percent: 10,
      button: [{name: 'Tuần', active: true}, {name: 'Tháng', active: false},{name: 'Năm', active: false}],
      chartName: 'Doanh thu',
      unit: 'Triệu đồng',
    });
  const [duLieuDonHang, setDuLieuDonHang] = useState(
    {
      // labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"],
      // datas:[10, 15, 18, 20, 22, 28, 20, 26, 18, 25],
      // percent: 15,
      button: [{name: 'Giờ', active: true},{name: 'Ngày', active: false}, {name: 'Tuần', active: false}, {name: 'Tháng', active: false}, {name: 'Năm', active: false}],
      chartName: 'Đơn Hàng',
      unit: 'Đơn hàng',
    });
  const [duLieuDonNhap, setDuLieuDonNhap] = useState(
    {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"],
      datas:[20, 25, 18, 20, 22, 18, 20, 16, 18, 15],
      percent: -15,
      button: [{name: 'Tuần', active: true}, {name: 'Tháng', active: false}],
      chartName: 'Đơn nhập',
      unit: 'Đơn nhập',
    });
    useEffect(() => {
      const fetchData = async () => {
        const data = await APIThongKeDoanhThu(duLieuDoanhThu.button.find(item => item.active).name);
        console.log(data);
        setDuLieuDoanhThu(
          () => ({
            ...data,
            button: duLieuDoanhThu.button,
            chartName: duLieuDoanhThu.chartName,
            unit: duLieuDoanhThu.unit
          })
        );
      };
      fetchData();
    }, [duLieuDoanhThu.button]);
    useEffect(() => {
      const fetchData = async () => {
        const data = await APIThongKeDonHang(duLieuDonHang.button.find(item => item.active).name);
        console.log(data);
        setDuLieuDonHang(
          () => ({
            ...data,
            button: duLieuDonHang.button,
            chartName: duLieuDonHang.chartName,
            unit: duLieuDonHang.unit
          })
        );
      };
      fetchData();
    }, [duLieuDonHang.button]);
    useEffect(() => {
      const fetchData = async () => {
        const data = await APIThongKeDonNhap(duLieuDonNhap.button.find(item => item.active).name);
        console.log(data);
        setDuLieuDonNhap(
          () => ({
            ...data,
            button: duLieuDonNhap.button,
            chartName: duLieuDonNhap.chartName,
            unit: duLieuDonNhap.unit
          })
        );
      };
      fetchData();
    }, [duLieuDonNhap.button]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {duLieuDoanhThu.datas && <BieuDoDuong duLieu={duLieuDoanhThu} setDuLieu ={setDuLieuDoanhThu}/>}
      </Grid>
      <Grid item xs={4}>
        {duLieuDonHang.datas && <BieuDoDuong duLieu={duLieuDonHang} setDuLieu ={setDuLieuDonHang}/>}
      </Grid>
      <Grid item xs={4}>
        {duLieuDonNhap.datas && <BieuDoDuong duLieu={duLieuDonNhap} setDuLieu ={setDuLieuDonNhap}/>}
      </Grid>
    </Grid>
  );
}
