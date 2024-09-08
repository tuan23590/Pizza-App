import React, { useState } from "react";
import { Paper, Box, Typography, Select, MenuItem } from "@mui/material";
import PieChartCostom from '../../PieChartCostom';
import CountryProgressList from './../CountryProgressList';

export default function BieuDoTron() {
  const [thoiGian, setThoiGian] = useState('7 ngày');

  return (
    <Paper sx={{ padding: 2, overflow: 'hidden' }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" pt>Tổng danh thu theo danh mục</Typography>
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
      <Box>
      <Box
        sx={{
          height: 270,
          marginTop: 2,
          width: 300,
          marginLeft: 9,
          marginTop: -2,
          overflow: "hidden",
        }}
      >
        <PieChartCostom/>
      </Box>
      <Box sx={{
        marginLeft: 3,
        overflow: "hidden",
      }}>
            <CountryProgressList/>
        </Box>
      </Box>
    </Paper>
  );
}
