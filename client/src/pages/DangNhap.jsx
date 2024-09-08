import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function DangNhap() {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [rePassWord, setRePassWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegister, setIsRegister] = useState(false); // Track mode (login/register)
  const navigate = useNavigate();

  const xuLyDangNhapVoiGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      setError("Đăng nhập với Google thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const xuLyDangNhapVoiEmail = async () => {
    const auth = getAuth();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, passWord);
      navigate("/");
    } catch (error) {
      setError("Đăng nhập thất bại, vui lòng kiểm tra lại!");
    } finally {
      setLoading(false);
    }
  };

  const xuLyDangKy = async () => {
    const auth = getAuth();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, passWord);
      navigate("/");
    } catch (error) {
      setError("Đăng ký thất bại, vui lòng kiểm tra lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{
      width: 400,
    }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          margin: "20px 0",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        {isRegister ? "Đăng ký" : "Đăng nhập"}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          autoFocus
          color="success"
          sx={{ marginBottom: 1 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Mật khẩu"
          type="password"
          variant="outlined"
          color="success"
          sx={{ marginBottom: 1 }}
          fullWidth
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        />
        {isRegister && (
          <TextField
            label="Nhập lại mật khẩu"
            type="password"
            variant="outlined"
            color="success"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={rePassWord}
            onChange={(e) => setRePassWord(e.target.value)}
          />
        )}
      </Box>
      <Typography
        fullWidth
        sx={{ textAlign: "right", cursor: "pointer" , color: "blue" }}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Đã có tài khoản? Đăng nhập"
          : "Chưa có tài khoản? Đăng ký"}
      </Typography>
      {isRegister ? (
        <Button
          variant="contained"
          fullWidth
          color="success"
          onClick={xuLyDangKy}
          disabled={loading}
          sx={{ marginBottom: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Đăng ký"}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={xuLyDangNhapVoiEmail}
          disabled={loading}
          sx={{ marginBottom: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Đăng nhập"}
        </Button>
      )}
      <Button
        variant="outlined"
        color="success"
        fullWidth
        onClick={xuLyDangNhapVoiGoogle}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Đăng Nhập với Google"}
      </Button>
    </Container>
  );
}
