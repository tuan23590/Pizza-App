import { Badge, Box, Button, Container, Divider, FormControl, FormControlLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import { useNavigate } from 'react-router-dom';
import { APIThemDonHang } from '../utils/donHangUtils';
import { GioHangContext } from '../context/GioHangProvider';

export default function ThanhToan() {
    const {gioHang} = useContext(GioHangContext)
    const tongTien = gioHang?.reduce((tongTien, sanPham) => tongTien + sanPham.soLuong * (sanPham.gia + ((sanPham.kichThuocBanh?.giaKichThuoc) ?? 0) + ((sanPham.loaiDe?.giaLoaiDe) ?? 0)), 0)
    const navigate = useNavigate();
    const formData = {
        tenKhachHang: '',
        soDienThoai: '',
        email: '',
        gioHang: JSON.stringify(gioHang),
        phuongThucThanhToan: 'cash',
        diaChiGiaoHang: 'Hồ Gươm Plaza, 110 Trần Phú, quận Hà Đông, TP. Hà Nội',
        thoiGianGiao: Date.now().toString(),
        tongTien: parseFloat(tongTien),
        tamTinh: parseFloat(tongTien),
        giamGia : 0.0
    }
    const handleChange = (e) => {
        formData[e.target.name] = e.target.value;
    }
    const handleThanhToan = async () => {
        const data = await APIThemDonHang(formData);
        console.log(data);
        if (data) {
            localStorage.setItem('gioHang', JSON.stringify([]));
            alert('Đặt hàng thành công');
            navigate('/');
        }
    }
    return (
        <>
            <Typography fullWidth variant='h5' py={5} sx={{ textAlign: 'center' }}>THANH TOÁN</Typography>
            <Box sx={{ marginX: 'auto', width: '33%' }}>
                <Paper sx={{ padding: '20px', marginY: '15px' }} elevation={3} >
                    <Box display={'flex'} justifyContent={'space-between'} sx={{ cursor: 'pointer' }} onClick={() => { navigate('/DatHang') }}>
                        <Box display={'flex'} alignItems="center">
                            <Badge badgeContent={gioHang.length} color="error">
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

                            <Typography sx={{ marginLeft: '10px' }}>Mua mang về: <b>Hồ Gươm Plaza, 110 Trần Phú, quận Hà Đông, TP. Hà Nội</b></Typography>
                        </Box>
                        <Typography color={'green'}>Thay đổi</Typography>
                    </Box>

                    <Divider sx={{ marginY: '20px' }} />
                    <Box display={'flex'} gap={1} >
                        <Box display={'flex'} alignItems="center">

                            <AccessAlarmOutlinedIcon />

                            <Typography sx={{ marginLeft: '10px' }}>Giao vào lúc: </Typography>
                        </Box>
                        <Typography color={'green'}>Hôm nay 10:00</Typography>
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
                        <RadioGroup onChange={handleChange} name='phuongThucThanhToan' value={formData.phuongThucThanhToan}>
                            <FormControlLabel value="cash" control={<Radio />} label={
                                <Box display={'flex'} alignItems={'center'} border={1} borderColor={'green'} borderRadius={2} p={2} my={1} width={'550px'}>
                                    <Box component={'img'} sx={{ width: '40px' }} src='https://cdn.pizzahut.vn/images/Web_V3/Payment/cash.png' />
                                    <Typography sx={{ marginX: '10px' }}>Thanh toán bằng tiền mặt</Typography>
                                </Box>
                            } />
                            <FormControlLabel value="momo" control={<Radio />} label={
                                <Box display={'flex'} alignItems={'center'} border={1} borderColor={'green'} borderRadius={2} p={2} my={1} width={'550px'}>
                                    <Box component={'img'} sx={{ width: '40px' }} src='https://cdn.pizzahut.vn/images/Web_V3/Payment/momo.png' />
                                    <Typography sx={{ marginX: '10px' }}>Thanh toán Momo</Typography>
                                </Box>
                            } />
                        </RadioGroup>
                    </FormControl>
                    <Button fullWidth variant='contained' color='success' onClick={handleThanhToan}>
                        Đặt hàng {tongTien.toLocaleString('vi-VN')} ₫
                    </Button>
                </Paper>
            </Box>
        </>
    )
}
