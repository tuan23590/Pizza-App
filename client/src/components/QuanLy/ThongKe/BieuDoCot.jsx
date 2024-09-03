import React, { useEffect, useState } from "react";
import BarChartCustom from "../../BarChartCustom";
import { Paper, Box, Typography, Select, MenuItem, CircularProgress } from "@mui/material";
import { APIDanhSachDanhMucThemSanPham } from './../../../utils/danhMucUtils';
import { APIThongKeSanPhamTheoDanhMuc } from './../../../utils/thongKeUtils';

export default function BieuDoCot() {
  const [danhMuc, setDanhMuc] = useState();
  const [thoiGian, setThoiGian] = useState(1);
  const [loaiThongKe, setLoaiThongKe] = useState(1);
  const [danhSachDanhMuc, setDanhSachDanhMuc] = useState([]);
  const [duLieuThongKe, setDuLieuThongKe] = useState([]);
  const danhSachThoiGian = [
    { name: "1 Ngày", value: 1 },
    { name: "7 Ngày",  value: 7 },
    { name: "30 Ngày",  value: 30 },
    { name: "180 Ngày",  value: 180 },
    { name: "365 Ngày",  value: 365 },
  ];
  const danhSachLoaiThongKe = [
    { name: "Giá Trị", value: 1 },
    { name: "Số lượng",  value: 2 },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const data = await APIDanhSachDanhMucThemSanPham();
      setDanhSachDanhMuc(data);
      setDanhMuc(data[0].maDanhMuc);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIThongKeSanPhamTheoDanhMuc(loaiThongKe,danhMuc,thoiGian);
      setDuLieuThongKe(data);
    }
    if(danhMuc && thoiGian){
      fetchData();
    }
  }, [danhMuc,thoiGian,loaiThongKe]);

  return (
    <Paper sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Theo dõi sản phẩm</Typography>
        <Box>
        <Select
          sx={{ width: 200,mx:1 }}
          size="small"
          value={loaiThongKe || "" }
          onChange={(e) => setLoaiThongKe(e.target.value)}
        >
          {danhSachLoaiThongKe.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          sx={{ width: 200,mx:1 }}
          size="small"
          value={danhMuc || "" }
          onChange={(e) => setDanhMuc(e.target.value)}
        >
          {danhSachDanhMuc.map((item) => (
            <MenuItem key={item.id} value={item.maDanhMuc}>
              {item.tenDanhMuc}
            </MenuItem>
          ))}
        </Select>

        <Select
          sx={{ width: 200,mx:1 }}
          size="small"
          margin="dense"
          value={thoiGian || "" }
          onChange={(e) => setThoiGian(e.target.value)}
        >
          {danhSachThoiGian.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        </Box>
      </Box>
      <Box
        sx={{
          height: 270,
          marginTop: 2,
        }}
      >
        {duLieuThongKe == null ? (
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}>
            <CircularProgress />
          </Box>
        ):(
          <BarChartCustom duLieuThongKe={duLieuThongKe} loaiThongKe={loaiThongKe} />
        )}
      </Box>
    </Paper>
  );
}
