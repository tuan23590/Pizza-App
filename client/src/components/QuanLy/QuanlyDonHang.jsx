import React, { useEffect, useState } from "react";
import { APIDanhSachDonHang } from "../../utils/donHangUtils";
import {
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  TableSortLabel,
} from "@mui/material";
import ChiTietDonHang from "./ChiTietDonHang";
import { FOMATDATE } from "../../function";

export default function QuanlyDonHang() {
  const [danhSachDonHang, setDanhSachDonHang] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thoiGian, setThoiGian] = useState(0);

  // Trạng thái cho cột và hướng sắp xếp
  const [sortConfig, setSortConfig] = useState({
    key: "maDonHang",
    direction: "asc",
  });

  const fetctData = async () => {
    const data = await APIDanhSachDonHang(thoiGian);
    setDanhSachDonHang(data);
    setLoading(false);
  };

  useEffect(() => {
    fetctData();
  }, [thoiGian]);

  const danhSachThoiGian = [
    { name: "Tất cả", value: 0 },
    { name: "1 Ngày", value: 1 },
    { name: "7 Ngày", value: 7 },
    { name: "30 Ngày", value: 30 },
    { name: "180 Ngày", value: 180 },
    { name: "365 Ngày", value: 365 },
  ];

  // Hàm để sắp xếp danh sách đơn hàng
  const sortedDanhSachDonHang = () => {
    return [...danhSachDonHang].sort((a, b) => {
      const isAsc = sortConfig.direction === "asc";
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return isAsc ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });
  };

  // Hàm để xử lý khi nhấp vào tiêu đề cột để sắp xếp
  const handleSort = (column) => {
    const isAsc = sortConfig.key === column && sortConfig.direction === "asc";
    setSortConfig({ key: column, direction: isAsc ? "desc" : "asc" });
  };

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" p={"20px"}>
            Quản Lý Đơn Hàng
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 2,
            }}
          >
            <Select
              sx={{ width: 200, mx: 1 }}
              size="small"
              margin="dense"
              value={thoiGian}
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

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "maDonHang"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("maDonHang")}
                  >
                    Mã đơn hàng
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "tenKhachHang"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("tenKhachHang")}
                  >
                    Tên khách hàng
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "soDienThoai"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("soDienThoai")}
                  >
                    Số điện thoại
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "ngayDatHang"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("ngayDatHang")}
                  >
                    Ngày đặt hàng
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "tongTien"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("tongTien")}
                  >
                    Tổng tiền
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "phuongThucThanhToan"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("phuongThucThanhToan")}
                  >
                    Phương thức thanh toán
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "trangThai"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("trangThai")}
                  >
                    Trạng thái
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDanhSachDonHang().map((donHang) => (
                <TableRow
                  key={donHang.maDonHang}
                  sx={{
                    cursor: "pointer",
                    ":hover": { backgroundColor: "#f5f5f5" },
                  }}
                  onClick={() => handleOpenDialog(donHang)}
                >
                  <TableCell>{donHang.maDonHang}</TableCell>
                  <TableCell>{donHang.tenKhachHang}</TableCell>
                  <TableCell>{donHang.soDienThoai}</TableCell>
                  <TableCell>{FOMATDATE(donHang.ngayDatHang)}</TableCell>
                  <TableCell>
                    {donHang.tongTien.toLocaleString("vi-VN")}₫
                  </TableCell>
                  <TableCell>{donHang.phuongThucThanhToan}</TableCell>
                  <TableCell>
                    {donHang.trangThai[donHang.trangThai.length - 1].trangThai}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <ChiTietDonHang
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        selectedOrder={selectedOrder}
      />
    </>
  );
}
