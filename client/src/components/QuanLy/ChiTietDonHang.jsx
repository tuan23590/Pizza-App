import { Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Grid,
    Typography,
    Box,
    Divider } from '@mui/material'
import React from 'react'

export default function ChiTietDonHang({ openDialog, handleCloseDialog, selectedOrder }) {
    console.log(selectedOrder)
    const fomatDate = (date) => {
        const d = new Date(parseFloat(date));

        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
        const year = d.getFullYear();

        return `${hours}:${minutes} ${day}/${month}/${year}`;
    }
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
    <DialogTitle>Chi tiết đơn hàng</DialogTitle>
    <DialogContent>
        {selectedOrder && (
            <Grid container spacing={1} sx={{ padding: '10px' }}>
                <Grid item sm={12} display={'flex'} justifyContent={'space-between'} textAlign={'center'}>
                    <Typography variant='h6'>Mã đơn hàng: {selectedOrder.maDonHang}</Typography>
                    <Typography

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
                        {selectedOrder.danhSachSanPham.map((sanPham, index) => (
                            <Grid container spacing={1} key={index} sx={{ padding: '10px' }}>
                                <Grid item xs={1}>
                                    <Typography sx={{ marginRight: '5px', backgroundColor: '#e8ebe9', color: '#0a8020', paddingX: '4px', borderRadius: '2px', fontWeight: '600', textAlign: 'center' }}>{sanPham.soLuong}x</Typography>
                                </Grid>
                                <Grid item xs={11} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontWeight: '600' }}>{sanPham.tenSanPham}</Typography>
                                    <Typography sx={{ fontWeight: '600', marginRight: '2px' }}>{((sanPham.giaSanPham + ((sanPham.kichThuoc?.giaKichThuoc) ?? 0) + ((sanPham.loaiDe?.giaLoaiDe) ?? 0)) * sanPham.soLuong).toLocaleString('vi-VN')}₫</Typography>
                                </Grid>
                                {sanPham.kichThuoc && (
                                    <>
                                        <Grid item xs={1}>
                                        </Grid>
                                        <Grid item xs={11} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography sx={{ color: 'gray', marginLeft: '5px' }}>{sanPham.kichThuoc?.tenKichThuoc}</Typography>
                                            <Typography sx={{ color: 'gray', marginLeft: '5px' }}>{sanPham.kichThuoc?.giaKichThuoc.toLocaleString('vi-VN')}₫</Typography>
                                        </Grid>
                                    </>
                                )}

                                {sanPham.loaiDe && (
                                    <>
                                        <Grid item xs={1}>
                                        </Grid>
                                        <Grid item xs={11} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography sx={{ color: 'gray', marginLeft: '5px' }}>{sanPham.loaiDe?.tenLoaiDe}</Typography>
                                            <Typography sx={{ color: 'gray', marginLeft: '5px' }}>{sanPham.loaiDe?.giaLoaiDe.toLocaleString('vi-VN')}₫</Typography>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        ))}
                        <Divider />
                    </Box>
                </Grid>
                <Grid item sm={12} display={'flex'} justifyContent={'end'}>
                    <Box>
                        <Typography fullWidth textAlign={'start'} ><b>Tạm tính:</b> {selectedOrder.tamTinh.toLocaleString()}₫</Typography>
                        <Typography fullWidth textAlign={'start'} ><b>Giảm giá:</b> {selectedOrder.giamGia.toLocaleString()}₫</Typography>
                        <Typography fullWidth textAlign={'start'} ><b>Tổng tiền:</b> <span style={{ fontSize: '25px' }} >{selectedOrder.tongTien.toLocaleString()}₫</span></Typography>
                    </Box>
                </Grid>
            </Grid>
        )}
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">Đóng</Button>
    </DialogActions>
</Dialog>
  )
}
