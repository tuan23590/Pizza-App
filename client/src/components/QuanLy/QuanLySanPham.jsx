// QuanLySanPham.jsx
import React, { useEffect, useState } from 'react';
import { APIDanhSachSanPham } from '../../utils/sanPhamUtils';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box, Select, MenuItem, TextField, FormControl, InputLabel } from '@mui/material';
import ChiTietSanPham from './ChiTietSanPham';
import { APIDanhSachDanhMuc } from '../../utils/danhMucUtils';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function QuanLySanPham() {
  const [sanPham, setSanPham] = useState([]);
  const [danhMuc, setDanhMuc] = useState([]);
  const [selectDanhMuc, setSelectDanhMuc] = useState(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('view'); // 'view' or 'add'
  const [selectedSanPham, setSelectedSanPham] = useState(null);

  const fetchData = async () => {
    const dataSP = await APIDanhSachSanPham();
    setSanPham(dataSP);
    const dataDM = await APIDanhSachDanhMuc();
    setDanhMuc(dataDM);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = (sanPham, mode) => {
    setSelectedSanPham(sanPham);
    setMode(mode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSanPham(null);
  };

  return (
    <TableContainer component={Paper}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '20px'}}>
      <Typography variant="h5">
        Quản Lý Sản Phẩm
      </Typography>
      <Box sx={{gap: 2, display: 'flex'}}>
      <TextField
      id="outlined-basic"
      label="Tìm kiếm mã sản phẩm"
      variant="outlined"
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
        <FormControl sx={{ width: '300px' }} size="small">
      <InputLabel >Lọc theo danh mục</InputLabel>
      <Select
        label="Lọc theo danh mục"
        value={selectDanhMuc}
        onChange={(e) => setSelectDanhMuc(e.target.value)}
      >
        {danhMuc.map((dm) => (
          <MenuItem key={dm.id} value={dm.id}>{dm.tenDanhMuc}</MenuItem>
        ))}
      </Select>
    </FormControl>
        <Button variant="outlined" color="primary" onClick={() => {}}>Thêm danh mục</Button>
      <Button variant="outlined" color="warning" onClick={() => handleClickOpen({}, 'add')}>Thêm sản phẩm</Button>
      <Button variant="outlined" color="warning" onClick={fetchData}>Tạo phiếu nhập</Button>
      </Box>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mã Sản Phẩm</TableCell>
            <TableCell>Tên Sản Phẩm</TableCell>
            <TableCell>Mô Tả</TableCell>
            <TableCell>Hình Ảnh</TableCell>
            <TableCell>Danh Mục</TableCell>
            <TableCell>Giá Sản Phẩm</TableCell>
            <TableCell>Trạng Thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sanPham.map((row) => (
            <TableRow key={row.id} onClick={() => handleClickOpen(row, 'view')} style={{ cursor: 'pointer' }}>
              <TableCell>{row.maSanPham}</TableCell>
              <TableCell>{row.tenSanPham}</TableCell>
              <TableCell>{row.moTa}</TableCell>
              <TableCell>
                <img src={row.hinhAnh} alt={row.tenSanPham} width="50" />
              </TableCell>
              <TableCell>{row.danhMuc.tenDanhMuc}</TableCell>
              <TableCell>{row?.giaSanPham?.toLocaleString()} VND</TableCell>
              <TableCell>{row.trangThai}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ChiTietSanPham 
        open={open} 
        onClose={handleClose} 
        mode={mode} 
        sanPham={selectedSanPham} 
      />
    </TableContainer>
  );
}
