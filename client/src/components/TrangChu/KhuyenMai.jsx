import React from 'react';
import { Box, Divider, Typography, ImageList, ImageListItem, Link, Container, Button } from '@mui/material';

const imageUrls = [
    'https://cdn.pizzahut.vn/images/Web_V3/Homepage/Desktop%20-%20Vie_XQQ6F_280520240748.jpg',
    'https://cdn.pizzahut.vn/images/Web_V3/Homepage/Desktop%20-%20Vie_8ID0J_110720240651.jpg',
    'https://cdn.pizzahut.vn/images/Web_V3/Homepage/Middle-vie_BO7X1_030720240951.jpg',
    'https://cdn.pizzahut.vn/images/Web_V3/Homepage/Destkop%20-%20Vie_9HBOH_010720241004.jpg'
];

export default function KhuyenMai() {
    return (
        <Container maxWidth={'lg'} sx={{ width: '100%'}}>
            <Divider>
                <Typography variant='h5' fontWeight={'500'}>KHUYẾN MẠI</Typography>
            </Divider>
            <ImageList sx={{ width: '98%', height: 'auto', marginX: 'auto', marginTop: '20px'  }} cols={2} gap={20}>
                {imageUrls.map((url, index) => (
                    <Link key={index} href='#'>
                        <ImageListItem key={index}>
                            <img
                                src={`${url}?w=248&fit=crop&auto=format`}
                                srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={`Promotion ${index + 1}`}
                                loading="lazy"
                            />
                        </ImageListItem>
                    </Link>
                ))}
            </ImageList>
            <Button variant='contained' color='success' fullWidth sx={{
                margin: '10px',
            }}>XEM MENU</Button>
        </Container>
    );
}
