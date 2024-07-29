import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, FormLabel, FormControlLabel, Checkbox, Box, Select, MenuItem, Typography, InputLabel } from '@mui/material';
import { APIDanhSachDanhMuc } from '../../utils/danhMucUtils';
import { APIDanhLoaiDe, APIDanhKichThuoc, APIThemSanPham } from './../../utils/sanPhamUtils';

export default function ChiTietSanPham({ open, onClose, mode, sanPham }) {
  const [danhSachDanhMuc, setDanhSachDanhMuc] = useState([]);
  const [danhSachLoaiDe, setDanhSachLoaiDe] = useState([]);
  const [danhSachKichThuoc, setDanhSachKichThuoc] = useState([]);
  const [selectedDanhMuc, setSelectedDanhMuc] = useState('');
  const [selectedLoaiDe, setSelectedLoaiDe] = useState([]);
  const [selectedKichThuoc, setSelectedKichThuoc] = useState([]);
  const [formData, setFormData] = useState({
    tenSanPham: '',
    moTa: '',
    hinhAnh: '',
    giaSanPham: '',
    danhMuc: '',
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
        danhMuc: sanPham.danhMuc?.maDanhMuc || '',
      });
      setSelectedDanhMuc(sanPham.danhMuc?.maDanhMuc || '');
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
    if (name === 'danhMuc') {
      setSelectedDanhMuc(value);
    }
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

  const handleSave = async () => {
    const res = await APIThemSanPham({ formData, selectedLoaiDe, selectedKichThuoc });
    if (res) {
      console.log('Thêm sản phẩm thành công');
      console.log(res);
    }
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
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="danh-muc-label">Danh mục</InputLabel>
              <Select
                labelId="danh-muc-label"
                id="danh-muc"
                label="Danh mục"
                name="danhMuc"
                value={selectedDanhMuc}
                onChange={handleInputChange}
                inputProps={{
                  readOnly: mode === 'view',
                }}
              >
                {danhSachDanhMuc?.map((danhMuc) => (
                  <MenuItem key={danhMuc.maDanhMuc} value={danhMuc.maDanhMuc}>
                    {danhMuc.tenDanhMuc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedDanhMuc === 'DM2' && (
              <>
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
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button color='warning' onClick={onClose}>Đóng</Button>
        {mode !== 'view' && <Button variant='outlined' color="info" onClick={handleSave}>Lưu</Button>}
      </DialogActions>
    </Dialog>
  );
}
