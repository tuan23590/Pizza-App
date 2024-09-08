import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function Test() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({});

  const handleClickOpen = () => {
    setFormData({
      hoTen: "Dât Mẫu",
    });

    setTimeout(() => {
      setOpen(true);
    }, 0);  // Hoãn việc mở Dialog để đảm bảo focus được áp dụng đúng
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(null);
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        // tắt focusable element để tránh lỗi khi mở Dialog
        focusRipple={false}
        onClick={() => handleClickOpen()}
      >
        Test
      </Button>
      <Typography
        variant="contained"
        color="primary"
        onClick={() => handleClickOpen()}
      >
        Test 2
      </Typography>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Thông tin chi tiết tài khoản</DialogTitle>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <TextField
            label="Họ tên"
            value={formData?.hoTen || ""}
            fullWidth
            autoFocus
            margin="dense"
            onChange={(e) =>
              setFormData({ ...formData, hoTen: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
