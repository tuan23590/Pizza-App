import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import { APIDanhSachChiTiet, APIThemChiTiet } from "../../utils/chiTietUtils";
import DeleteIcon from '@mui/icons-material/Delete';

export default function QuanLyKhac() {
  const [danhSachDe, setDanhSachDe] = useState([]);
  const [danhSachKichThuoc, setDanhSachKichThuoc] = useState([]);
  const [danhSachDonVi, setDanhSachDonVi] = useState([]);
  const [open, setOpen] = useState(false);
  const [loaiChiTiet, setLoaiChiTiet] = useState("");
  const [tenChiTiet, setTenChiTiet] = useState("");

  const fetchData = async () => {
    const data = await APIDanhSachChiTiet();
    if (data) {
      setDanhSachDe(data.filter((item) => item.loaiChiTiet === "DE"));
      setDanhSachKichThuoc(data.filter((item) => item.loaiChiTiet === "KT"));
      setDanhSachDonVi(data.filter((item) => item.loaiChiTiet === "DV"));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const XuLyLuu = async () => {
    const data = await APIThemChiTiet(tenChiTiet, loaiChiTiet);
    fetchData();
    setOpen(false);
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h4">Quản lý khác</Typography>
      </Grid>

      {/* Danh sách đế */}
      <Grid item xs={4}>
        <Paper sx={{ padding: 2 }} elevation={1}>
          <Typography variant="h6">Quản lý danh sách đế</Typography>
          
          {danhSachDe.map((item) => (
            <Box my={2} sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
            }}>
            <Typography key={item._id} sx={{
              
              padding: 1,
              cursor: "pointer",
              ':hover': {
                backgroundColor: "#f0f0f0"
              }
            }}>{item.tenChiTiet}</Typography>
            <DeleteIcon sx={{cursor: "pointer"}} onClick={async () => {
              //const data = await APIDeleteChiTiet(item._id);
              //console.log(data);
              fetchData();
            }
            }/>
            </Box>
          ))}
          
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => {
              setLoaiChiTiet("DE");
              handleClickOpen();
            }}
          >
            Thêm mới
          </Button>
        </Paper>
      </Grid>

      {/* Danh sách kích thước */}
      <Grid item xs={4}>
        <Paper sx={{ padding: 2 }} elevation={1}>
          <Typography variant="h6">Quản lý danh sách kích thước</Typography>
          {danhSachKichThuoc.map((item) => (
            <Box my={2} sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
            }}>
            <Typography key={item._id} sx={{
              
              padding: 1,
              cursor: "pointer",
              ':hover': {
                backgroundColor: "#f0f0f0"
              }
            }}>{item.tenChiTiet}</Typography>
            <DeleteIcon sx={{cursor: "pointer"}} onClick={async () => {
              //const data = await APIDeleteChiTiet(item._id);
              //console.log(data);
              fetchData();
            }
            }/>
            </Box>
          ))}
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => {
              setLoaiChiTiet("KT");
              handleClickOpen();
            }}
          >
            Thêm mới
          </Button>
        </Paper>
      </Grid>

      {/* Danh sách đơn vị */}
      <Grid item xs={4}>
        <Paper sx={{ padding: 2 }} elevation={1}>
          <Typography variant="h6">Quản lý đơn vị</Typography>
          {danhSachDonVi.map((item) => (
            <Box my={2} sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
            }}>
            <Typography key={item._id} sx={{
              
              padding: 1,
              cursor: "pointer",
              ':hover': {
                backgroundColor: "#f0f0f0"
              }
            }}>{item.tenChiTiet}</Typography>
            <DeleteIcon sx={{cursor: "pointer"}} onClick={async () => {
              //const data = await APIDeleteChiTiet(item._id);
              //console.log(data);
              fetchData();
            }
            }/>
            </Box>
          ))}
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => {
              setLoaiChiTiet("DV");
              handleClickOpen();
            }}
          >
            Thêm mới
          </Button>
        </Paper>
      </Grid>

      {/* Dialog for adding new items */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm mới mục</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên mục"
            fullWidth
            onChange={(e) => setTenChiTiet(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={XuLyLuu} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
