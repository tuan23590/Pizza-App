import { Box, Button, Divider, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { APIDonHangTheoMaDonHangHoacSoDienThoai } from '../utils/donHangUtils'

export default function TheoDoiDonHang() {
    const [duLieuTimKiem, setDuLieuTimKiem] = useState('')
    const [danhSachDonHang, setDanhSachDonHang] = useState([])
    const [filteredDonHang, setFilteredDonHang] = useState([]); // Danh sách đơn hàng đã được lọc
    const [error, setError] = useState('')
    const [noResult, setNoResult] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [status, setStatus] = useState('Tất cả')

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
        if (!duLieuTimKiem.trim()) {
            setError('Vui lòng nhập số điện thoại hoặc mã đơn hàng.')
            return
        }
        setError('')
        setNoResult(false)

        const data = await APIDonHangTheoMaDonHangHoacSoDienThoai({ duLieuTimKiem })
        console.log(data)
        const sortedData = data.sort((a, b) => b.ngayDatHang - a.ngayDatHang);
        setDanhSachDonHang(sortedData);
        setFilteredDonHang(sortedData); // Khởi tạo với danh sách đầy đủ

        if (data.length === 0) {
            setNoResult(true)
        }
    }

   useEffect(() => {
        if (status === 'Tất cả') {
            setFilteredDonHang(danhSachDonHang);
        } else {
            const filtered = danhSachDonHang.filter(donHang => donHang.trangThai === status);
            setFilteredDonHang(filtered);
        }
   }, [status])

    const handleChange = (e) => {
        setDuLieuTimKiem(e.target.value)
        setError('')
    }

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
                    <TextField
                        name='duLieuTimKiem'
                        size='small'
                        color='success'
                        autoFocus
                        fullWidth
                        label="Nhập số điện thoại hoặc mã đơn hàng"
                        variant="outlined"
                        onChange={handleChange}
                        error={!!error}  // Hiển thị trạng thái lỗi nếu có
                        helperText={error} // Hiển thị thông báo lỗi nếu có
                    />
                    <Button fullWidth sx={{ marginTop: '20px' }} variant="contained" color='success' onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                    {noResult && (
                        <Typography fullWidth py={1} sx={{ textAlign: 'center' }}>
                            Không tìm thấy đơn hàng
                        </Typography>
                    )}
                    {danhSachDonHang.length > 0 && (
                        <Box sx={{ marginX: 'auto' }}>
                            <Box>
                                {['Tất cả','Đang xử lý', 'Đang giao hàng', 'Đã giao hàng', 'Đã hủy'].map((trangThai, index) => (
                                    <Button 
                                        key={index} 
                                        sx={{ margin: '5px' }} 
                                        variant="contained" 
                                        color={status === trangThai ? 'success' : 'inherit'} 
                                        size='small'
                                        onClick={() => {setStatus(trangThai)}}
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
                                            <Typography><b>Thời gian giao hàng dự kiến:</b> {fomatDate(donHang.thoiGianGiao)}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Paper>
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Chi tiết đơn hàng</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <Grid container spacing={1} sx={{ padding: '10px' }}>
                            <Grid item sm={12} display={'flex'} justifyContent={'space-between'} textAlign={'center'}>
                                <Typography variant='h6'>Mã đơn hàng: {selectedOrder.maDonHang}</Typography>
                                <Typography
                                    backgroundColor={selectedOrder.trangThai === 'Đang xử lý' ? '#ff9100' : selectedOrder.trangThai === 'Đang giao hàng' ? '#1e88e5' : selectedOrder.trangThai === 'Đã giao hàng' ? '#0a8020' : '#e53935'}
                                    borderRadius={2}
                                    color={'white'}
                                    fontWeight={'600'}
                                    paddingX={'5px'}
                                    paddingY={'1px'}
                                    fontSize={'12px'}
                                    alignItems={'center'}
                                    display={'flex'}
                                >{selectedOrder.trangThai}</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography><b>Ngày đặt hàng:</b> {fomatDate(selectedOrder.ngayDatHang)}</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography><b>Tên khách hàng:</b> {selectedOrder.tenKhachHang}</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography><b>Số điện thoại:</b> {selectedOrder.soDienThoai}</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography><b>Email:</b> {selectedOrder.email}</Typography>
                            </Grid>
                            <Grid item sm={12}>
                                <Typography><b>Địa chỉ giao hàng:</b> {selectedOrder.diaChiGiaoHang}</Typography>
                            </Grid>
                            <Grid item sm={12}>
                                <Typography><b>Danh sách sản phẩm:</b></Typography>
                                <Box>
                                    <Divider />
                                    {JSON.parse(selectedOrder.danhSachSanPham).map((sanPham, index) => (
                                        <Grid container spacing={1} key={index} sx={{ padding: '10px' }}>
                                            <Grid item xs={1}>
                                                <Typography><b>{index + 1}</b></Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Typography>{sanPham.tenSanPham}</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography>{sanPham.soLuong}</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography>{sanPham.donGia.toLocaleString()}₫</Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Box>
                            </Grid>
                            <Grid item sm={12}>
                                <Typography><b>Thời gian giao hàng dự kiến:</b> {fomatDate(selectedOrder.thoiGianGiao)}</Typography>
                            </Grid>
                            <Grid item sm={12}>
                                <Typography><b>Ghi chú:</b> {selectedOrder.ghiChu}</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography><b>Tạm tính:</b> {selectedOrder.tamTinh.toLocaleString()}₫</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography><b>Giảm giá:</b> {selectedOrder.giamGia.toLocaleString()}₫</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography><b>Tổng tiền:</b> {selectedOrder.tongTien.toLocaleString()}₫</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography><b>Phương thức thanh toán:</b> {selectedOrder.phuongThucThanhToan}</Typography>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Đóng</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
