import React, { useEffect, useState } from 'react'
import { APICapNhatTrangThaiDonHang, APIDanhSachDonHang } from '../../utils/donHangUtils';
import { MenuItem, Paper, Select, Table, TableBody,Box, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Typography } from '@mui/material';
import ChiTietDonHang from './ChiTietDonHang';

export default function QuanlyDonHang() {
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const fetctData = async () => {
        const data = await APIDanhSachDonHang();
        setDanhSachDonHang(data);
        setLoading(false)
    }
    useEffect(() => {
        fetctData(); 
    }, [])
    
    const fomatDate = (date) => {
        const d = new Date(parseFloat(date));

        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
        const year = d.getFullYear();

        return `${hours}:${minutes} ${day}/${month}/${year}`;
    }
    const handleOpenDialog = (order) => {
        setSelectedOrder(order)
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const handleChange = async (e,donHang) => {
        const data = await APICapNhatTrangThaiDonHang({maDonHang: donHang.maDonHang, trangThai: e.target.value})
        console.log(data)
        if(data){
            fetctData();
        }else{
            alert('Cập nhật thất bại')
        }
    }
  return (
    <>
        <TableContainer component={Paper}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" p={'20px'}>
          Quản Lý Đơn Hàng
        </Typography>
      </Box>
        {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Ngày đặt hàng</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Phương thức thanh toán</TableCell>
                <TableCell>Trạng thái</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {danhSachDonHang.map((donHang) => (
                <TableRow key={donHang.maDonHang} sx={{ cursor: 'pointer', ':hover': {
                    backgroundColor: '#f5f5f5'
                }}} onClick={()=>{
                    handleOpenDialog(donHang)
                    setSelectedOrder(donHang)
                }}>
                <TableCell>{donHang.maDonHang}</TableCell>
                <TableCell>{donHang.tenKhachHang}</TableCell>
                <TableCell>{donHang.soDienThoai}</TableCell>
                <TableCell>{fomatDate(donHang.ngayDatHang)}</TableCell>
                <TableCell>{donHang.tongTien.toLocaleString('vi-VN')}₫</TableCell>
                <TableCell>{donHang.phuongThucThanhToan}</TableCell>
                <TableCell>
                    <Select 
                    value={donHang.trangThai}
                    sx = {{
                        height: '25px',
                        fontSize: '14px'
                    }}
                    onChange={(e)=>handleChange(e, donHang)}
                    onClick={(e)=>{
                        e.stopPropagation();
                    }}
                    >
                        <MenuItem value={"Đang xử lý"}>Đang xử lý</MenuItem>
                        <MenuItem value={"Đang giao hàng"}>Đang giao hàng</MenuItem>
                        <MenuItem value={"Đã giao hàng"}>Đã giao hàng</MenuItem>
                        <MenuItem value={"Đã hủy"}>Đã hủy</MenuItem>
                    </Select>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
      )}
    </TableContainer>
    <ChiTietDonHang openDialog={openDialog} handleCloseDialog={handleCloseDialog} selectedOrder={selectedOrder} />
        </>
  )
}
