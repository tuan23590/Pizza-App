import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import QuanLyNhaCungCap from './QuanLyNhaCungCap';
import QuanLyDonNhap from './QuanLyDonNhap';

export default function QuanLyPhieuNhap() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        variant='fullWidth'
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Đơn nhập" />
        <Tab label="Nhà cung cấp" />
      </Tabs>
      <Box>
        {value === 0 && (
          <QuanLyDonNhap />
        )}
        {value === 1 && (
          <QuanLyNhaCungCap />
        )}
      </Box>
    </Box>
  );
}
