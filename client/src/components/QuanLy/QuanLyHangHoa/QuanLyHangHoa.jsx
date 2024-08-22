import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import QuanLySanPham from './QuanLySanPham';
import QuanLyDanhMuc from './QuanLyDanhMuc';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function QuanLyHangHoa() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} variant='fullWidth'>
        <Tab label="Sản phẩm" />
        <Tab label="Danh mục" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <QuanLySanPham />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <QuanLyDanhMuc />
      </TabPanel>
    </>
  );
}
