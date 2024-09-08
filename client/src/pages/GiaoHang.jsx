import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { APIDonHangTheoEmail } from "../utils/donHangUtils";
import ChiTietDonHang from "../components/QuanLy/ChiTietDonHang";
import { AuthContext } from "./../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { APINhanThongBao } from "./../utils/thongBaoUtils";
import { FOMATDATE } from "../function";

export default function GiaoHang() {
  const { user,taiKhoan } = useContext(AuthContext);
  const [danhSachDonHang, setDanhSachDonHang] = useState([]);
  const [filteredDonHang, setFilteredDonHang] = useState([]); // Danh sách đơn hàng đã được lọc
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [status, setStatus] = useState("Tất cả");
  const navigate = useNavigate();
  const { data } = APINhanThongBao();

  const handleSearch = async () => {
    const data = await APIDonHangTheoEmail(user.email);
    const sortedData = data
      .sort((a, b) => b.ngayDatHang - a.ngayDatHang)
      .filter(
        (donHang) =>
          donHang.trangThai[donHang.trangThai.length - 1].trangThai ==
            "Đang giao hàng" ||
          donHang.trangThai[donHang.trangThai.length - 1].trangThai ==
            "Đã giao hàng"
      );
    setDanhSachDonHang(sortedData);
    setFilteredDonHang(sortedData);
  };

  useEffect(() => {
    if (status === "Tất cả") {
      setFilteredDonHang(danhSachDonHang);
    } else {
      const filtered = danhSachDonHang.filter(
        (donHang) =>
          donHang.trangThai[donHang.trangThai.length - 1].trangThai === status
      );
      setFilteredDonHang(filtered);
    }
  }, [status]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/DangNhap");
      return;
    }
    handleSearch();
  }, [user]);
  useEffect(() => {
    if (data) {
      handleSearch();
    }
  }, [data]);
  useEffect(() => {
    if (selectedOrder) {
      const order = danhSachDonHang.find(
        (order) => order.maDonHang === selectedOrder.maDonHang
      );
      setSelectedOrder(order);
    }
  }, [danhSachDonHang]);
  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(taiKhoan != null && taiKhoan.phanQuyen !='Nhân viên giao hàng'){
      window.location.href = '/';
    }else if(taiKhoan != null && taiKhoan.phanQuyen =='Nhân viên giao hàng'){
      setLoading(false);
    }
  }, [taiKhoan]);
  if (loading)
  return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    < CircularProgress />
  </Box>
  return (
    <>
      <Typography fullWidth variant="h5" py={5} sx={{ textAlign: "center" }}>
        GIAO HÀNG
      </Typography>
      <Box sx={{ marginX: "auto", width: "33%" }}>
        <Paper sx={{ padding: "20px" }} elevation={3}>
          {danhSachDonHang.length > 0 && (
            <Box sx={{ marginX: "auto" }}>
              <Box>
                {["Tất cả", "Đang giao hàng", "Đã giao hàng"].map(
                  (trangThai, index) => (
                    <Button
                      key={index}
                      sx={{ margin: "5px" }}
                      variant="contained"
                      color={status === trangThai ? "success" : "inherit"}
                      size="small"
                      onClick={() => {
                        setStatus(trangThai);
                      }}
                    >
                      {trangThai}
                    </Button>
                  )
                )}
              </Box>
              <Typography fullWidth py={1} sx={{ textAlign: "center" }}>
                Danh sách đơn hàng
              </Typography>
              <Divider />
              <Box maxHeight={"550px"} sx={{ overflowY: "scroll" }}>
                {filteredDonHang.map((donHang, index) => (
                  <Grid
                    container
                    spacing={1}
                    key={index}
                    sx={{
                      padding: "10px",
                      borderBottom: "1px solid #ccc",
                      cursor: "pointer",
                      ":hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                    onClick={() => handleOpenDialog(donHang)}
                  >
                    <Grid
                      item
                      sm={12}
                      display={"flex"}
                      justifyContent={"space-between"}
                      textAlign={"center"}
                    >
                      <Typography variant="h6">
                        Mã đơn hàng: {donHang.maDonHang}
                      </Typography>
                      {donHang.trangThai[donHang.trangThai.length - 1].trangThai == "Đang giao hàng" && (
                        <Typography
                        sx={{
                          backgroundColor:
                            (30 - parseInt((Date.now() - donHang.trangThai[donHang.trangThai.length - 1].thoiGian) / 1000 / 60)) < 0 ? "#ff1744" : "#4caf50", // Màu đỏ nếu trễ, xanh lá nếu còn thời gian
                          borderRadius: 2,
                          color: "white",
                          fontWeight: "600",
                          paddingX: "5px",
                          paddingY: "1px",
                          fontSize: "12px",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {(30 - parseInt((Date.now() - donHang.trangThai[donHang.trangThai.length - 1].thoiGian) / 1000 / 60)) < 0
                          ? `Trễ ${Math.abs(30 - parseInt((Date.now() - donHang.trangThai[donHang.trangThai.length - 1].thoiGian) / 1000 / 60))} phút` // Hiển thị số phút trễ
                          : `Giao trong ${30 - parseInt((Date.now() - donHang.trangThai[donHang.trangThai.length - 1].thoiGian) / 1000 / 60)} phút`}{" "}
                      </Typography>
                      )}

                      <Typography
                        backgroundColor={
                          donHang.trangThai[donHang.trangThai.length - 1]
                            .trangThai === "Đang xử lý"
                            ? "#ff9100"
                            : donHang.trangThai[donHang.trangThai.length - 1]
                                .trangThai === "Đang giao hàng"
                            ? "#1e88e5"
                            : donHang.trangThai[donHang.trangThai.length - 1]
                                .trangThai === "Đang chuẩn bị"
                            ? "#1e88e5"
                            : donHang.trangThai[donHang.trangThai.length - 1]
                                .trangThai === "Đã giao hàng"
                            ? "#0a8020"
                            : "#e53935"
                        }
                        borderRadius={2}
                        color={"white"}
                        fontWeight={"600"}
                        paddingX={"5px"}
                        paddingY={"1px"}
                        fontSize={"12px"}
                        alignItems={"center"}
                        display={"flex"}
                      >
                        {
                          donHang.trangThai[donHang.trangThai.length - 1]
                            .trangThai
                        }
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <Typography>
                        <b>Ngày đặt hàng:</b> {FOMATDATE(donHang.ngayDatHang)}
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <Typography>
                        <b>Số điện thoại:</b> {donHang.soDienThoai}
                      </Typography>
                    </Grid>
                    <Grid item sm={12}>
                      <Typography>
                        <b>Địa chỉ giao hàng:</b> {donHang.diaChiGiaoHang}
                      </Typography>
                    </Grid>
                    <Grid item sm={12}>
                      <Typography>
                        <b>Thời gian giao hàng dự kiến:</b>{" "}
                        {FOMATDATE(donHang.thoiGianGiaoHang)}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Box>
          )}
          {danhSachDonHang.length == 0 && (
            <Typography fullWidth sx={{ textAlign: "center" }}>
              Không tìm thấy đơn hàng nào
            </Typography>
          )}
        </Paper>
      </Box>

      <ChiTietDonHang
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        selectedOrder={selectedOrder}
      />
    </>
  );
}
