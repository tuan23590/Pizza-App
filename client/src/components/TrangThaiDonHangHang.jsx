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
import { FOMATDATE } from '../function';



export default function TrangThaiDonHang({ trangThai }) {
  const trangThaiDH = trangThai ? trangThai[trangThai?.length - 1]?.trangThai : '';
  const thoiGian = trangThai ? trangThai[trangThai?.length - 1]?.thoiGian : '';
  const allSteps = [
    {
      label: 'Đơn Hàng Đã Đặt',
      iconFilled: <ShoppingBagIcon />,
      iconOutlined: <ShoppingBagOutlinedIcon />,
      time: trangThai ? trangThai[0]?.thoiGian : '',
    },
    {
      label: 'Đang Xử Lý Đơn Hàng',
      iconFilled: <FactCheckIcon />,
      iconOutlined: <FactCheckOutlinedIcon />,
      time: trangThai ? trangThai[1]?.thoiGian : '',
      // Thời gian xử lý = trangThai[0]?.thoiGian + 15 phút, trangThai[0]?.thoiGian kiểu string
      status: 'Duyệt chấm nhất đến: '+ FOMATDATE(parseInt(thoiGian) + 900000),
    },
    {
      label: 'Đang Chuẩn Bị Đơn Hàng',
      iconFilled: <LocalFireDepartmentIcon />,
      iconOutlined: <LocalFireDepartmentOutlinedIcon />,
      time: trangThai ? trangThai[2]?.thoiGian : '',
      // + 30 phút
      status: 'Thời gian hoàn thành dự kiến: '+FOMATDATE(parseInt(thoiGian) + 1800000),
    },
    {
      label: 'Đang Giao Hàng',
      iconFilled: <LocalShippingIcon />,
      iconOutlined: <LocalShippingOutlinedIcon />,
      time: trangThai ? trangThai[3]?.thoiGian : '',
      
      //status: 'Thời gian hoàn thành dự kiến: '+FOMATDATE(parseInt(thoiGian) + 1800000),
    },
    {
      label: 'Đã Giao Hàng',
      iconFilled: <VerifiedUserIcon />,
      iconOutlined: <VerifiedUserOutlinedIcon />,
      // + 60 phút
      status: 'Thời gian giao hàng dự kiến: '+FOMATDATE(parseInt(thoiGian) + 3600000),
    },
    {
      label: 'Đã Hủy Đơn Hàng',
      iconFilled: <RemoveShoppingCartIcon />,
      iconOutlined: <RemoveShoppingCartOutlinedIcon />,
    }
  ];


  const steps = trangThaiDH === 'Đã hủy' 
    ? [allSteps[0], allSteps[5]]  // Hiển thị "Đơn Hàng Đã Đặt" và "Đã Hủy Đơn Hàng"
    : allSteps.slice(0, 5);        // Hiển thị tất cả các bước ngoại trừ "Đã Hủy Đơn Hàng"

  const activeStep = 
    trangThaiDH === 'Đã đặt hàng' ? 0 :
    trangThaiDH === 'Đang xử lý' ? 1 :
    trangThaiDH === 'Đang chuẩn bị' ? 2 :
    trangThaiDH === 'Đang giao hàng' ? 3 :
    trangThaiDH === 'Đã giao hàng' ? 4 : 
    trangThaiDH === 'Đã hủy' ? 1 : 0;  // Nếu "Đã hủy", chỉ số bước là 1 vì chỉ có 2 bước được hiển thị

  // Xác định màu sắc dựa trên trạng thái
  const stepColor = trangThaiDH === 'Đã hủy' ? 'red' : 'green';

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
                <Typography
                  color={index <= activeStep ? stepColor : 'inherit'}
                  variant='caption'
                >
                  {step.time ? FOMATDATE(step.time) : (
                    step.status
                  )}
                </Typography>
              </Box>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
