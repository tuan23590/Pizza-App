import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Snackbar, Button, Alert } from "@mui/material";
import { APIThemTaiKhoan } from "../utils/taiKhoanUtils";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [taiKhoan, setTaiKhoan] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged( async (user) => {
      if (user?.uid) {
        setUser(user);
        const data = await themTaiKhoan(user);
        setTaiKhoan(data);
        localStorage.setItem("accessToken", user.accessToken);
        if(data.phanQuyen === "Quản lý"){
          navigate("/quanly");
        }else if(data.phanQuyen === "Nhân viên giao hàng"){
          navigate("/giaoHang");
        }else if(data.phanQuyen === "Nhân viên bán hàng"){
          navigate("/ThucHienDonhang");
        }
      } else {
        setUser({});
        localStorage.clear();
      }
    });
    return () => {
      unsub();
    };
  }, []);
  const themTaiKhoan = async (user) => {
    return await APIThemTaiKhoan(user);
  };
  const handleCloseNotification = () => setNotifyOpen(false);
  return (
    <AuthContext.Provider
      value={{
        user,
        taiKhoan,
        setUser,
        setNotifyOpen,
        setNotificationMessage,
        setNotificationSeverity,
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={notifyOpen}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        message={notificationMessage}
        action={
          <Button color="inherit" onClick={handleCloseNotification}>
            Đóng
          </Button>
        }
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notificationSeverity}
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
}
