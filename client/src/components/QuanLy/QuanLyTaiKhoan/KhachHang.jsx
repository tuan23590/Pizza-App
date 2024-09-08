import React, { useContext, useEffect, useState } from "react";
import { APIDanhSachTaiKhoan, APIXoaTaiKhoan } from "../../../utils/taiKhoanUtils";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { TIMEAGO } from "../../../function";
import ChiTietTaiKhoan from "./ChiTietTaiKhoan";
import { AuthContext } from "../../../context/AuthProvider";

export default function KhachHang() {
  const [danhSachTaiKhoan, setDanhSachTaiKhoan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const { setNotifyOpen, setNotificationMessage, setNotificationSeverity } = useContext(AuthContext);
  const fetchData = async () => {
    const data = await APIDanhSachTaiKhoan();
    setDanhSachTaiKhoan(data.filter((item) => item.phanQuyen == "Khách hàng"));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = (taiKhoan) => {
    setFormData(taiKhoan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(null);
    fetchData();
  };
  const xoaTaiKhoan = async (email) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      const data = await APIXoaTaiKhoan(email);
      if (data) {
        setNotificationSeverity("success");
        setNotificationMessage("Xóa tài khoản thành công");
        setNotifyOpen(true);
        fetchData();
      } else {
        setNotificationSeverity("error");
        setNotificationMessage("Xóa tài khoản thất bại");
        setNotifyOpen(true);
      }
    }
  };
  return (
    <Paper>
      {loading ? (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="h5"> Quản lý tài khoản nhân viên</Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                e.currentTarget.blur();
                handleClickOpen();
              }}
            >
              Thêm tài khoản
            </Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Họ Tên</TableCell>
                <TableCell>Số Điện Thoại</TableCell>
                <TableCell>Địa Chỉ</TableCell>
                <TableCell>Số đơn hàng đã mua</TableCell>
                <TableCell>Lần Cuối Đăng Nhập</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {danhSachTaiKhoan.map((taiKhoan) => (
                <TableRow
                  key={taiKhoan.uid + taiKhoan.email + taiKhoan.hoTen}
                  onClick={() => handleClickOpen(taiKhoan)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <TableCell>{taiKhoan.email}</TableCell>
                  <TableCell>{taiKhoan.hoTen}</TableCell>
                  <TableCell>{taiKhoan.soDienThoai || ""}</TableCell>
                  <TableCell>{taiKhoan.diaChi || ""}</TableCell>
                  <TableCell>{taiKhoan.soDonHang} đơn hàng</TableCell>
                  <TableCell>
                    {TIMEAGO(parseInt(taiKhoan.lanCuoiDangNhap))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        xoaTaiKhoan(taiKhoan.email);
                      }}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      <ChiTietTaiKhoan
        open={open}
        handleClose={handleClose}
        formData={formData}
        setFormData={setFormData}
        isCustomer={true}
      />
    </Paper>
  );
}
