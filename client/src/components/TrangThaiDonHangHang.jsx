import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

const allSteps = [
  {
    label: 'Đơn Hàng Đã Đặt',
    iconFilled: <ShoppingBagIcon />,
    iconOutlined: <ShoppingBagOutlinedIcon />,
  },
  {
    label: 'Đang Xử Lý Đơn Hàng',
    iconFilled: <FactCheckIcon />,
    iconOutlined: <FactCheckOutlinedIcon />,
  },
  {
    label: 'Đang Chuẩn Bị Đơn Hàng',
    iconFilled: <LocalFireDepartmentIcon />,
    iconOutlined: <LocalFireDepartmentOutlinedIcon />,
  },
  {
    label: 'Đang Giao Hàng',
    iconFilled: <LocalShippingIcon />,
    iconOutlined: <LocalShippingOutlinedIcon />,
  },
  {
    label: 'Đã Giao Hàng',
    iconFilled: <VerifiedUserIcon />,
    iconOutlined: <VerifiedUserOutlinedIcon />,
  },
  {
    label: 'Đã Hủy Đơn Hàng',
    iconFilled: <RemoveShoppingCartIcon />,
    iconOutlined: <RemoveShoppingCartOutlinedIcon />,
  }
];

export default function TrangThaiDonHang({ trangThai }) {
  const steps = trangThai === 'Đã hủy' 
    ? [allSteps[0], allSteps[5]]  // Hiển thị "Đơn Hàng Đã Đặt" và "Đã Hủy Đơn Hàng"
    : allSteps.slice(0, 5);        // Hiển thị tất cả các bước ngoại trừ "Đã Hủy Đơn Hàng"

  const activeStep = 
    trangThai === 'Đã đặt hàng' ? 0 :
    trangThai === 'Đang xử lý' ? 1 :
    trangThai === 'Đang chuẩn bị' ? 2 :
    trangThai === 'Đang giao hàng' ? 3 :
    trangThai === 'Đã giao hàng' ? 4 : 
    trangThai === 'Đã hủy' ? 1 : 0;  // Nếu "Đã hủy", chỉ số bước là 1 vì chỉ có 2 bước được hiển thị

  // Xác định màu sắc dựa trên trạng thái
  const stepColor = trangThai === 'Đã hủy' ? 'red' : 'green';

  return (
    <Box mb={4}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={() => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: `2px solid ${index <= activeStep ? stepColor : 'lightgrey'}`,
                    padding: 1,
                    marginBottom: 1,
                  }}
                >
                  {index !== activeStep ? step.iconOutlined : step.iconFilled}
                </Box>
              )}
              sx={{
                color: index <= activeStep ? stepColor : 'inherit',
              }}
            >
              <Box textAlign="center">
                <Typography
                  color={index <= activeStep ? stepColor : 'inherit'}
                >
                  {step.label}
                </Typography>
              </Box>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
