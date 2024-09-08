import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useContext } from "react";
import { APIThemTaiKhoan } from './../../../utils/taiKhoanUtils';
import { AuthContext } from './../../../context/AuthProvider';

export default function ChiTietTaiKhoan({
  open,
  handleClose,
  formData,
  setFormData,
  isCustomer,
}) {
  const { setNotifyOpen, setNotificationMessage, setNotificationSeverity } = useContext(AuthContext);
  const ThemNhanVien = async () => {
    const data = await APIThemTaiKhoan(formData);
    if (data) {
      setNotificationSeverity("success");
      setNotificationMessage("Thêm nhân viên thành công");
      setNotifyOpen(true);
      handleClose();
    }else{
      setNotificationSeverity("error");
      setNotificationMessage("Thêm nhân viên thất bại");
      setNotifyOpen(true);
    }
  }
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Thông tin chi tiết tài khoản</DialogTitle>
      <DialogContent>
        <TextField
          label="Họ tên"
          value={formData?.hoTen || ""}
          fullWidth
          autoFocus
          margin="dense"
          onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
        />
        <TextField
          label="Email"
          value={formData?.email || ""}
          fullWidth
          margin="dense"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          label="Số điện thoại"
          value={formData?.soDienThoai || ""}
          fullWidth
          margin="dense"
          onChange={(e) =>
            setFormData({ ...formData, soDienThoai: e.target.value })
          }
        />
        <TextField
          label="Địa chỉ"
          value={formData?.diaChi || ""}
          fullWidth
          margin="dense"
          onChange={(e) => setFormData({ ...formData, diaChi: e.target.value })}
        />{!isCustomer && (
        <FormControl fullWidth margin="dense">
            <InputLabel>Phân quyền</InputLabel>
            <Select
            label="Phân quyền"
            value={formData?.phanQuyen || ""}
            onChange={(e) =>
                setFormData({ ...formData, phanQuyen: e.target.value })
            }
            fullWidth
            >
                <MenuItem value="Nhân viên giao hàng">Nhân viên giao hàng</MenuItem>
                <MenuItem value="Nhân viên bán hàng">Nhân viên bán hàng</MenuItem>
                <MenuItem disabled value="Quản lý">Quản lý</MenuItem>
            </Select>
        </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Đóng
        </Button>
        {!isCustomer && (
          <Button onClick={ThemNhanVien} color="primary" variant="contained">
          Thêm nhân viên
        </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
