import React, { useState } from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MapIcon from '@mui/icons-material/Map';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';

export default function DiaChi() {
    const [selectedOption, setSelectedOption] = useState('Giao hàng tận nơi');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleClearAddress = () => {
        setAddress('');
    };

    return (
        <Box sx={{
            width: '500px',
            borderRadius: '10px',
            textAlign: 'center',
            position: 'absolute',
            top: '20vw',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.4)',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    onClick={() => handleOptionClick('Giao hàng tận nơi')}
                    sx={{
                        cursor: 'pointer',
                        backgroundColor: selectedOption === 'Giao hàng tận nơi' ? 'white' : '#f0f0f0',
                        color: selectedOption === 'Giao hàng tận nơi' ? 'red' : 'black',
                        padding: '10px',
                        borderRadius: '10px 10px 0px 0px',
                        width: '49.5%',
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <LocalShippingIcon sx={{ marginX: '5px' }} />
                    Giao hàng tận nơi
                </Typography>
                <Typography
                    onClick={() => handleOptionClick('Mua mang về')}
                    sx={{
                        cursor: 'pointer',
                        backgroundColor: selectedOption === 'Mua mang về' ? 'white' : '#f0f0f0',
                        color: selectedOption === 'Mua mang về' ? 'red' : 'black',
                        padding: '10px',
                        borderRadius: '10px 10px 0px 0px',
                        width: '49.5%',
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <ShoppingBagIcon sx={{ marginX: '5px' }} />
                    Mua mang về
                </Typography>
            </Box>
            {selectedOption && (
                <Box sx={{ padding: '10px' ,backgroundColor: 'white'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <TextField
                            fullWidth
                            placeholder="Vui lòng cho chúng tôi biết địa chỉ của bạn!"
                            size='small'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            sx={{
                                '& .MuiInputBase-input': {
                                    border: '2px solid green',
                                    borderRadius: '5px',
                                    padding: '5px 10px',
                                },
                                '&:hover .MuiInputBase-input': {
                                    border: '2px solid green',
                                },
                                '&.Mui-focused .MuiInputBase-input': {
                                    border: '2px solid green',
                                },
                            }}
                        />
                        {address && (
                            <IconButton
                                onClick={handleClearAddress}
                                sx={{
                                   color: 'green',
                                   paddingLeft: '10px',
                                }}
                            >
                                <CancelIcon />
                            </IconButton>
                        )}
                        <IconButton>
                        <MapIcon sx={{ color: 'green', cursor: 'pointer'}} />
                        </IconButton>
                    </Box>
                    <Button variant='contained' fullWidth color='success' onClick={()=>{navigate('/DatHang');}}>Bắt đầu đặt hàng</Button>
                </Box>
            )}
        </Box>
    );
}
