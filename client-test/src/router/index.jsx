import { createBrowserRouter, Outlet } from "react-router-dom";
import DangNhap from "../pages/DangNhap";
import TrangChu from "../pages/TrangChu";
import Header from "../components/Header";
import AuthProvider from "../context/AuthProvider";


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
            }
        ]
    }
  ]
);