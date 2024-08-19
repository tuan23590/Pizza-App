import React, { createContext, useEffect, useState } from 'react'


export const GioHangContext = createContext()

export default function GioHangProvider({ children }) {
    const [gioHang, setGioHang] = useState({
        tenKhachHang: '',
        soDienThoai: '',
        email: '',
        danhSachSanPham: [],
        phuongThucThanhToan: 'Tiền mặt',
        diaChiGiaoHang: '',
        thoiGianGiao: Date.now().toString(),
        tongTien: 0,
        tamTinh: 0,
        giamGia : 0
    });
    useEffect(() => {
        setGioHang((prevGioHang) => {
            return {
                ...prevGioHang,
                tamTinh: prevGioHang.danhSachSanPham.reduce((tongTien, sanPham) => tongTien + sanPham.soLuong * (sanPham.gia + ((sanPham.kichThuoc?.giaKichThuoc) ?? 0) + ((sanPham.loaiDe?.giaLoaiDe) ?? 0)), 0),
                tongTien: prevGioHang.danhSachSanPham.reduce((tongTien, sanPham) => tongTien + sanPham.soLuong * (sanPham.gia + ((sanPham.kichThuoc?.giaKichThuoc) ?? 0) + ((sanPham.loaiDe?.giaLoaiDe) ?? 0)), 0) - prevGioHang.giamGia,
            }
        })
    }, [gioHang.danhSachSanPham])
    return (
        <GioHangContext.Provider value={{ gioHang, setGioHang }}>
            {children}
        </GioHangContext.Provider>
    )
}
