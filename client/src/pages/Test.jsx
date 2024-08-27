import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Button
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

const steps = [
  {
    label: 'Đơn Hàng Đã Đặt',
    iconFilled: <ShoppingBagIcon />,
    iconOutlined: <ShoppingBagOutlinedIcon />,
    time: '21:11 20-08-2024'
  },
  {
    label: 'Đang Xử Lý Đơn Hàng',
    iconFilled: <FactCheckIcon />,
    iconOutlined: <FactCheckOutlinedIcon />,
    time: '21:11 20-08-2024'
  },
  {
    label: 'Đang Chuẩn Bị Đơn Hàng',
    iconFilled: <LocalFireDepartmentIcon />,
    iconOutlined: <LocalFireDepartmentOutlinedIcon />,
    time: '11:40 22-08-2024'
  },
  {
    label: 'Đang Giao Hàng',
    iconFilled: <LocalShippingIcon />,
    iconOutlined: <LocalShippingOutlinedIcon />,
    time: ''
  },
  {
    label: 'Đã Giao Hàng',
    iconFilled: <VerifiedUserIcon />,
    iconOutlined: <VerifiedUserOutlinedIcon />,
    time: ''
  }
];

export default function Test() {
  const [activeStep, setActiveStep] = useState(3);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  return (
    <div>
      {activeStep}
      <Stepper activeStep = {activeStep} alternativeLabel>
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
                    border: `2px solid ${index <= activeStep ? 'green' : 'lightgrey'}`,
                    padding: 1,
                    //backgroundColor: index === activeStep ? 'lightgreen' : 'white',
                    marginBottom: 1,
                  }}
                >
                  {index != activeStep ? step.iconOutlined : index === activeStep ? step.iconFilled : step.iconFilled}
                </Box>
              )}
              sx={{
                color: index <= activeStep ? 'green' : 'inherit',
              }}
            >
              <Box textAlign="center">
                <Typography
                  color={index <= activeStep ? 'green' : 'inherit'}
                >
                  {step.label}
                </Typography>
                <Typography
                  variant="caption"
                  color={index <= activeStep ? 'green' : 'textSecondary'}
                >
                  {step.time}
                </Typography>
              </Box>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Lùi
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          Tiến
        </Button>
      </Box>
    </div>
  );
}
