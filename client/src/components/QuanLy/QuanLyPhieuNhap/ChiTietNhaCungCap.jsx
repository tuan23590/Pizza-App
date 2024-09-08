import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { APIDanhSachQuanHuyen, APIDanhSachTinhTpDayDu, APIDanhSachXaPhuong } from '../../../utils/diaChiUtils';
import { APIDanhSachDanhMucThemSanPham } from './../../../utils/danhMucUtils';
import { APICapNhatNhaCungCap, APIThemNhaCungCap } from '../../../utils/nhaCungCapUtils';
import { AuthContext } from '../../../context/AuthProvider';

export default function ChiTietNhaCungCap({ open, onClose, mode, nhaCungCap }) {
  const { setNotifyOpen, setNotificationMessage, setNotificationSeverity } = useContext(AuthContext);
  const [danhSachTinhTp, setDanhSachTinhTp] = useState([]);
  const [danhSachQuanHuyen, setDanhSachQuanHuyen] = useState([]);
  const [danhSachXaPhuong, setDanhSachXaPhuong] = useState([]);
  const [danhSachDanhMuc, setDanhSachDanhMuc] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    tenNhaCungCap: '',
    diaChi: '',
    soDienThoai: '',
    email: '',
    ghiChu: '',
    danhSachDanhMuc: [],
    tinhTp: null,
    quanHuyen: null,
    xaPhuong: null,
    soNhaTenDuong: '',
  });

  useEffect(() => {
    const fetchDanhSachTinhTp = async () => {
      const data = await APIDanhSachTinhTpDayDu();
      setDanhSachTinhTp(data);
      const dataDanhMuc = await APIDanhSachDanhMucThemSanPham();
      setDanhSachDanhMuc(dataDanhMuc);
    };
    fetchDanhSachTinhTp();
  }, []);

  useEffect(() => {
    if (mode === 'edit' && nhaCungCap) {
      setFormData({
        id: nhaCungCap.id,
        tenNhaCungCap: nhaCungCap.tenNhaCungCap,
        diaChi: nhaCungCap.diaChi,
        soDienThoai: nhaCungCap.soDienThoai,
        email: nhaCungCap.email,
        ghiChu: nhaCungCap.ghiChu,
        danhSachDanhMuc: nhaCungCap.danhSachDanhMuc.map((danhMuc) => danhMuc.id),
        tinhTp: JSON.parse(nhaCungCap.tinhTp),
        quanHuyen: JSON.parse(nhaCungCap.quanHuyen),
        xaPhuong: JSON.parse(nhaCungCap.xaPhuong),
        soNhaTenDuong: nhaCungCap.soNhaTenDuong,
      });
    } else {
      setFormData({
        id: '',
        tenNhaCungCap: '',
        diaChi: '',
        soDienThoai: '',
        email: '',
        ghiChu: '',
        danhSachDanhMuc: [],
        tinhTp: null,
        quanHuyen: null,
        xaPhuong: null,
        soNhaTenDuong: '',
      });
    }
  }, [mode, nhaCungCap,open]);

  useEffect(() => {
    const fetchDanhSachQuanHuyen = async () => {
      if (formData.tinhTp) {
        const data = await APIDanhSachQuanHuyen(formData.tinhTp.code);
        setDanhSachQuanHuyen(data);
      } else {
        setDanhSachQuanHuyen([]);
      }
    };
    fetchDanhSachQuanHuyen();
  }, [formData.tinhTp]);

  useEffect(() => {
    const fetchDanhSachXaPhuong = async () => {
      if (formData.quanHuyen) {
        const data = await APIDanhSachXaPhuong(formData.quanHuyen.code);
        setDanhSachXaPhuong(data);
      } else {
        setDanhSachXaPhuong([]);
      }
    };
    fetchDanhSachXaPhuong();
  }, [formData.quanHuyen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTinhTpChange = (event, value) => {
    setFormData((prevData) => ({
      ...prevData,
      tinhTp: value,
      quanHuyen: null,
      xaPhuong: null,
    }));
  };

  const handleQuanHuyenChange = (event, value) => {
    setFormData((prevData) => ({
      ...prevData,
      quanHuyen: value,
      xaPhuong: null,
    }));
  };

  const handleXaPhuongChange = (event, value) => {
    setFormData((prevData) => ({
      ...prevData,
      xaPhuong: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => {
      const newDanhSachDanhMuc = checked
        ? [...prevData.danhSachDanhMuc, value]
        : prevData.danhSachDanhMuc.filter((item) => item !== value);

      return { ...prevData, danhSachDanhMuc: newDanhSachDanhMuc };
    });
  };

  const handleSubmit = async () => {
    if (
      formData.tenNhaCungCap === '' ||
      formData.soDienThoai === '' ||
      formData.email === '' ||
      formData.tinhTp === null ||
      formData.quanHuyen === null ||
      formData.xaPhuong === null ||
      formData.soNhaTenDuong === '' ||
      formData.danhSachDanhMuc.length === 0
    ) {
      setNotifyOpen(true);
      setNotificationMessage('Vui lòng nhập đầy đủ thông tin');
      setNotificationSeverity('error');
      return;
    }
    let data;
    if(mode === 'edit') {
      
      data = await APICapNhatNhaCungCap(formData);
      if (data) {
        setNotifyOpen(true);
        setNotificationMessage('Cập nhật nhà cung cấp thành công');
        setNotificationSeverity('success');
        onClose();
      } else {
        setNotifyOpen(true);
        setNotificationMessage('Cập nhật nhà cung cấp thất bại');
        setNotificationSeverity('error');
      }
    }else {

    data = await APIThemNhaCungCap(formData);
    if (data) {
      setNotifyOpen(true);
      setNotificationMessage('Thêm nhà cung cấp thành công');
      setNotificationSeverity('success');
      onClose();
    } else {
      setNotifyOpen(true);
      setNotificationMessage('Thêm nhà cung cấp thất bại');
      setNotificationSeverity('error');
    }
  }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thông Tin Nhà Cung Cấp</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              autoFocus
              label="Tên Nhà Cung Cấp"
              name="tenNhaCungCap"
              value={formData.tenNhaCungCap}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              
              fullWidth
              options={danhSachTinhTp}
              getOptionLabel={(option) => option.name_with_type}
              value={formData.tinhTp}
              onChange={handleTinhTpChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tỉnh/Thành phố"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              options={danhSachQuanHuyen}
              getOptionLabel={(option) => option.name_with_type}
              value={formData.quanHuyen}
              onChange={handleQuanHuyenChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Quận/Huyện"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              options={danhSachXaPhuong}
              getOptionLabel={(option) => option.name_with_type}
              value={formData.xaPhuong}
              onChange={handleXaPhuongChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Xã/Phường"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Số nhà/Tên đường"
              name="soNhaTenDuong"
              value={formData.soNhaTenDuong}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="Số Điện Thoại"
              name="soDienThoai"
              value={formData.soDienThoai}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormLabel component="legend">
                Danh sách danh mục các sản phẩm cung cấp:
              </FormLabel>
              {danhSachDanhMuc.map((danhMuc) => (
                <FormControlLabel
                  key={danhMuc.id}
                  control={
                    <Checkbox
                      value={danhMuc.id}
                      checked={formData.danhSachDanhMuc.includes(danhMuc.id)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={danhMuc.tenDanhMuc}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ghi Chú"
              name="ghiChu"
              value={formData.ghiChu}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant='outlined'>
          Đóng
        </Button>
        <Button onClick={handleSubmit} color="primary" variant='contained'>
          {mode === 'edit' ? 'Cập Nhật' : 'Thêm nhà cung cấp'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
