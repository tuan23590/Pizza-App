import { Badge, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import { useNavigate } from 'react-router-dom';
import { APIThemDonHang } from '../utils/donHangUtils';
import { GioHangContext } from '../context/GioHangProvider';

export default function ThanhToan() {
    const {gioHang,setGioHang} = useContext(GioHangContext)
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGioHang((prevGioHang) => {
            return {
                ...prevGioHang,
                [name]: value
            }
        })  
    }
    const handleThanhToan = async () => {
        console.log(gioHang);
        const data = await APIThemDonHang(gioHang);
        console.log(data);
        if (data) {
            localStorage.setItem('gioHang', JSON.stringify([]));
            alert('Đặt hàng thành công');
            navigate('/');
        }
    }

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };
    return (
        <>
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
                            <Typography sx={{ marginLeft: '10px' }}>Mua mang về: <b>{gioHang.diaChiGiaoHang}</b></Typography>
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
                        <Typography color={'green'} onClick={handleDialogOpen} sx={{cursor: 'pointer'}}>Hôm nay 10:00</Typography>
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


            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Chọn thời gian giao hàng</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ marginY: 2 }}>
                        <Select value={selectedOption1} onChange={(e) => setSelectedOption1(e.target.value)} displayEmpty>
                            <MenuItem value="" disabled>Chọn thời gian</MenuItem>
                            <MenuItem value="10:00">10:00</MenuItem>
                            <MenuItem value="12:00">12:00</MenuItem>
                            <MenuItem value="14:00">14:00</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginY: 2 }}>
                        <Select value={selectedOption2} onChange={(e) => setSelectedOption2(e.target.value)} displayEmpty>
                            <MenuItem value="" disabled>Chọn thời gian</MenuItem>
                            <MenuItem value="10:00">10:00</MenuItem>
                            <MenuItem value="12:00">12:00</MenuItem>
                            <MenuItem value="14:00">14:00</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Hủy</Button>
                    <Button onClick={handleDialogClose} color="primary">Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
