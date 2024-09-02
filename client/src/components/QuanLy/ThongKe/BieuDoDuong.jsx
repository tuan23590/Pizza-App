import { Paper, Box, Typography, ButtonGroup, Button } from "@mui/material";
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
        <ButtonGroup
          variant="outlined"
          size="small"
          color={duLieu.percent > 0 ? "success" : "error"}
        >
          {duLieu.button.map((item, index) => (
            <Button
              key={index}
              variant={duLieu.button[index].active ? "contained" : "outlined"}
              onClick={() => {
                const newButton = duLieu.button.map((item, i) => {
                  if (i === index) {
                    return { ...item, active: true };
                  }
                  return { ...item, active: false };
                });
                setDuLieu({ ...duLieu, button: newButton });
              }}
            >
              {item.name}
            </Button>
          ))}
        </ButtonGroup>
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
          {duLieu.quantity}
        </Typography>
        <Typography
          sx={{
            color: duLieu.percent > 0 ? "green" : "red",
            fontSize: 15,
            display: "flex",
            backgroundColor:
              duLieu.percent > 0
                ? "rgba(0, 255, 0, 0.1)"
                : "rgba(255, 0, 0, 0.1)",
            paddingX: 0.5,
            borderRadius: 5,
            border: duLieu.percent > 0 ? "1px solid green" : "1px solid red",
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
        So với tuần trước
      </Typography>
      <Box
        sx={{
          height: 140,
          marginTop: 2,
        }}
      >
        <SparkLineChart duLieu={duLieu} />
      </Box>
    </Paper>
  );
}
