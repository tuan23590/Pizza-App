import React, { useState } from "react";
import BarChartCustom from "../../BarChartCustom";
import { Paper, Box, Typography, Select, MenuItem } from "@mui/material";

export default function BieuDoCot() {
  const [danhMuc, setDanhMuc] = useState('Pizza');
  const [thoiGian, setThoiGian] = useState('7 ngày');

  return (
    <Paper sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Danh thu theo sản phẩm</Typography>
        <Box>
        <Select
          sx={{ width: 200,mx:1 }}
          size="small"
          value={danhMuc}
          onChange={(e) => setDanhMuc(e.target.value)}
        >
          <MenuItem value="Pizza">Pizza</MenuItem>
          <MenuItem value="Spaghetti">Spaghetti</MenuItem>
          <MenuItem value="Ice cream">Ice cream</MenuItem>
          <MenuItem value="Chocolate">Chocolate</MenuItem>
        </Select>

        <Select
          sx={{ width: 200,mx:1 }}
          size="small"
          margin="dense"
          value={thoiGian}
          onChange={(e) => setThoiGian(e.target.value)}
        >
          <MenuItem value="1 ngày">24 giờ</MenuItem>
          <MenuItem value="7 ngày">7 ngày</MenuItem>
          <MenuItem value="30 ngày">30 ngày</MenuItem>
          <MenuItem value="90 ngày">90 ngày</MenuItem>
          <MenuItem value="180 ngày">180 ngày</MenuItem>
          <MenuItem value="365 ngày">365 ngày</MenuItem>
        </Select>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          14k
        </Typography>
        <Typography
          sx={{
            color: "green",
            fontSize: 15,
            display: "flex",
            backgroundColor: "rgba(0, 255, 0, 0.1)",
            paddingX: 0.5,
            borderRadius: 5,
            border: "1px solid green",
          }}
        >
          20%
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: 12,
          color: "gray",
        }}
      >
        So với 30 ngày trước
      </Typography>
      <Box
        sx={{
          height: 370,
          marginTop: 2,
        }}
      >
        <BarChartCustom />
      </Box>
    </Paper>
  );
}
