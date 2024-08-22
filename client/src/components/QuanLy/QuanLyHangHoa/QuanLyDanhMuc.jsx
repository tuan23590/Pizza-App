import React, { useContext, useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  CircularProgress, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Snackbar, Alert
} from '@mui/material';
import { APIDanhSachDanhMuc, APIThemDanhMuc, APIXoaDanhMuc } from '../../../utils/danhMucUtils';
import { AuthContext } from './../../../context/AuthProvider';

export default function QuanLyDanhMuc() {
  const { setNotifyOpen, setNotificationMessage, setNotificationSeverity } = useContext(AuthContext);
  const [danhMuc, setDanhMuc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // State for add/edit dialog
  const [confirmOpen, setConfirmOpen] = useState(false); // State for confirmation dialog
  const [isEdit, setIsEdit] = useState(false); // State to control if we are editing
  const [currentDanhMuc, setCurrentDanhMuc] = useState({ id: '', maDanhMuc: '', tenDanhMuc: '' }); // State for the current category
  const [deleteId, setDeleteId] = useState(null); // State to store the id of the category to delete

  const fetchData = async () => {
    const dataDM = await APIDanhSachDanhMuc();
    setDanhMuc(dataDM);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (danhMuc) => {
    if (danhMuc) {
      setIsEdit(true);
      setCurrentDanhMuc(danhMuc);
    } else {
      setIsEdit(false);
      setCurrentDanhMuc({ id: '', maDanhMuc: '', tenDanhMuc: '' });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDanhMuc({ ...currentDanhMuc, [name]: value });
  };

  const handleAddOrEditDanhMuc = async () => {
    try {
      if (isEdit) {
        // Update the category
        // await APICapNhatDanhMuc(currentDanhMuc.id, currentDanhMuc);
      } else {
        const data = await APIThemDanhMuc(currentDanhMuc.tenDanhMuc);
        if (data) {
          setNotificationMessage('Thêm danh mục thành công');
          setNotificationSeverity('success');
        } else {
          setNotificationMessage('Thêm danh mục thất bại');
          setNotificationSeverity('error');
        }
        setNotifyOpen(true);
      }
      handleClose();
      fetchData();
    } catch (error) {
      setNotificationMessage('Có lỗi xảy ra. Thử lại.');
      setNotificationSeverity('error');
      setNotifyOpen(true);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true); // Open the confirmation dialog
  };

  const handleConfirmDelete = async () => {
    try {
      const data = await APIXoaDanhMuc(deleteId);
      if (data) {
        setNotificationMessage('Xóa danh mục thành công');
        setNotificationSeverity('success');
      } else {
        setNotificationMessage('Xóa danh mục thất bại');
        setNotificationSeverity('error');
      }
      setNotifyOpen(true);
      setConfirmOpen(false);
      fetchData();
    } catch (error) {
      setNotificationMessage('Xóa danh mục thất bại');
      setNotificationSeverity('error');
      setNotifyOpen(true);
    }
  };

  const handleCancelDelete = () => setConfirmOpen(false);

  return (
    <TableContainer component={Paper}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" p={'20px'}>
          Quản Lý Danh Mục
        </Typography>
        <Button variant="contained" color="primary" sx={{ margin: '20px' }} onClick={() => handleOpen(null)}>
          Thêm Danh Mục
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã Danh Mục</TableCell>
              <TableCell>Tên Danh Mục</TableCell>
              <TableCell>Số Lượng Sản Phẩm</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {danhMuc.map((dm) => (
              <TableRow key={dm.id}>
                <TableCell>{dm.maDanhMuc}</TableCell>
                <TableCell>{dm.tenDanhMuc}</TableCell>
                <TableCell>{dm.soLuongSanPham} sản phẩm</TableCell>
                {dm.maDanhMuc !== 'DMXOA' && (
                  <TableCell>
                    <Button variant="contained" sx={{ marginX: '10px' }} color="primary" onClick={() => handleOpen(dm)}>
                      Sửa
                    </Button>
                    <Button variant="contained" sx={{ marginX: '10px' }} color="error" onClick={() => handleDelete(dm.id)}>
                      Xóa
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Dialog for adding/editing a category */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Sửa Danh Mục' : 'Thêm Danh Mục Mới'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng điền thông tin cho danh mục {isEdit ? 'muốn sửa' : 'mới'}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="tenDanhMuc"
            label="Tên Danh Mục"
            type="text"
            fullWidth
            value={currentDanhMuc.tenDanhMuc}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleAddOrEditDanhMuc} color="primary">
            {isEdit ? 'Cập Nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for deletion */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Xác Nhận Xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
