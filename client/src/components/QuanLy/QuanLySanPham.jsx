// QuanLySanPham.jsx
import React, { useEffect, useState } from 'react';
import { APIDanhSachSanPham } from '../../utils/sanPhamUtils';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import ChiTietSanPham from './ChiTietSanPham';

export default function QuanLySanPham() {
  const [sanPham, setSanPham] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('view'); // 'view' or 'add'
  const [selectedSanPham, setSelectedSanPham] = useState(null);

  const fetchData = async () => {
    const data = await APIDanhSachSanPham();
    setSanPham(data);
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
      <Typography variant="h6">
        Quản Lý Sản Phẩm
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleClickOpen({}, 'add')}>Thêm sản phẩm</Button>
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
              <TableCell>{row.danhMuc.map(danhMuc => danhMuc.tenDanhMuc).join(', ')}</TableCell>
              <TableCell>{row.giaSanPham.toLocaleString()} VND</TableCell>
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
