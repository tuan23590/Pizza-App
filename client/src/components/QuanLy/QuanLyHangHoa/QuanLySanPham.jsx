import React, { useEffect, useState } from 'react';
import { APIDanhSachSanPham } from '../../../utils/sanPhamUtils';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box, Select, MenuItem, TextField, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import ChiTietSanPham from '.././ChiTietSanPham';
import { APIDanhSachDanhMuc } from '../../../utils/danhMucUtils';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


export default function QuanLySanPham() {
  const [sanPham, setSanPham] = useState([]);
  const [danhMuc, setDanhMuc] = useState([]);
  const [selectDanhMuc, setSelectDanhMuc] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('view');
  const [selectedSanPham, setSelectedSanPham] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const dataSP = await APIDanhSachSanPham();
    setSanPham(dataSP);
    const dataDM = await APIDanhSachDanhMuc();
    setDanhMuc(dataDM.sort((a, b) => b.soLuongSanPham - a.soLuongSanPham));
    setLoading(false);
    console.log(dataSP);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!open) {
      fetchData();
    }
  }, [open]);

  const handleClickOpen = (sanPham, mode) => {
    setSelectedSanPham(sanPham);
    setMode(mode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSanPham(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredSanPham = sanPham.filter((sp) => {
    const matchesCategory = selectDanhMuc ? sp.danhMuc.id === selectDanhMuc : true;
    const matchesSearch = sp.maSanPham.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <TableContainer component={Paper}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <Typography variant="h5">
          Quản Lý Sản Phẩm
        </Typography>
        <Box sx={{ gap: 2, display: 'flex' }}>
          <TextField
            label="Tìm kiếm mã sản phẩm"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ width: '300px' }} size="small">
            <InputLabel>Lọc theo danh mục</InputLabel>
            <Select
              label="Lọc theo danh mục"
              value={selectDanhMuc}
              onChange={(e) => setSelectDanhMuc(e.target.value)}
            >
              <MenuItem value={null}>Tất cả</MenuItem>
              {danhMuc.map((dm) => (
                <MenuItem key={dm.id} value={dm.id}>{dm?.tenDanhMuc} ({dm.soLuongSanPham}) </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="info" onClick={() => handleClickOpen({}, 'add')}>
            Thêm sản phẩm
          </Button>
        </Box>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress /> {/* Display loading spinner while fetching data */}
        </Box>
      ) : (

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã Sản Phẩm</TableCell>
              <TableCell>Hình Ảnh</TableCell>
              <TableCell>Tên Sản Phẩm</TableCell>
              <TableCell>Giá Sản Phẩm</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Danh Mục</TableCell>
              <TableCell>Trạng Thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSanPham.map((row) => (
              <TableRow key={row.id} onClick={() => handleClickOpen(row, 'edit')} sx={{
                cursor: 'pointer', ':hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}>
                <TableCell>{row.maSanPham}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    sx={{
                      
                      width: 30,
                    }}
                    alt={row.tenSanPham}
                    src={row.hinhAnh}
                  />
                </TableCell>
                <TableCell>{row.tenSanPham}</TableCell>
                <TableCell>{row?.giaSanPham?.toLocaleString()} VND</TableCell>
                <TableCell>{row.soLuong || 0}</TableCell>
                <TableCell>{row.danhMuc?.tenDanhMuc.toUpperCase()}</TableCell>
                <TableCell
                  sx={{
                    color: row.trangThai == 'Ngừng kinh doanh' ? 'red' : 'green',
                    fontWeight: '500'
                  }}
                >{row.trangThai}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ChiTietSanPham
        open={open}
        onClose={handleClose}
        mode={mode}
        sanPham={selectedSanPham}
      />
    </TableContainer>
  );
}
