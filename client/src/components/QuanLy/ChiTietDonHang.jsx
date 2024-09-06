import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import React from "react";
import { FOMATDATE } from "../../function";
import TrangThaiDonHangHang from "./../TrangThaiDonHangHang";
import { APICapNhatTrangThaiDonHang } from "../../utils/donHangUtils";

export default function ChiTietDonHang({
  openDialog,
  handleCloseDialog,
  selectedOrder,
  isCustomer,
}) {
  const trangThai = selectedOrder?.trangThai[selectedOrder.trangThai.length - 1].trangThai;
    const xuLyDoiTrangThai = async () => {
        const trangThaiDH = trangThai === "Đang xử lý" ? "Đang chuẩn bị" : trangThai === "Đang chuẩn bị" ? "Đang giao hàng" : "Đã giao hàng"
        const data = await APICapNhatTrangThaiDonHang({maDonHang: selectedOrder.maDonHang, trangThai: trangThaiDH})
        if (data) {
            handleCloseDialog()
            console.log(data)
        }
    }
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>Chi tiết đơn hàng</DialogTitle>
      <DialogContent>
        <TrangThaiDonHangHang trangThai={selectedOrder?.trangThai} />
        {selectedOrder && (
          <Grid container>
            <Grid item sm={6}>
              <Grid container spacing={1} sx={{ padding: "10px" }}>
                <Grid item sm={12}>
                  <Typography variant="h5" mb={1}>
                    <b>Thông tin đơn hàng:</b>
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <Typography>
                    <b>Mã đơn hàng:</b> {selectedOrder.maDonHang}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <Typography>
                    <b>Ngày đặt hàng:</b> {FOMATDATE(selectedOrder.ngayDatHang)}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <Typography>
                    <b>Tên khách hàng:</b> {selectedOrder.tenKhachHang}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <Typography>
                    <b>Số điện thoại:</b> {selectedOrder.soDienThoai}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <Typography>
                    <b>Email:</b> {selectedOrder.email}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <Typography>
                    <b>Địa chỉ giao hàng:</b> {selectedOrder.diaChiGiaoHang}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <Typography variant="h5">
                <b>Danh sách sản phẩm:</b>
              </Typography>
              <Box border={1} p={1} my={2}>
                {selectedOrder.danhSachSanPham.map((sanPham, index) => (
                  <>
                    <Grid
                      container
                      spacing={1}
                      key={index}
                      sx={{ padding: "10px" }}
                    >
                      <Grid item xs={1}>
                        <Typography
                          sx={{
                            marginRight: "5px",
                            backgroundColor: "#e8ebe9",
                            color: "#0a8020",
                            paddingX: "4px",
                            borderRadius: "2px",
                            fontWeight: "600",
                            display: "inline-block",
                          }}
                        >
                          {sanPham.soLuong}x
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={11}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ fontWeight: "600" }}>
                          {sanPham.tenSanPham}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "600", marginRight: "2px" }}
                        >
                          {(
                            (sanPham.giaSanPham +
                              (sanPham.kichThuoc?.giaKichThuoc ?? 0) +
                              (sanPham.loaiDe?.giaLoaiDe ?? 0)) *
                            sanPham.soLuong
                          ).toLocaleString("vi-VN")}
                          ₫
                        </Typography>
                      </Grid>
                      {sanPham.kichThuoc && (
                        <>
                          <Grid item xs={1}></Grid>
                          <Grid
                            item
                            xs={11}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{ color: "gray", marginLeft: "5px" }}
                            >
                              {JSON.parse(sanPham.kichThuoc).tenKichThuoc}
                            </Typography>
                            <Typography
                              sx={{ color: "gray", marginLeft: "5px" }}
                            >
                              {JSON.parse(
                                sanPham.kichThuoc
                              ).giaKichThuoc.toLocaleString("vi-VN")}
                              ₫
                            </Typography>
                          </Grid>
                        </>
                      )}

                      {sanPham.loaiDe && (
                        <>
                          <Grid item xs={1}></Grid>
                          <Grid
                            item
                            xs={11}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{ color: "gray", marginLeft: "5px" }}
                            >
                              {JSON.parse(sanPham.loaiDe).tenLoaiDe}
                            </Typography>
                            <Typography
                              sx={{ color: "gray", marginLeft: "5px" }}
                            >
                              {JSON.parse(
                                sanPham.loaiDe
                              ).giaLoaiDe.toLocaleString("vi-VN")}
                              ₫
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                    <Divider />
                  </>
                ))}
                <Divider />
              </Box>
            </Grid>
          </Grid>
        )}
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Box fullWidth>
            <Box fullWidth>
              <Typography fullWidth textAlign={"start"}>
                <b>Tạm tính:</b>
                <span
                  style={{
                    textAlign: "end",
                    display: "inline-block",
                    width: "160px",
                  }}
                >
                  {selectedOrder?.tamTinh.toLocaleString()}₫
                </span>
              </Typography>

              <Typography pt={"5px"} fullWidth textAlign={"start"}>
                <b>Giảm giá:</b>
                <span
                  style={{
                    textAlign: "end",
                    display: "inline-block",
                    width: "160px",
                  }}
                >
                  {selectedOrder?.giamGia.toLocaleString()}₫
                </span>
              </Typography>
              <Divider />
              <Typography fullWidth textAlign={"start"} color={"green"}>
                <b>Tổng tiền: </b>
                <span
                  style={{
                    fontSize: "25px",
                    textAlign: "end",
                    display: "inline-block",
                    width: "160px",
                  }}
                >
                  {selectedOrder?.tongTien.toLocaleString()}₫
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseDialog} color="warning">
          Đóng
        </Button>
        {!isCustomer && trangThai !== "Đã giao hàng" && (
        <Button variant="contained" onClick={xuLyDoiTrangThai} color="success">
          {trangThai === "Đang xử lý" ? "Xác nhận đơn hàng" : trangThai === "Đang chuẩn bị" ? "Đơn hàng đã chuẩn bị xong" : "Đã giao hàng thành công"}
        </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
