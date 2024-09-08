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
import ChiTietNhaCungCap from "./ChiTietNhaCungCap";
import { APIDanhSachNhaCungCap } from "../../../utils/nhaCungCapUtils";

export default function QuanLyNhaCungCap() {
  const [openDialog, setOpenDialog] = useState(false);
  const [danhSachNhaCungCap, setDanhSachNhaCungCap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("add"); // add or edit
  const [selectedNhaCungCap, setSelectedNhaCungCap] = useState(null);

  const fetchData = async () => {
    const data = await APIDanhSachNhaCungCap();
    setDanhSachNhaCungCap(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [openDialog]);
  const handleOpenDialog = (mode, nhaCungCap = null) => {
    setMode(mode);
    setSelectedNhaCungCap(nhaCungCap);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedNhaCungCap(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" p={"20px"}>
            Quản Lý Nhà Cung Cấp
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "20px" }}
            onClick={(e) => {
              e.currentTarget.blur();
              handleOpenDialog("add");
            }}
          >
            Thêm Nhà Cung Cấp
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
                <TableCell>Mã Nhà Cung Cấp</TableCell>
                <TableCell>Tên Nhà Cung Cấp</TableCell>
                <TableCell>Số Điện Thoại</TableCell>
                <TableCell>Địa Chỉ</TableCell>
                <TableCell>Loại sản phẩm cung cấp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {danhSachNhaCungCap.map((ncc) => (
                <TableRow
                  key={ncc.id}
                  onClick={() => handleOpenDialog("edit", ncc)}
                  style={{ cursor: "pointer" }}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>{ncc.maNhaCungCap}</TableCell>
                  <TableCell>{ncc.tenNhaCungCap}</TableCell>
                  <TableCell>{ncc.soDienThoai}</TableCell>
                  <TableCell>
                    {ncc.soNhaTenDuong}{" "}
                    {JSON.parse(ncc.xaPhuong).name_with_type},{" "}
                    {JSON.parse(ncc.quanHuyen).name_with_type},{" "}
                    {JSON.parse(ncc.tinhTp).name_with_type}
                  </TableCell>
                  <TableCell>
                    {ncc.danhSachDanhMuc
                      .map((item) => item.tenDanhMuc)
                      .join(", ")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <ChiTietNhaCungCap
        open={openDialog}
        onClose={handleCloseDialog}
        mode={mode}
        nhaCungCap={selectedNhaCungCap}
      />
    </>
  );
}
