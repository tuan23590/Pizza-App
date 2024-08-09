import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { APIDonHangTheoMaDonHangHoacSoDienThoai } from '../utils/donHangUtils'

export default function TheoDoiDonHang() {
    const [duLieuTimKiem, setDuLieuTimKiem] = useState('')
    const [danhSachDonHang, setDanhSachDonHang] = useState([])
    const [error, setError] = useState('')

    const handleSearch = async () => {
        // Kiểm tra nếu `duLieuTimKiem` trống
        if (!duLieuTimKiem.trim()) {
            setError('Vui lòng nhập số điện thoại hoặc mã đơn hàng.')
            return
        }

        // Xóa thông báo lỗi nếu có
        setError('')

        // Gọi API để tìm kiếm
        const data = await APIDonHangTheoMaDonHangHoacSoDienThoai({ duLieuTimKiem })
        console.log(data)
        setDanhSachDonHang(data)
    }

    const handleChange = (e) => {
        setDuLieuTimKiem(e.target.value)
        // Xóa thông báo lỗi khi người dùng nhập lại
        setError('')
    }

    return (
        <>
            <Typography fullWidth variant='h5' py={5} sx={{ textAlign: 'center' }}>THEO DÕI ĐƠN HÀNG</Typography>
            <Box sx={{ marginX: 'auto', width: '33%' }}>
                <Paper sx={{ padding: '20px' }} elevation={3}>
                    <TextField
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
                </Paper>
            </Box>
            {danhSachDonHang.length > 0 && (
                <Box sx={{ marginX: 'auto', width: '33%' }}>
                    <Typography fullWidth variant='h5' py={5} sx={{ textAlign: 'center' }}>KẾT QUẢ TÌM KIẾM</Typography>
                    <Paper sx={{ padding: '20px' }} elevation={3}>
                        {danhSachDonHang.map((donHang, index) => (
                            <Box key={index} sx={{ marginBottom: '20px' }}>
                                <Typography variant='h6'>Mã đơn hàng: {donHang.maDonHang}</Typography>
                                <Typography variant='h6'>Ngày đặt hàng: {donHang.ngayDatHang}</Typography>
                                <Typography variant='h6'>Trạng thái: {donHang.trangThai}</Typography>
                                <Typography variant='h6'>Tổng tiền: {donHang.tongTien}</Typography>
                            </Box>
                        ))}
                    </Paper>
                </Box>
            )}
        </>
    )
}
