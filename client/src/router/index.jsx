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
const KhachHangProvider = () => {
    return <>
    <AuthProvider>
   <Header/>
   <Outlet/>
   </AuthProvider>
    </>
}


export default createBrowserRouter(
  [
    {
        element: <KhachHangProvider/>,
        children:[
            {
                element: <DangNhap/>,
                path: "/DangNhap"
            },
            {
                element: <TrangChu/>,
                path: "/"
            },
            {
                element: <DatHang/>,
                path: "/DatHang",
                children:[
                    {
                        element: <DanhSachSanPham/>,
                        path: "/DatHang/:maDanhMuc",
                        loader: APIDanhSachSanPhamTheoMaDanhMuc
                    },
                    
                ]
            },
            {
                element: <ThanhToan/>,
                path: "/ThanhToan"
            },
            {
                element: <TheoDoiDonHang/>,
                path: "/TheoDoiDonHang"
            },
            {
                element: <QuanLy />,
                path: "/QuanLy",
                children:[
                    {
                        element: <QuanLySanPham/>,
                        path: "/QuanLy/QuanLySanPham",
                        
                    },
                    {
                        element: <QuanlyDonHang/>,
                        path: "/QuanLy/QuanlyDonHang",
                        
                    },
                ]
            }
        ]
    }
  ]
);