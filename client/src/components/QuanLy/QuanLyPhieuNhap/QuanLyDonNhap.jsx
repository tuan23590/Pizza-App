import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import ChiTietDonNhap from "./ChiTietDonNhap"; // Assuming this component handles displaying and editing details of DonNhap
import { APIDanhSachDonNhap } from "../../../utils/donNhapUtils"; // Adjust the import path and utility function as needed
import { FOMATDATE } from "../../../function";

export default function QuanLyDonNhap() {
  const [openDialog, setOpenDialog] = useState(false);
  const [danhSachDonNhap, setDanhSachDonNhap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("add"); // add or edit
  const [selectedDonNhap, setSelectedDonNhap] = useState(null);

  const fetchData = async () => {
    const data = await APIDanhSachDonNhap();
    setDanhSachDonNhap(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [openDialog]);

  const handleOpenDialog = (mode, donNhap = null) => {
    setMode(mode);
    setSelectedDonNhap(donNhap);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDonNhap(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" p={"20px"}>
            Quản Lý Đơn Nhập
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "20px" }}
            onClick={(e) => {
              e.currentTarget.blur();
              handleOpenDialog("add")}}
          >
            Thêm Đơn Nhập
          </Button>
        </Box>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã Đơn Nhập</TableCell>
                <TableCell>Ngày Nhập</TableCell>
                <TableCell>Nhà Cung Cấp</TableCell>
                <TableCell>Tổng Tiền</TableCell>
                <TableCell>Sản Phẩm</TableCell>
                <TableCell>Ghi Chú</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {danhSachDonNhap.map((donNhap) => (
                <TableRow
                  key={donNhap.id}
                  onClick={() => handleOpenDialog("edit", donNhap)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>{donNhap.maDonNhap}</TableCell>
                  <TableCell>{FOMATDATE(donNhap.ngayNhap)}</TableCell>
                  <TableCell>
                    {[
                      ...new Set(
                        donNhap.chiTietDonNhap.map(
                          (chiTietDonNhap) =>
                            chiTietDonNhap.nhaCungCap.tenNhaCungCap
                        )
                      ),
                    ].join(", ")}
                  </TableCell>

                  <TableCell>
                    {donNhap.tongTien.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const maxLength = 50;
                      const tenSanPhams = donNhap.chiTietDonNhap
                        .map(
                          (chiTietDonNhap) => chiTietDonNhap.sanPham?.tenSanPham
                        )
                        .join(", ");

                      if (tenSanPhams.length > maxLength) {
                        return `${tenSanPhams.substring(0, maxLength)}...`;
                      }
                      return tenSanPhams;
                    })()}
                  </TableCell>

                  <TableCell>{donNhap.ghiChu}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <ChiTietDonNhap
        open={openDialog}
        onClose={handleCloseDialog}
        mode={mode}
        donNhap={selectedDonNhap}
      />
    </>
  );
}
