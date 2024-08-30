import React, { useContext, useEffect, useState } from "react";
import { APIDanhSachSanPham, APIXoaSanPham } from "../../../utils/sanPhamUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import ChiTietSanPham from ".././ChiTietSanPham";
import { APIDanhSachDanhMuc } from "../../../utils/danhMucUtils";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../../../context/AuthProvider";

export default function QuanLySanPham() {
  const { setNotifyOpen, setNotificationMessage, setNotificationSeverity } =
    useContext(AuthContext);
  const [sanPham, setSanPham] = useState([]);
  const [danhMuc, setDanhMuc] = useState([]);
  const [selectDanhMuc, setSelectDanhMuc] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("view");
  const [selectedSanPham, setSelectedSanPham] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State to control the confirm dialog
  const [idToDelete, setIdToDelete] = useState(null); // State to store the ID of the product to delete
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(8); // Rows per page

  const fetchData = async () => {
    const dataSP = await APIDanhSachSanPham();
    setSanPham(dataSP);
    const dataDM = await APIDanhSachDanhMuc();
    setDanhMuc(dataDM.sort((a, b) => b.soLuongSanPham - a.soLuongSanPham));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!open) {
      fetchData();
    }
  }, [open]);

  const handleClickOpen = (sanPham, mode) => {
    setSelectedSanPham(sanPham);
    setMode(mode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSanPham(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedSanPham = [...sanPham].sort((a, b) => {
    let comparison = 0;
    if (orderBy === "giaSanPham" || orderBy === "soLuong") {
      comparison = a[orderBy] - b[orderBy];
    } else {
      comparison = a[orderBy]?.localeCompare(b[orderBy]);
    }
    return order === "asc" ? comparison : -comparison;
  });

  const filteredSanPham = sortedSanPham.filter((sp) => {
    const matchesCategory = selectDanhMuc
      ? sp.danhMuc.id === selectDanhMuc
      : true;
    const matchesSearch = sp.maSanPham
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async () => {
    if (idToDelete) {
      const response = await APIXoaSanPham(idToDelete);
      if (response) {
        setNotifyOpen(true);
        setNotificationMessage("Xóa sản phẩm thành công");
        setNotificationSeverity("success");
        fetchData();
      } else {
        setNotifyOpen(true);
        setNotificationMessage("Xóa sản phẩm thất bại");
        setNotificationSeverity("error");
      }
      setOpenConfirmDialog(false); // Close the confirm dialog after deletion
      setIdToDelete(null); // Clear the ID after deletion
    }
  };

  const handleOpenConfirmDialog = (id) => {
    setIdToDelete(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setIdToDelete(null);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const paginatedSanPham = filteredSanPham.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Typography variant="h5">Quản Lý Sản Phẩm</Typography>
        <Box sx={{ gap: 2, display: "flex" }}>
          <TextField
            label="Tìm kiếm mã sản phẩm"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ width: "300px" }} size="small">
            <InputLabel>Lọc theo danh mục</InputLabel>
            <Select
              label="Lọc theo danh mục"
              value={selectDanhMuc}
              onChange={(e) => setSelectDanhMuc(e.target.value)}
            >
              <MenuItem value={null}>Tất cả</MenuItem>
              {danhMuc.map((dm) => (
                <MenuItem key={dm.id} value={dm.id}>
                  {dm?.tenDanhMuc} ({dm.soLuongSanPham}){" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="info"
            onClick={() => handleClickOpen({}, "add")}
          >
            Thêm sản phẩm
          </Button>
        </Box>
      </Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <CircularProgress />{" "}
          {/* Display loading spinner while fetching data */}
        </Box>
      ) : (
        <>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sortDirection={orderBy === "maSanPham" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "maSanPham"}
                  direction={orderBy === "maSanPham" ? order : "asc"}
                  onClick={() => handleRequestSort("maSanPham")}
                >
                  Mã Sản Phẩm
                </TableSortLabel>
              </TableCell>
              <TableCell>Hình Ảnh</TableCell>
              <TableCell
                sortDirection={orderBy === "tenSanPham" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "tenSanPham"}
                  direction={orderBy === "tenSanPham" ? order : "asc"}
                  onClick={() => handleRequestSort("tenSanPham")}
                >
                  Tên Sản Phẩm
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === "giaSanPham" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "giaSanPham"}
                  direction={orderBy === "giaSanPham" ? order : "asc"}
                  onClick={() => handleRequestSort("giaSanPham")}
                >
                  Giá Sản Phẩm
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "soLuong" ? order : false}>
                <TableSortLabel
                  active={orderBy === "soLuong"}
                  direction={orderBy === "soLuong" ? order : "asc"}
                  onClick={() => handleRequestSort("soLuong")}
                >
                  Số lượng
                </TableSortLabel>
              </TableCell>

              <TableCell
                sortDirection={orderBy === "donViTinh" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "donViTinh"}
                  direction={orderBy === "donViTinh" ? order : "asc"}
                  onClick={() => handleRequestSort("donViTinh")}
                >
                  Đơn vị tính
                </TableSortLabel>
              </TableCell>
              <TableCell>Danh Mục</TableCell>
              <TableCell
                sortDirection={orderBy === "trangThai" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "trangThai"}
                  direction={orderBy === "trangThai" ? order : "asc"}
                  onClick={() => handleRequestSort("trangThai")}
                >
                  Trạng Thái
                </TableSortLabel>
              </TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSanPham.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleClickOpen(row, "edit")}
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell>{row.maSanPham}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    sx={{
                      width: 30,
                    }}
                    alt={row.tenSanPham}
                    src={row.hinhAnh}
                  />
                </TableCell>
                <TableCell>{row.tenSanPham}</TableCell>
                <TableCell>{row?.giaSanPham?.toLocaleString()} VND</TableCell>
                <TableCell>{row.soLuong || 0}</TableCell>
                <TableCell>{row.donViTinh}</TableCell>
                <TableCell
                  sx={{
                    color: row.danhMuc.maDanhMuc === "DMXOA" ? "red" : "black",
                    fontWeight: "500",
                  }}
                >
                  {row.danhMuc?.tenDanhMuc.toUpperCase()}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      row.trangThai === "Ngừng kinh doanh" ? "red" : "green",
                    fontWeight: "500",
                  }}
                >
                  {row.trangThai}
                </TableCell>
                <TableCell>
                  {row.danhMuc.maDanhMuc !== "DMXOA" && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenConfirmDialog(row.id); // Open confirm dialog
                      }}
                    >
                      Xóa
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[8, 20, 30]} // Provide more options if needed
            component="div"
            count={filteredSanPham.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      <ChiTietSanPham
        open={open}
        onClose={handleClose}
        mode={mode}
        sanPham={selectedSanPham}
      />

      {/* Confirm Delete Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận xóa sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn
            tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
