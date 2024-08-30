import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
  FormControl, FormLabel, Checkbox, Box, Select, MenuItem,
  InputLabel, Grid, FormGroup
} from '@mui/material';
import { APIDanhSachDanhMucThemSanPham } from '../../utils/danhMucUtils';
import FileUpload from '../FileUpload';
import { APICapNhatSanPham, APIThemSanPham } from '../../utils/sanPhamUtils';
import { AuthContext } from './../../context/AuthProvider';

export default function ChiTietSanPham({ open, onClose, sanPham, mode }) {
  const { setNotifyOpen, setNotificationMessage, setNotificationSeverity } = useContext(AuthContext);
  const [danhMuc, setDanhMuc] = useState([]);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (mode === 'edit' && sanPham) {
      const kichThuocParsed = JSON.parse(sanPham.kichThuoc || '[]');
      const loaiDeParsed = JSON.parse(sanPham.loaiDe || '[]');

      console.log('kichThuocParsed', kichThuocParsed);
      console.log('loaiDeParsed', loaiDeParsed);

      setFormData({
        id: sanPham.id,
        tenSanPham: sanPham.tenSanPham || '',
        moTa: sanPham.moTa || '',
        donViTinh: sanPham.donViTinh || '',
        hinhAnh: sanPham.hinhAnh || '',
        danhMuc: sanPham.danhMuc.maDanhMuc || '',
        giaSanPham: sanPham.giaSanPham || '',
        trangThai: sanPham.trangThai || '',
        danhSachKichThuoc: kichThuocParsed,
        danhSachLoaiDe: loaiDeParsed,
        soLuong: sanPham.soLuong || 0
      });

      // Kiểm tra trạng thái checkbox cho Kích Thước
      const kichThuocCheckedState = danhSachKichThuoc.reduce((acc, kichThuoc, index) => {
        acc[index] = kichThuocParsed.some(item => item.tenKichThuoc === kichThuoc);
        return acc;
      }, {});
      setKichThuocChecked(kichThuocCheckedState);

      // Kiểm tra trạng thái checkbox cho Loại Đế
      const deCheckedState = danhSachDe.reduce((acc, de, index) => {
        acc[index] = loaiDeParsed.some(item => item.tenLoaiDe === de);
        return acc;
      }, {});
      setDeChecked(deCheckedState);

    } else {
      // Reset lại formData và trạng thái checkbox nếu không phải chế độ 'edit'
      setFormData({
        danhMuc: danhMuc[0]?.maDanhMuc || '',
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
    const danhMuc = await APIDanhSachDanhMucThemSanPham();
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
      setFormData((prevData) => {
        let newDanhSachKichThuoc;

        if (newChecked) {
          newDanhSachKichThuoc = [
            ...prevData.danhSachKichThuoc,
            { tenKichThuoc: kichThuoc, giaKichThuoc: 0 }
          ];
        } else {
          newDanhSachKichThuoc = prevData.danhSachKichThuoc.filter(
            item => item.tenKichThuoc !== kichThuoc
          );
        }

        return {
          ...prevData,
          danhSachKichThuoc: newDanhSachKichThuoc,
        };
      });

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
      setFormData((prevData) => {
        let newDanhSachLoaiDe;

        if (newChecked) {
          newDanhSachLoaiDe = [
            ...prevData.danhSachLoaiDe,
            { tenLoaiDe: de, giaLoaiDe: 0 }
          ];
        } else {
          newDanhSachLoaiDe = prevData.danhSachLoaiDe.filter(
            item => item.tenLoaiDe !== de
          );
        }

        return {
          ...prevData,
          danhSachLoaiDe: newDanhSachLoaiDe,
        };
      });

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

    setFormData((prevData) => {
      const newDanhSachKichThuoc = prevData.danhSachKichThuoc.map(item =>
        item.tenKichThuoc === kichThuoc
          ? { ...item, giaKichThuoc: parseFloat(value) }
          : item
      );

      return {
        ...prevData,
        danhSachKichThuoc: newDanhSachKichThuoc,
      };
    });
  };

  const handleDeGiaChange = (index, e) => {
    const de = danhSachDe[index];
    const { value } = e.target;

    setFormData((prevData) => {
      const newDanhSachLoaiDe = prevData.danhSachLoaiDe.map(item =>
        item.tenLoaiDe === de
          ? { ...item, giaLoaiDe: parseFloat(value) }
          : item
      );

      return {
        ...prevData,
        danhSachLoaiDe: newDanhSachLoaiDe,
      };
    });
  };


  const handleImageUploadSuccess = (filePath) => {
    console.log('Uploaded image path: ', filePath);
    setFormData((prev) => ({
      ...prev,
      hinhAnh: filePath[0],
    }));
  };
  const onSave = async () => {
    if (formData.tenSanPham === '' || formData.giaSanPham === '' || formData.hinhAnh === '' || formData.moTa === '') {
      setNotificationMessage('Vui lòng nhập đủ thông tin');
      setNotificationSeverity('error');
      setNotifyOpen(true);
      return;
    }
    let data;
    if (mode === 'edit') {
      data = await APICapNhatSanPham(formData);
    } else {
      data = await APIThemSanPham(formData);
    }
    if (data) {
      setNotificationMessage(mode === 'edit' ? 'Cập nhật sản phẩm thành công' : 'Thêm sản phẩm thành công');
      setNotificationSeverity('success');
      onClose();
    } else {
      setNotificationMessage(mode === 'edit' ? 'Cập nhật sản phẩm thất bại' : 'Thêm sản phẩm thất bại');
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
                disabled={mode === 'edit'}
                name="danhMuc"
                value={formData?.danhMuc}
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên Sản Phẩm"
              multiline
              variant="outlined"
              name="tenSanPham"
              value={formData?.tenSanPham}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label="Mô Tả"
              variant="outlined"
              name="moTa"
              value={formData?.moTa}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="donViTinh">Đơn Vị Tính</InputLabel>
              <Select
                label="Đơn Vị Tính"
                value={formData?.donViTinh || ''}
                onChange={handleChange}
                name='donViTinh'

              >
                <MenuItem value='Cái'>Cái</MenuItem>
                <MenuItem value='Phần'>Phần</MenuItem>
                <MenuItem value='Chai'>Chai</MenuItem>
                <MenuItem value='Lon'>Lon</MenuItem>
                <MenuItem value='Ly'>Ly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Giá Sản Phẩm"
              variant="outlined"
              type="text"
              name="giaSanPham"
              // value={formData?.giaSanPham}
              value={
                formData?.giaSanPham
                    ? String(formData.giaSanPham).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : ''
            }
              // onChange={handleChange}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, ''); // Remove any existing commas
                if (/^\d*\.?\d*$/.test(value)) { // Ensure it's a valid number
                    setFormData({ ...formData, giaSanPham: value });
                }
            }}
            />
          </Grid>
          <Grid item xs={6}>
            <FileUpload
              accept="image/*"
              onUploadSuccess={handleImageUploadSuccess}
            />
          </Grid>
          {mode == 'edit' && (
            <>
            <Grid item xs={6}>
              <FormControl fullWidth >
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  name="trangThai"
                  value={formData?.trangThai || ''}
                  label="Trạng thái"
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem value="Ngừng kinh doanh">Ngừng kinh doanh</MenuItem>
                  {formData?.soLuong > 0 && <MenuItem value="Đang kinh doanh">Đang kinh doanh</MenuItem>}
                </Select>
              </FormControl>
            </Grid>
            
            </>
          )
          }
<Grid item xs={6}></Grid>
          {/* Hiển thị nếu formData.danhMuc == 'DM1' hoặc formData.danhSachKichThuoc.length > 0 hoặc formData.danhSachDe.length > 0  */}
          {(formData?.danhMuc === 'DM1' || formData?.danhSachKichThuoc?.length > 0 || formData?.danhSachLoaiDe?.length > 0) &&
            (
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
                          placeholder='Măc định là 0đ'
                          variant="outlined"
                          fullWidth
                          type="number"
                          size="small"
                          focused={kichThuocChecked[index]}
                          InputLabelProps={{ shrink: kichThuocChecked[index] }}
                          inputProps={{ min: 0 }}
                          disabled={!kichThuocChecked[index]}
                          inputRef={(el) => (kichThuocRefs.current[index] = el)}
                          value={(formData?.danhSachKichThuoc?.find(item => item.tenKichThuoc === kt)?.giaKichThuoc) || ''}
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
                          placeholder='Măc định là 0đ'
                          variant="outlined"
                          fullWidth
                          type="number"
                          size="small"
                          focused={deChecked[index]}
                          InputLabelProps={{ shrink: deChecked[index] }}
                          inputProps={{ min: 0 }}
                          disabled={!deChecked[index]}
                          inputRef={(el) => (deRefs.current[index] = el)}
                          value={(formData?.danhSachLoaiDe?.find(item => item.tenLoaiDe === de)?.giaLoaiDe) || ''}
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
        <Button variant='outlined' color="warning" onClick={onClose}>Đóng</Button>
        {formData?.danhMuc !== 'DMXOA' && (
          mode === 'add' ? (<Button variant="contained" onClick={onSave} color="info">Lưu</Button>) : (
            <Button variant="contained" onClick={onSave} color="info">Cập nhật</Button>
          ))}
      </DialogActions>
    </Dialog>
  );
}
