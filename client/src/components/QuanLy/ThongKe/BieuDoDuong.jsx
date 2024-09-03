import { Paper, Box, Typography, ButtonGroup, Button, Select, MenuItem } from "@mui/material";
import React from "react";
import SparkLineChart from "../../SparkLineChart";

export default function BieuDoDuong({ setDuLieu, duLieu }) {
  return (
    <Paper sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{duLieu.chartName}</Typography>
        <Select
        size="small"
        value={duLieu.select.find((item) => item.active).name}
        sx={{
          width: 120,
        }}
        >
          {duLieu.select.map((item, index) => (
            <MenuItem
              key={index}
              value={item.name}
              onClick={() => {
                const newSelect = duLieu.select.map((item, i) => {
                  if (i === index) {
                    return { ...item, active: true };
                  }
                  return { ...item, active: false };
                });
                setDuLieu({ ...duLieu, select: newSelect });
              }}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          {duLieu.quantity?.toLocaleString()} {duLieu.unit}
        </Typography>
        <Typography
          sx={{
            color: duLieu.percent >= 0 ? "green" : "red",
            fontSize: 15,
            display: "flex",
            backgroundColor:
              duLieu.percent >= 0
                ? "rgba(0, 255, 0, 0.1)"
                : "rgba(255, 0, 0, 0.1)",
            paddingX: 0.5,
            borderRadius: 5,
            border: duLieu.percent >= 0 ? "1px solid green" : "1px solid red",
          }}
        >
          {duLieu.percent}%
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: 12,
          color: "gray",
        }}
      >
        So với {(duLieu.select.find((item) => item.active).name).toLowerCase()} trước
      </Typography>
      <Box
        sx={{
          height: 95,
          marginTop: 2,
        }}
      >
        <SparkLineChart duLieu={duLieu} />
      </Box>
    </Paper>
  );
}
