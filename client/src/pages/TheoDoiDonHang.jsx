import { Box, Button, Divider, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { APIDonHangTheoMaDonHangHoacSoDienThoai } from '../utils/donHangUtils'
import ChiTietDonHang from '../components/QuanLy/ChiTietDonHang'
import { AuthContext } from './../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function TheoDoiDonHang() {
    const { user } = useContext(AuthContext)
    const [danhSachDonHang, setDanhSachDonHang] = useState([])
    const [filteredDonHang, setFilteredDonHang] = useState([]); // Danh sách đơn hàng đã được lọc
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [status, setStatus] = useState('Tất cả')
    const navigate = useNavigate()

    const fomatDate = (date) => {
        const d = new Date(parseFloat(date));

        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
        const year = d.getFullYear();

        return `${hours}:${minutes} ${day}/${month}/${year}`;
    }

    const handleSearch = async () => {
        const data = await APIDonHangTheoMaDonHangHoacSoDienThoai(user.email)
        const sortedData = data.sort((a, b) => b.ngayDatHang - a.ngayDatHang);
        setDanhSachDonHang(sortedData);
        setFilteredDonHang(sortedData);
    }

    useEffect(() => {
        if (status === 'Tất cả') {
            setFilteredDonHang(danhSachDonHang);
        } else {
            const filtered = danhSachDonHang.filter(donHang => donHang.trangThai === status);
            setFilteredDonHang(filtered);
        }
    }, [status])

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/DangNhap')
            return
        }
        handleSearch()
    }, [user])

    const handleOpenDialog = (order) => {
        setSelectedOrder(order)
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <>
            <Typography fullWidth variant='h5' py={5} sx={{ textAlign: 'center' }}>THEO DÕI ĐƠN HÀNG</Typography>
            <Box sx={{ marginX: 'auto', width: '33%' }}>
                <Paper sx={{ padding: '20px' }} elevation={3}>
                    {danhSachDonHang.length > 0 && (
                        <Box sx={{ marginX: 'auto' }}>
                            <Box>
                                {['Tất cả', 'Đang xử lý', 'Đang giao hàng', 'Đã giao hàng', 'Đã hủy'].map((trangThai, index) => (
                                    <Button
                                        key={index}
                                        sx={{ margin: '5px' }}
                                        variant="contained"
                                        color={status === trangThai ? 'success' : 'inherit'}
                                        size='small'
                                        onClick={() => { setStatus(trangThai) }}
                                    >
                                        {trangThai}
                                    </Button>
                                ))}
                            </Box>
                            <Typography fullWidth py={1} sx={{ textAlign: 'center' }}>Danh sách đơn hàng</Typography>
                            <Divider />
                            <Box maxHeight={'550px'} sx={{ overflowY: 'scroll' }}>
                                {filteredDonHang.map((donHang, index) => (
                                    <Grid
                                        container
                                        spacing={1}
                                        key={index}
                                        sx={{
                                            padding: '10px', borderBottom: '1px solid #ccc', cursor: 'pointer', ':hover': {
                                                backgroundColor: '#f0f0f0'
                                            }
                                        }}
                                        onClick={() => handleOpenDialog(donHang)}
                                    >
                                        <Grid item sm={12} display={'flex'} justifyContent={'space-between'} textAlign={'center'}>
                                            <Typography variant='h6'>Mã đơn hàng: {donHang.maDonHang}</Typography>
                                            <Typography
                                                backgroundColor={donHang.trangThai === 'Đang xử lý' ? '#ff9100' : donHang.trangThai === 'Đang giao hàng' ? '#1e88e5' : donHang.trangThai === 'Đã giao hàng' ? '#0a8020' : '#e53935'}
                                                borderRadius={2}
                                                color={'white'}
                                                fontWeight={'600'}
                                                paddingX={'5px'}
                                                paddingY={'1px'}
                                                fontSize={'12px'}
                                                alignItems={'center'}
                                                display={'flex'}
                                            >{donHang.trangThai}</Typography>
                                        </Grid>
                                        <Grid item sm={6}>
                                            <Typography><b>Ngày đặt hàng:</b> {fomatDate(donHang.ngayDatHang)}</Typography>
                                        </Grid>
                                        <Grid item sm={6}>
                                            <Typography><b>Số điện thoại:</b> {donHang.soDienThoai}</Typography>
                                        </Grid>
                                        <Grid item sm={12}>
                                            <Typography><b>Địa chỉ giao hàng:</b> {donHang.diaChiGiaoHang}</Typography>
                                        </Grid>
                                        <Grid item sm={12}>
                                            <Typography><b>Thời gian giao hàng dự kiến:</b> {fomatDate(donHang.thoiGianGiaoHang)}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Box>
                        </Box>
                    )}
                    {danhSachDonHang.length == 0 && (
                        <Typography fullWidth sx={{ textAlign: 'center' }}>Không tìm thấy đơn hàng nào</Typography>
                    )}
                </Paper>
            </Box>

            <ChiTietDonHang openDialog={openDialog} handleCloseDialog={handleCloseDialog} selectedOrder={selectedOrder} />
        </>
    )
}
