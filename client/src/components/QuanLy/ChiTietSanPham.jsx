import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, FormLabel, FormControlLabel, Checkbox, Box, Select, MenuItem, Typography } from '@mui/material';
import { APIDanhSachDanhMuc } from '../../utils/danhMucUtils';
import { APIDanhLoaiDe,APIDanhKichThuoc } from './../../utils/sanPhamUtils';

export default function ChiTietSanPham({ open, onClose, mode, sanPham }) {
  const [danhSachDanhMuc, setDanhSachDanhMuc] = useState([]);
  const [danhSachLoaiDe, setDanhSachLoaiDe] = useState([]);
  const [danhSachKichThuoc, setDanhSachKichThuoc] = useState([]);
  const [selectedDanhMuc, setSelectedDanhMuc] = useState([]);
  const [selectedLoaiDe, setSelectedLoaiDe] = useState([]);
  const [selectedKichThuoc, setSelectedKichThuoc] = useState([]);
  const [formData, setFormData] = useState({
    tenSanPham: '',
    moTa: '',
    hinhAnh: '',
    giaSanPham: '',
    trangThai: 'Đang kinh doanh'
  });

  const fetchData = async () => {
    const danhMucs = await APIDanhSachDanhMuc();
    setDanhSachDanhMuc(danhMucs);
    const loaiDes = await APIDanhLoaiDe();
    setDanhSachLoaiDe(loaiDes);
    const kichThuocs = await APIDanhKichThuoc();
    setDanhSachKichThuoc(kichThuocs);
  };

  useEffect(() => {
    fetchData();
    if (sanPham) {
      setFormData({
        tenSanPham: sanPham.tenSanPham || '',
        moTa: sanPham.moTa || '',
        hinhAnh: sanPham.hinhAnh || '',
        giaSanPham: sanPham.giaSanPham || '',
        trangThai: sanPham.trangThai || 'Đang kinh doanh'
      });
      if (sanPham.danhMuc) {
        setSelectedDanhMuc(sanPham.danhMuc.map(danhMuc => danhMuc.maDanhMuc));
      }
      if (sanPham.loaiDe) {
        setSelectedLoaiDe(sanPham.loaiDe.map(loaiDe => loaiDe.id));
      }
      if (sanPham.kichThuoc) {
        setSelectedKichThuoc(sanPham.kichThuoc.map(kichThuoc => kichThuoc.id));
      }
    }
  }, [sanPham]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDanhMucChange = (event) => {
    const value = event.target.value;
    setSelectedDanhMuc((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handleLoaiDeChange = (event) => {
    const value = event.target.value;
    setSelectedLoaiDe((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handleKichThuocChange = (event) => {
    const value = event.target.value;
    setSelectedKichThuoc((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handleSave = () => {
    console.log({
     formData,
      danhMuc: danhSachDanhMuc.filter(danhMuc => selectedDanhMuc.includes(danhMuc.maDanhMuc)),
      loaiDe: danhSachLoaiDe.filter(loaiDe => selectedLoaiDe.includes(loaiDe.id)),
      kichThuoc: danhSachKichThuoc.filter(kichThuoc => selectedKichThuoc.includes(kichThuoc.id)),
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{mode === 'view' ? 'Chi Tiết Sản Phẩm' : 'Thêm Sản Phẩm'}</DialogTitle>
      <DialogContent>
        {sanPham && (
          <>
            {mode === 'view' && (
              <TextField
                margin="dense"
                label="Mã Sản Phẩm"
                fullWidth
                value={sanPham.maSanPham}
                InputProps={{
                  readOnly: mode === 'view',
                }}
              />
            )}
            <TextField
              margin="dense"
              label="Tên Sản Phẩm"
              fullWidth
              name="tenSanPham"
              value={formData.tenSanPham}
              onChange={handleInputChange}
              InputProps={{
                readOnly: mode === 'view',
              }}
            />
            <TextField
              margin="dense"
              label="Mô Tả"
              fullWidth
              name="moTa"
              value={formData.moTa}
              onChange={handleInputChange}
              InputProps={{
                readOnly: mode === 'view',
              }}
            />
            <TextField
              margin="dense"
              label="Hình Ảnh"
              fullWidth
              name="hinhAnh"
              value={formData.hinhAnh}
              onChange={handleInputChange}
              InputProps={{
                readOnly: mode === 'view',
              }}
            />
            <TextField
              margin="dense"
              label="Giá Sản Phẩm"
              fullWidth
              type='number'
              name="giaSanPham"
              value={formData.giaSanPham}
              onChange={handleInputChange}
              InputProps={{
                readOnly: mode === 'view',
              }}
            />  
            <Typography>Trạng Thái</Typography>
            <Select 
              fullWidth 
              label='Trạng thái' 
              name="trangThai"
              value={formData.trangThai} 
              onChange={handleInputChange}
              InputProps={{
                readOnly: mode === 'view',
              }}>
              <MenuItem value="Đang kinh doanh">Đang kinh doanh</MenuItem>
              <MenuItem value="Ngừng kinh doanh">Ngừng kinh doanh</MenuItem>
            </Select>
            {/* <FormControl fullWidth component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Danh mục</FormLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {danhSachDanhMuc.map((danhMuc) => (
                  <FormControlLabel
                    key={danhMuc.maDanhMuc}
                    control={
                      <Checkbox
                        checked={selectedDanhMuc.includes(danhMuc.maDanhMuc)}
                        onChange={handleDanhMucChange}
                        value={danhMuc.maDanhMuc}
                        disabled={mode === 'view'}
                      />
                    }
                    label={danhMuc.tenDanhMuc}
                  />
                ))}
              </Box>
            </FormControl> */}
            <Typography>Danh mục</Typography>
             <Select 
              fullWidth 
              label='Danh mục' 
              name="danhMuc"
              value={formData.id} 
              onChange={handleInputChange}
              InputProps={{
                readOnly: mode === 'view',
              }}>
              {danhSachDanhMuc.map((danhMuc) => (
                <MenuItem key={danhMuc.id} value={danhMuc.id}>{danhMuc.tenDanhMuc}</MenuItem>
              ))}
            </Select>
            <FormControl fullWidth component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Loại đế</FormLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {danhSachLoaiDe.map((loaiDe) => (
                  <FormControlLabel
                    key={loaiDe.id}
                    control={
                      <Checkbox
                        checked={selectedLoaiDe.includes(loaiDe.id)}
                        onChange={handleLoaiDeChange}
                        value={loaiDe.id}
                        disabled={mode === 'view'}
                      />
                    }
                    label={loaiDe.tenLoaiDe}
                  />
                ))}
              </Box>
            </FormControl>
            <FormControl fullWidth component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Kích thước</FormLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {danhSachKichThuoc.map((kichThuoc) => (
                  <FormControlLabel
                    key={kichThuoc.id}
                    control={
                      <Checkbox
                        checked={selectedKichThuoc.includes(kichThuoc.id)}
                        onChange={handleKichThuocChange}
                        value={kichThuoc.id}
                        disabled={mode === 'view'}
                      />
                    }
                    label={kichThuoc.tenKichThuoc}
                  />
                ))}
              </Box>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        {mode !== 'view' && <Button color="primary" onClick={handleSave}>Lưu</Button>}
      </DialogActions>
    </Dialog>
  );
}
