import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
  FormControl, FormLabel, Checkbox, Box, Select, MenuItem,
  InputLabel, Grid, FormGroup
} from '@mui/material';
import { APIDanhSachDanhMucChoNguoiDung } from '../../utils/danhMucUtils';
import FileUpload from '../FileUpload';
import { APIThemSanPham } from '../../utils/sanPhamUtils';
import { AuthContext } from './../../context/AuthProvider';

export default function ChiTietSanPham({ open, onClose, sanPham,mode }) {
  const { setNotifyOpen, setNotificationMessage, setNotificationSeverity } = useContext(AuthContext);
  const [danhMuc, setDanhMuc] = useState([]);
  const [formData, setFormData] = useState({
    tenSanPham: '',
    moTa: '',
    ghiChu: '',
    hinhAnh: '',
    danhMuc: '',
    giaSanPham: '',
    danhSachKichThuoc: {},
    danhSachLoaiDe: {}
  });

  useEffect(() => {
    if (mode === 'edit' && sanPham) {
      const kichThuocParsed = JSON.parse(sanPham.kichThuoc || '{}');
      const loaiDeParsed = JSON.parse(sanPham.loaiDe || '{}');
      
      setFormData({
        tenSanPham: sanPham.tenSanPham || '',
        moTa: sanPham.moTa || '',
        ghiChu: sanPham.ghiChu || '',
        hinhAnh: sanPham.hinhAnh || '',
        danhMuc: sanPham.danhMuc.maDanhMuc || '',
        giaSanPham: sanPham.giaSanPham || '',
        trangThai: sanPham.trangThai || '',
        danhSachKichThuoc: kichThuocParsed,
        danhSachLoaiDe: loaiDeParsed,
      });
  
      // Set the checked states based on the parsed data
      const kichThuocCheckedState = danhSachKichThuoc.reduce((acc, kichThuoc, index) => {
        acc[index] = kichThuocParsed[kichThuoc] !== undefined;
        return acc;
      }, {});
      setKichThuocChecked(kichThuocCheckedState);
  
      const deCheckedState = danhSachDe.reduce((acc, de, index) => {
        acc[index] = loaiDeParsed[de] !== undefined;
        return acc;
      }, {});
      setDeChecked(deCheckedState);
    } else {
      setFormData({
        tenSanPham: '',
        moTa: '',
        ghiChu: '',
        hinhAnh: '',
        danhMuc: '',
        giaSanPham: '',
        danhSachKichThuoc: {},
        danhSachLoaiDe: {}
      });
      setKichThuocChecked({});
      setDeChecked({});
    }
  }, [sanPham, mode]);
  

  const [kichThuocChecked, setKichThuocChecked] = useState({});
  const [deChecked, setDeChecked] = useState({});
  const kichThuocRefs = useRef([]);
  const deRefs = useRef([]);

  const danhSachKichThuoc = ['Nhỏ', 'Vừa', 'Lớn'];
  const danhSachDe = ['Đế kéo tay truyền thống', 'Đế giòn xốp', 'Viền phô mai', 'Viền xúc xích', 'Viền phô mai xúc xích', 'Viền phô mai xoắn'];

  const fetchDanhMuc = async () => {
    const danhMuc = await APIDanhSachDanhMucChoNguoiDung();
    setDanhMuc(danhMuc);
  };

  useEffect(() => {
    fetchDanhMuc();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKichThuocChange = (index) => {
    const kichThuoc = danhSachKichThuoc[index];
    setKichThuocChecked((prev) => {
      const newChecked = !prev[index];
      setFormData((prevData) => ({
        ...prevData,
        danhSachKichThuoc: {
          ...prevData.danhSachKichThuoc,
          [kichThuoc]: newChecked ? '' : undefined
        }
      }));
      if (newChecked) {
        setTimeout(() => {
          kichThuocRefs.current[index]?.focus();
        }, 100);
      }
      return {
        ...prev,
        [index]: newChecked,
      };
    });
  };

  const handleDeChange = (index) => {
    const de = danhSachDe[index];
    setDeChecked((prev) => {
      const newChecked = !prev[index];
      setFormData((prevData) => ({
        ...prevData,
        danhSachLoaiDe: {
          ...prevData.danhSachLoaiDe,
          [de]: newChecked ? '' : undefined
        }
      }));
      if (newChecked) {
        setTimeout(() => {
          deRefs.current[index]?.focus();
        }, 100);
      }
      return {
        ...prev,
        [index]: newChecked,
      };
    });
  };

  const handleKichThuocGiaChange = (index, e) => {
    const kichThuoc = danhSachKichThuoc[index];
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      danhSachKichThuoc: {
        ...prevData.danhSachKichThuoc,
        [kichThuoc]: parseFloat(value)
      }
    }));
  };

  const handleDeGiaChange = (index, e) => {
    const de = danhSachDe[index];
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      danhSachLoaiDe: {
        ...prevData.danhSachLoaiDe,
        [de]: parseFloat(value)
      }
    }));
  };

  const handleImageUploadSuccess = (filePath) => {
    console.log('Uploaded image path: ', filePath);
    setFormData((prev) => ({
      ...prev,
      hinhAnh: filePath[0],
    }));
  };
  const onSave = async () => {
    const data = await APIThemSanPham(formData);
    if (data) {
      setNotificationMessage('Thêm sản phẩm thành công');
      setNotificationSeverity('success');
      onClose();
    } else {
      setNotificationMessage('Thêm sản phẩm thất bại');
      setNotificationSeverity('error');
    }
    setNotifyOpen(true);
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Thêm Sản Phẩm</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
              <InputLabel>Danh Mục</InputLabel>
              <Select
                name="danhMuc"
                value={formData.danhMuc}
                label="Danh Mục"
                onChange={handleChange}
                variant="outlined"
              >
                {danhMuc.map((dm) => (
                  <MenuItem key={dm.id} value={dm.maDanhMuc}>
                    {dm.tenDanhMuc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tên Sản Phẩm"
              variant="outlined"
              name="tenSanPham"
              value={formData.tenSanPham}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Mô Tả"
              variant="outlined"
              name="moTa"
              value={formData.moTa}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Giá Sản Phẩm"
              variant="outlined"
              type="number"
              name="giaSanPham"
              value={formData.giaSanPham}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FileUpload
              accept="image/*"
              onUploadSuccess={handleImageUploadSuccess}
            />
          </Grid>
          {mode == 'edit' && (
            <Grid item xs={6}>
            <FormControl fullWidth >
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  name="trangThai"
                  value={formData.trangThai || ''}
                  label="Trạng thái"
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem value="Ngừng kinh doanh">Ngừng kinh doanh</MenuItem>
                  <MenuItem value="Đang kinh doanh">Đang kinh doanh</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )
          }
          <Grid item xs={12}>
            <TextField
              multiline
              rows={2}
              fullWidth
              label="Ghi Chú"
              variant="outlined"
              name="ghiChu"
              value={formData.ghiChu}
              onChange={handleChange}
            />
          </Grid>
          {formData.danhMuc == 'DM1' && (
            <>
            <Grid item xs={6}>
            <FormGroup>
              <FormLabel component="legend">
                Kích thước
                <br />
                <i>* nhấn chọn kích thước của bánh và nhập giá</i>
              </FormLabel>
              {danhSachKichThuoc.map((kt, index) => (
                <Box key={index} sx={{ marginY: 1, display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={kichThuocChecked[index] || false}
                    onChange={() => handleKichThuocChange(index)}
                  />
                  <TextField
                    label={kt}
                    placeholder={`Nhập giá ${kt}`}
                    variant="outlined"
                    fullWidth
                    type="number"
                    size="small"
                    inputProps={{ min: 0 }}
                    disabled={!kichThuocChecked[index]}
                    inputRef={(el) => (kichThuocRefs.current[index] = el)}
                    value={formData.danhSachKichThuoc[kt] || ''}
                    onChange={(e) => handleKichThuocGiaChange(index, e)}
                  />
                </Box>
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormLabel component="legend">
                Loại đế
                <br />
                <i>* nhấn chọn loại đế của bánh và nhập giá</i>
              </FormLabel>
              {danhSachDe.map((de, index) => (
                <Box key={index} sx={{ marginY: 1, display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={deChecked[index] || false}
                    onChange={() => handleDeChange(index)}
                  />
                  <TextField
                    label={de}
                    placeholder={`Nhập giá ${de}`}
                    variant="outlined"
                    fullWidth
                    type="number"
                    size="small"
                    inputProps={{ min: 0 }}
                    disabled={!deChecked[index]}
                    inputRef={(el) => (deRefs.current[index] = el)}
                    value={formData.danhSachLoaiDe[de] || ''}
                    onChange={(e) => handleDeGiaChange(index, e)}
                  />
                </Box>
              ))}
            </FormGroup>
          </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="warning" onClick={onClose}>Đóng</Button>
        <Button variant="outlined" onClick={onSave} color="info">Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
