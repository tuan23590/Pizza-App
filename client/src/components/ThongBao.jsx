import { Badge, Box, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { subscribeToNotifications } from '../utils/thongBaoUtils';

export default function ThongBao() {
    const [inVisible, setInvisible] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [danhSachThongBao, setDanhSachThongBao] = useState([]);

    const handleClick = (event) => {
        if (danhSachThongBao.length > 0) {
            setAnchorEl(event.currentTarget);
            setInvisible(true);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        subscribeToNotifications((notification) => {
            setInvisible(false);
        });
    }, []);
    return (
        <Box
            sx={{
                cursor: 'pointer',
                paddingTop: '5px',
                marginX: '10px',
            }}
        >
            <Badge 
                variant='dot' 
                invisible={inVisible} 
                color="error"
                onClick={handleClick}
            >
                <NotificationsNoneIcon />
            </Badge>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {danhSachThongBao.map((thongBao, index) => (
                    <MenuItem key={index} onClick={handleClose}>
                        {thongBao}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
