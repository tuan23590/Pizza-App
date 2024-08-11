import { createBrowserRouter, Outlet } from "react-router-dom";
import DangNhap from "../pages/DangNhap";
import TrangChu from "../pages/TrangChu";
import Header from "../components/Header";
import AuthProvider from "../context/AuthProvider";
import DatHang from "../pages/DatHang";
import DanhSachSanPham from "../components/DatHang/DanhSachSanPham";
import { APIDanhSachSanPhamTheoMaDanhMuc } from "../utils/sanPhamUtils";
import QuanLy from './../pages/QuanLy';
import QuanLySanPham from "../components/QuanLy/QuanLySanPham";
import ThanhToan from "../pages/ThanhToan";
import TheoDoiDonHang from "../pages/TheoDoiDonHang";
import QuanlyDonHang from "../components/QuanLy/QuanlyDonHang";
import GioHangProvider from "../context/GioHangProvider";
import DiaChi from "../components/TrangChu/DiaChi";
const KhachHangProvider = () => {
    return <>
        <AuthProvider>
            <GioHangProvider>
                <Header />
                <Outlet />
            </GioHangProvider>
        </AuthProvider>
    </>
}

export default createBrowserRouter(
    [
        {
            element: <KhachHangProvider />,
            children: [
                {
                    element: <DangNhap />,
                    path: "/DangNhap"
                },
                {
                    element: <TrangChu />,
                    path: "/"
                },

                {
                    element: <TheoDoiDonHang />,
                    path: "/TheoDoiDonHang"
                },
                {
                    element: <DatHang />,
                    path: "/DatHang",
                    children: [
                        {
                            element: <DanhSachSanPham />,
                            path: "/DatHang/:maDanhMuc",
                            loader: APIDanhSachSanPhamTheoMaDanhMuc
                        },

                    ]
                },
                {
                    element: <ThanhToan />,
                    path: "/ThanhToan"
                },
                {
                    element: <DiaChi />,
                }
                ,
                {
                    element: <QuanLy />,
                    path: "/QuanLy",
                    children: [
                        {
                            element: <QuanLySanPham />,
                            path: "/QuanLy/QuanLySanPham",

                        },
                        {
                            element: <QuanlyDonHang />,
                            path: "/QuanLy/QuanlyDonHang",

                        },
                    ]
                },
            ]
        }
    ]
);