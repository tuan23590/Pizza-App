import { createBrowserRouter, Outlet } from "react-router-dom";
import DangNhap from "../pages/DangNhap";
import TrangChu from "../pages/TrangChu";
import Header from "../components/Header";
import AuthProvider from "../context/AuthProvider";
import DatHang from "../pages/DatHang";
import DanhSachSanPham from "../components/DatHang/DanhSachSanPham";
import { APIDanhSachSanPhamTheoMaDanhMucNguoiDung } from "../utils/sanPhamUtils";
import QuanLy from './../pages/QuanLy';
import ThanhToan from "../pages/ThanhToan";
import TheoDoiDonHang from "../pages/TheoDoiDonHang";
import QuanlyDonHang from "../components/QuanLy/QuanlyDonHang";
import GioHangProvider from "../context/GioHangProvider";
import DiaChi from "../components/TrangChu/DiaChi";
import QuanLyHangHoa from './../components/QuanLy/QuanLyHangHoa/QuanLyHangHoa';
import QuanLyPhieuNhap from "../components/QuanLy/QuanLyPhieuNhap/QuanLyPhieuNhap";
import Test from "../pages/Test";
import SubscriptionProvider from "../context/SubscriptionProvider";
const KhachHangProvider = () => {
    return <>
        <SubscriptionProvider>
        <AuthProvider>
            <GioHangProvider>
                <Header />
                <Outlet />
            </GioHangProvider>
        </AuthProvider>
        </SubscriptionProvider>
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
                    element: <Test />,
                    path: "/Test"
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
                            loader: APIDanhSachSanPhamTheoMaDanhMucNguoiDung
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
                            element: <QuanLyHangHoa />,
                            path: "/QuanLy/QuanLyHangHoa",

                        },
                        {
                            element: <QuanlyDonHang />,
                            path: "/QuanLy/QuanlyDonHang",

                        },
                        {
                            element: <QuanLyPhieuNhap />,
                            path: "/QuanLy/QuanLyPhieuNhap",

                        },
                    ]
                },
            ]
        }
    ]
);