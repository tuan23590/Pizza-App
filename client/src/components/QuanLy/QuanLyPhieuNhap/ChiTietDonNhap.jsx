import React, { useContext, useEffect, useState } from 'react';
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { APIThemDonNhap } from '../../../utils/donNhapUtils';
import { AuthContext } from '../../../context/AuthProvider';
import { APIDanhSachSanPhamTheoMaDanhMuc } from './../../../utils/sanPhamUtils';
import { APIDanhSachDanhMucThemSanPham } from './../../../utils/danhMucUtils';
import { APIDanhSachNhaCungCapTheoDanhMuc } from './../../../utils/nhaCungCapUtils';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FOMATDATE } from './../../../function/index';

export default function ChiTietDonNhap({ open, onClose, mode, donNhap }) {
    const { setNotifyOpen, setNotificationMessage, setNotificationSeverity } = useContext(AuthContext);
    const [danhSachSanPham, setDanhSachSanPham] = useState([]);
    const [danhSachNhaCungCap, setDanhSachNhaCungCap] = useState([]);
    const [danhSachDanhMuc, setDanhSachDanhMuc] = useState([]);
    const [danhMucSelected, setDanhMucSelected] = useState(null);
    const [chiTietDonNhap, setChiTietDonNhap] = useState(null);
    const [formData, setFormData] = useState(null);
    useEffect(() => {
        setDanhSachSanPham([]);
        setDanhSachNhaCungCap([]);
        setDanhMucSelected(null);
        if (open) {
            if (mode === 'edit' && donNhap) {
                setFormData({
                    id: donNhap.id,
                    maDonNhap: donNhap.maDonNhap,
                    ngayNhap: donNhap.ngayNhap,
                    danhSachSanPham: donNhap.chiTietDonNhap,
                    ghiChu: donNhap.ghiChu,
                    tongTien: donNhap.tongTien,
                });
                setChiTietDonNhap({
                    ...donNhap.chiTietDonNhap[0],
                });
                setDanhMucSelected(donNhap.chiTietDonNhap[0].sanPham.danhMuc);
            } else {
                setFormData({
                    id: '',
                    danhSachSanPham: [],
                    ghiChu: '',
                    tongTien: 0,
                });
                setChiTietDonNhap(null);
            }
        }
    }, [open, mode]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await APIDanhSachDanhMucThemSanPham();
            if (data) {
                setDanhSachDanhMuc(data);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (mode != 'edit') {
            setChiTietDonNhap({ ...chiTietDonNhap, sanPham: null });
        }
        const fetchData = async () => {
            if (danhMucSelected) {
                const data = await APIDanhSachSanPhamTheoMaDanhMuc(danhMucSelected.maDanhMuc);
                if (data) {
                    setDanhSachSanPham(data);
                }
                const dataNhaCungCap = await APIDanhSachNhaCungCapTheoDanhMuc(danhMucSelected.id);
                if (dataNhaCungCap) {
                    setDanhSachNhaCungCap(dataNhaCungCap);
                }
            }
        };
        fetchData();
    }, [danhMucSelected]);

    useEffect(() => {

        if (chiTietDonNhap) {
            const thanhTien = chiTietDonNhap?.soLuong * chiTietDonNhap?.giaNhap;
            setChiTietDonNhap((prev) => ({ ...prev, thanhTien: thanhTien }));
        }
    }, [chiTietDonNhap?.soLuong, chiTietDonNhap?.giaNhap]);

    useEffect(() => {
        if (formData?.danhSachSanPham) {
            let tongTien = 0;
            formData.danhSachSanPham.forEach((item) => {
                tongTien += item?.thanhTien;
            });
            setFormData((prev) => ({ ...prev, tongTien: tongTien }));
        }
    }, [formData?.danhSachSanPham]);

    const handleSubmit = async () => {
        if (
            formData.danhSachSanPham.length === 0
        ) {
            setNotifyOpen(true);
            setNotificationMessage('Vui lòng nhập thông tin sản phẩm');
            setNotificationSeverity('error');
            return;
        }
        const data = await APIThemDonNhap(formData);
        if (data) {
            setNotifyOpen(true);
            setNotificationMessage(mode === 'edit' ? 'Cập nhật thành công' : 'Thêm đơn nhập thành công');
            setNotificationSeverity('success');
            onClose();
        } else {
            setNotifyOpen(true);
            setNotificationMessage(mode === 'edit' ? 'Cập nhật thất bại' : 'Thêm đơn nhập thất bại');
            setNotificationSeverity('error');
        }
    };
    const handleAddSanPham = () => {
        if (
            !chiTietDonNhap?.sanPham ||
            !chiTietDonNhap.soLuong ||
            !chiTietDonNhap.giaNhap ||
            !chiTietDonNhap.nhaCungCap
        ) {
            setNotifyOpen(true);
            setNotificationMessage('Vui lòng nhập đầy đủ thông tin sản phẩm');
            setNotificationSeverity('error');
            return;
        }
        setFormData((prev) => ({
            ...prev,
            danhSachSanPham: [...prev.danhSachSanPham, chiTietDonNhap],
        }));
        setChiTietDonNhap(null);
        setNotificationMessage('Thêm sản phẩm vào phiếu nhập thành công');
        setNotificationSeverity('success');
        setNotifyOpen(true);
    };
    const handleRemoveSanPham = (index) => {
        const updatedSanPham = [...formData.danhSachSanPham];
        updatedSanPham.splice(index, 1);
        setFormData({ ...formData, danhSachSanPham: updatedSanPham });
        setNotificationMessage('Xóa sản phẩm thành công');
        setNotificationSeverity('success');
        setNotifyOpen(true);
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
            <DialogTitle>Thông Tin Đơn Nhập</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} pt={2}>
                    <Grid item xs={5}>
                        <Grid container spacing={2}>
                            {mode === 'edit' && (
                                <>
                                    <Grid item xs={12}>
                                        <Typography sx={{ fontSize: '20px' }}><b>Thông sản đơn nhập</b></Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            disabled
                                            label="Mã Đơn Nhập"
                                            value={formData?.maDonNhap || ''}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            disabled
                                            label="Ngày Nhập"
                                            value={FOMATDATE(formData?.ngayNhap) || ''}
                                        />
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: '20px' }}><b>Thông sản phẩm nhập</b></Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    value={danhMucSelected}
                                    disabled={mode === 'edit'}
                                    options={danhSachDanhMuc}
                                    getOptionLabel={(option) => option.tenDanhMuc}
                                    renderInput={(params) => <TextField {...params} label="Danh Mục" />}
                                    onChange={(e, value) => { setDanhMucSelected(value); }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disabled={mode === 'edit'}
                                    value={chiTietDonNhap?.sanPham}
                                    options={danhSachSanPham}
                                    getOptionLabel={(option) => option.tenSanPham}
                                    renderInput={(params) => <TextField {...params} label="Sản Phẩm" />}
                                    onChange={(e, value) => setChiTietDonNhap({ ...chiTietDonNhap, sanPham: value })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={mode === 'edit'}
                                    fullWidth
                                    required
                                    label="Giá Nhập"
                                    type="text" // Use 'text' type to allow formatting with commas
                                    value={
                                        chiTietDonNhap?.giaNhap
                                            ? String(chiTietDonNhap.giaNhap).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            : ''
                                    }
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/,/g, ''); // Remove any existing commas
                                        if (/^\d*\.?\d*$/.test(value)) { // Ensure it's a valid number
                                            setChiTietDonNhap({ ...chiTietDonNhap, giaNhap: value });
                                        }
                                    }}
                                />


                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={mode === 'edit'}
                                    required
                                    fullWidth
                                    label="Số Lượng"
                                    type="number"
                                    value={chiTietDonNhap?.soLuong || ''}
                                    onChange={(e) => setChiTietDonNhap({ ...chiTietDonNhap, soLuong: e.target.value })}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {chiTietDonNhap?.sanPham?.donViTinh}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Autocomplete
                                    disabled={mode === 'edit'}
                                    value={chiTietDonNhap?.nhaCungCap || null}
                                    options={danhSachNhaCungCap}
                                    getOptionLabel={(option) => option.tenNhaCungCap}
                                    renderInput={(params) => <TextField {...params} label="Nhà Cung Cấp" />}
                                    onChange={(e, value) => setChiTietDonNhap({ ...chiTietDonNhap, nhaCungCap: value })}
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ paddingTop: '20px', fontSize: '20px' }}><b>Thành Tiền:</b> {(chiTietDonNhap?.thanhTien || 0).toLocaleString('vi-VN')}₫</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    disabled={mode === 'edit'}
                                    fullWidth
                                    label="Ghi chú sản phẩm nhập"
                                    multiline
                                    rows={2}
                                    value={chiTietDonNhap?.ghiChu || ''}
                                    onChange={(e) => setChiTietDonNhap({ ...chiTietDonNhap, ghiChu: e.target.value })}
                                />
                            </Grid>

                            {mode !== 'edit' && (
                                <Grid item xs={12}>
                                    <Button variant='contained' fullWidth onClick={handleAddSanPham} >Thêm sản phẩm vào phiếu nhập</Button>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TableContainer component={Paper} sx={{
                                    height: '600px',
                                    overflowY: 'auto', overflow: 'auto'
                                }} >
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Sản Phẩm</TableCell>
                                                <TableCell>Số Lượng</TableCell>
                                                <TableCell>Đơn vị tính</TableCell>
                                                <TableCell>Giá Nhập</TableCell>
                                                <TableCell>Thành Tiền</TableCell>
                                                <TableCell>Nhà Cung Cấp</TableCell>
                                                <TableCell>Ghi chú</TableCell>
                                                {mode !== 'edit' && (
                                                    <TableCell>Thao tác</TableCell>
                                                )}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {formData?.danhSachSanPham?.map((row, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{
                                                        cursor: 'pointer',
                                                        ':hover': {
                                                            backgroundColor: '#f1f1f1',
                                                        },
                                                        border: chiTietDonNhap?.sanPham === row?.sanPham ? 2 : '',
                                                        boxSizing: 'border-box',
                                                    }}
                                                    onClick={() => {
                                                        {
                                                            if (mode == 'edit') {
                                                                setChiTietDonNhap({
                                                                    ...row,
                                                                });
                                                                setDanhMucSelected(row?.sanPham?.danhMuc);
                                                                
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row?.sanPham?.tenSanPham}
                                                    </TableCell>
                                                    <TableCell>{row?.soLuong}</TableCell>
                                                    <TableCell>{row?.sanPham?.donViTinh}</TableCell>
                                                    <TableCell>{(parseFloat(row?.giaNhap) || 0).toLocaleString('vi-VN')}₫/{row?.sanPham?.donViTinh}</TableCell>
                                                    <TableCell>{(row?.thanhTien || 0).toLocaleString('vi-VN')}₫</TableCell>
                                                    <TableCell>{row?.nhaCungCap?.tenNhaCungCap}</TableCell>
                                                    <TableCell>{row?.ghiChu}</TableCell>
                                                    {mode !== 'edit' && (
                                                        <TableCell>
                                                            <Tooltip title="Xóa">
                                                                <DeleteForeverIcon
                                                                    onClick={() => handleRemoveSanPham(index)}
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        ':hover': {
                                                                            color: 'red',
                                                                        }
                                                                    }} />
                                                            </Tooltip>
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={mode === 'edit'}
                                    fullWidth
                                    label="Ghi chú phiếu nhập"
                                    multiline
                                    rows={2}
                                    value={formData?.ghiChu || ''}
                                    onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ paddingTop: '20px', fontSize: '25px' }}><b>Tổng Tiền:</b> {(formData?.tongTien || 0).toLocaleString('vi-VN')}₫</Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" variant='outlined'>
                    Đóng
                </Button>
                {mode !== 'edit' && (
                    <Button variant='contained' onClick={handleSubmit} color="primary">
                        Thêm Đơn Nhập
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
