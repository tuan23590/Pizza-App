import { Box, Card, CardContent, Divider, List, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import User from '../User';

const DanhMucQuanLy = ({ DanhSachDanhMuc }) => {

    const selectedPath = useLocation().pathname.split('/')[2];

    return (
        <List
            sx={{
                backgroundColor: '#000000',
                opacity: 0.8,
                height: '93%',
                borderRadius: '20px',
                padding: '20px',
                margin: '10px',
            }}
            subheader={
                <>
                    <Box sx={{ display: 'flex', backgroundColor: 'white', padding: '10px', borderRadius: '10px', justifyContent: 'center', alignItems: 'center' }}>
                        <User />
                    </Box>
                    <Divider sx={{ backgroundColor: 'white', marginY: '10px' }} />
                </>
            }
        >
            {DanhSachDanhMuc.map(({ link, text, tab }, index) => (
                <Link
                    to={`./${link}`}
                    style={{ textDecoration: 'none' }}
                    key={index}
                    onClick={() => handleItemClick(index)}
                >
                    <Card
                        sx={{
                            mb: '5px',
                            background: selectedPath === link ? 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))' : '#000000',
                        }}
                    >
                        <CardContent
                            sx={{
                                '&:last-child': { pb: '10px' },
                            }}
                        >
                            <Typography sx={{ color: 'white' }}>
                                {text}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </List>
    );
};

export default DanhMucQuanLy;