import { Badge, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import { useNavigate } from 'react-router-dom';
import { APIThemDonHang } from '../utils/donHangUtils';
import { GioHangContext } from '../context/GioHangProvider';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function ThanhToan() {
    const { gioHang, setGioHang } = useContext(GioHangContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [ngaySelected, setNgaySelected] = useState('Hôm nay');
    const [gioSelected, setGioSelected] = useState('');
    const [danhSachGio, setDanhSachGio] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGioHang((prevGioHang) => ({
            ...prevGioHang,
            [name]: value
        }));
    }

    const handleThanhToan = async () => {
        setLoading(true);
        const data = await APIThemDonHang(gioHang);
        setLoading(false);
        if (data) {
            localStorage.setItem('gioHang', JSON.stringify([]));
            setSuccessDialogOpen(true);
        }
    }

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleDialogConform = () => {
        if (ngaySelected === 'Càng sớm càng tốt') {
            setGioHang((prevGioHang) => ({
                ...prevGioHang,
                thoiGianGiaoHang: 'Càng sớm càng tốt'
            }));
        } else {
            setGioHang((prevGioHang) => ({
                ...prevGioHang,
                thoiGianGiaoHang: new Date().setHours(parseInt(gioSelected.split(':')[0]), parseInt(gioSelected.split(':')[1]), 0, 0)
            }));
        }
        setOpen(false);
    };

    useEffect(() => {
        if (ngaySelected === 'Hôm nay') {
            const date = new Date();
            const hour = date.getHours() + 2;
            const minute = date.getMinutes();
            const danhSachGio = [];
            const startHour = 7;
            const endHour = 21;

            for (let i = Math.max(hour, startHour); i <= endHour; i++) {
                for (let j = 0; j < 60; j += 15) {
                    if (i === hour && j < minute) {
                        continue;
                    }
                    const formattedTime = `${i}:${j.toString().padStart(2, '0')}`;
                    danhSachGio.push(formattedTime);
                }
            }
            setDanhSachGio(danhSachGio);
            setGioSelected(danhSachGio[0]);
        } else {
            setDanhSachGio([]);
        }
    }, [ngaySelected]);

    return (
        <>
        {/* tạo đối tượng chp hiệu ứng loading toàn màng hình */}
            {loading && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 9999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <CircularProgress color='success' />
                </Box>
            )}
            <Typography fullWidth variant='h5' py={5} sx={{ textAlign: 'center' }}>THANH TOÁN</Typography>
            <Box sx={{ marginX: 'auto', width: '33%' }}>
                <Paper sx={{ padding: '20px', marginY: '15px' }} elevation={3} >
                    <Box display={'flex'} justifyContent={'space-between'} sx={{ cursor: 'pointer' }} onClick={() => { navigate('/DatHang') }}>
                        <Box display={'flex'} alignItems="center">
                            <Badge badgeContent={gioHang.danhSachSanPham.length} color="error">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                            <Typography sx={{ marginLeft: '10px' }}>Xem chi tiết giỏ hàng của bạn</Typography>
                        </Box>
                        <KeyboardArrowRightIcon sx={{ color: 'green' }} />
                    </Box>

                    <Divider sx={{ marginY: '20px' }} />
                    <Box display={'flex'} justifyContent={'space-between'} >
                        <Box display={'flex'} alignItems="center">
                            <LocationOnOutlinedIcon />
                            <Typography sx={{ marginLeft: '10px' }}>Giao hàng tận nơi: <b>{gioHang.diaChiGiaoHang}</b></Typography>
                        </Box>
                        <Typography color={'green'}>Thay đổi</Typography>
                    </Box>
                    <TextField name='ghiChuDiaChi' onChange={handleChange} size='small' fullWidth label="Ghi chú địa chỉ" variant="outlined" sx={{ marginTop: '20px' }} />
                    <Divider sx={{ marginY: '20px' }} />
                    <Box display={'flex'} gap={1} >
                        <Box display={'flex'} alignItems="center">
                            <AccessAlarmOutlinedIcon />
                            <Typography sx={{ marginLeft: '10px' }}>Giao vào lúc: </Typography>
                        </Box>
                        <Typography color={'green'} onClick={handleDialogOpen} sx={{ cursor: 'pointer' }}>
                            {gioHang.thoiGianGiaoHang === 'Càng sớm càng tốt' ? 'Càng sớm càng tốt' : 'Hôm nay ' + new Date(gioHang.thoiGianGiaoHang).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                    </Box>
                </Paper>
                <Paper sx={{ padding: '20px', marginY: '15px' }} elevation={3} >
                    <Typography fullWidth variant='h6' sx={{ textAlign: 'center' }}>Thông tin đặt hàng</Typography>
                    <TextField autoFocus name='tenKhachHang' onChange={handleChange} size='small' fullWidth label="Họ và tên" variant="outlined" sx={{ marginY: '10px' }} />
                    <TextField name='soDienThoai' onChange={handleChange} size='small' fullWidth label="Số điện thoại" variant="outlined" sx={{ marginY: '10px' }} />
                    <TextField name='email' onChange={handleChange} size='small' fullWidth label="Email" variant="outlined" sx={{ marginY: '10px' }} />
                </Paper>
                <Paper sx={{ padding: '20px', marginY: '15px' }} elevation={3} >
                    <Typography fullWidth variant='h6' sx={{ textAlign: 'center' }}>Phương thức thanh toán</Typography>
                    <FormControl sx={{ marginY: '20px' }}>
                        <RadioGroup onChange={handleChange} name='phuongThucThanhToan' value={gioHang.phuongThucThanhToan}>
                            <FormControlLabel value="Tiền mặt" control={<Radio />} label={
                                <Box display={'flex'} alignItems={'center'} border={1} borderColor={'green'} borderRadius={2} p={2} my={1} width={'550px'}>
                                    <Box component={'img'} sx={{ width: '40px' }} src='https://cdn.pizzahut.vn/images/Web_V3/Payment/cash.png' />
                                    <Typography sx={{ marginX: '10px' }}>Thanh toán bằng tiền mặt</Typography>
                                </Box>
                            } />
                            <FormControlLabel value="Momo" control={<Radio />} label={
                                <Box display={'flex'} alignItems={'center'} border={1} borderColor={'green'} borderRadius={2} p={2} my={1} width={'550px'}>
                                    <Box component={'img'} sx={{ width: '40px' }} src='https://cdn.pizzahut.vn/images/Web_V3/Payment/momo.png' />
                                    <Typography sx={{ marginX: '10px' }}>Thanh toán Momo</Typography>
                                </Box>
                            } />
                        </RadioGroup>
                    </FormControl>
                    <Button fullWidth variant='contained' color='success' onClick={handleThanhToan}>
                        Đặt hàng {gioHang.tongTien.toLocaleString('vi-VN')} ₫
                    </Button>
                </Paper>
            </Box>

            {/* Dialog for selecting delivery time */}
            <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth='xs' >
                <DialogTitle>Chọn thời gian giao hàng</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ marginTop: 2 }}>
                        <InputLabel>Chọn ngày</InputLabel>
                        <Select
                            label="Chọn ngày"
                            value={ngaySelected}
                            onChange={(e) => setNgaySelected(e.target.value)}
                        >
                            <MenuItem value="Hôm nay">Hôm nay</MenuItem>
                            <MenuItem value="Càng sớm càng tốt">Càng sớm càng tốt</MenuItem>
                        </Select>
                    </FormControl>
                    {ngaySelected !== 'Càng sớm càng tốt' && (
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <InputLabel>Chọn giờ</InputLabel>
                            <Select
                                label="Chọn giờ"
                                value={gioSelected}
                                onChange={(e) => setGioSelected(e.target.value)}
                            >
                                {danhSachGio.map(gio => (
                                    <MenuItem key={gio} value={gio}>{gio}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleDialogClose}>Đóng</Button>
                    <Button variant='contained' onClick={handleDialogConform}>Xác nhận</Button>
                </DialogActions>
            </Dialog>

            {/* Success Dialog */}
            <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)} fullWidth maxWidth='xs'>
                <DialogTitle>Đặt hàng thành công!</DialogTitle>
                <DialogContent>
                    <Box display='flex' justifyContent='center'>
                        <CheckCircleOutlineIcon color='success' sx={{ fontSize: '100px' }} />
                    </Box>
                    <Typography>Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn sẽ được xử lý và giao hàng sớm nhất.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={() => { navigate('/') }}>Về trang chủ</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
