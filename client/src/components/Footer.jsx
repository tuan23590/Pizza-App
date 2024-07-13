import { Box, Typography, Grid, Container, Link } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
export default function Footer() {
    const danhMuc = [{label: 'TIẾT KIỆM 50% PIZZA THỨ 2',link: '#'},{label:'COMBO',link: '#'},{label:'PIZZA',link: '#'},{label:'GÀ NGHIỀN',link: '#'},{label:'MY BOX',link: '#'},{label:'MÓN KHAI VỊ',link: '#'},{label:'THỨC UỐNG',link: '#'}];
    const veChungToi = [{label: 'Giới Thiệu',link: '#'},{label:'Tầm Nhìn Của Chúng Tôi',link: '#'},{label:'Giá Trị Cốt Lõi',link: '#'},{label:'Vệ Sinh An Toàn Thực Phẩm',link: '#'},{label:'LIMO',link: '#'}];
    const timCuaHang = [{label: 'Miền Bắc',link: '#'},{label: 'Miền Trung',link: '#'},{label: 'Miền Nam',link: '#'}];
    return (
        <Box sx={{
            backgroundColor: 'black',
            marginTop: '20px',
            padding: '20px',
        }}>
           <Container>
           <Grid container>
                <Grid item xs={3}>
                    <Link sx={{textDecoration: 'none',color: 'white'}} href='#' > <Typography m={'5px'} fontWeight={'500'} color={'yellow'} fontSize={'15px'}>MENU</Typography></Link>
                    {danhMuc.map((item, index) => (
                        <Link sx={{textDecoration: 'none',color: 'white'}} key={index} href={item.link}>
                            <Typography m={'5px'} fontSize={'13px'}>{item.label}</Typography>
                        </Link>
                    ))}
                </Grid>
                <Grid item xs={3}>
                    <Link sx={{textDecoration: 'none',color: 'white'}} href='#' > <Typography m={'5px'} fontWeight={'500'} color={'yellow'} fontSize={'15px'}>VỀ CHÚNG TÔI</Typography></Link>
                    {veChungToi.map((item, index) => (
                        <Link sx={{textDecoration: 'none',color: 'white'}} key={index} href={item.link}>
                            <Typography m={'5px'} fontSize={'13px'}>{item.label}</Typography>
                        </Link>
                    ))}
                </Grid>
                <Grid item xs={3}>
                    <Link sx={{textDecoration: 'none',color: 'white'}} href='#' > <Typography m={'5px'} fontWeight={'500'} color={'yellow'} fontSize={'15px'}>TÌM CỬA HÀNG</Typography></Link>
                    {timCuaHang.map((item, index) => (
                        <Link sx={{textDecoration: 'none',color: 'white'}} key={index} href={item.link}>
                            <Typography m={'5px'} fontSize={'13px'}>{item.label}</Typography>
                        </Link>
                    ))}
                </Grid>
                <Grid item xs={3}>
                    <Link sx={{textDecoration: 'none',color: 'white'}} href='#' > <Typography m={'5px'} fontWeight={'500'} color={'yellow'} fontSize={'15px'}>LIÊN HỆ VỚI CHÚNG TÔI</Typography></Link>
                    <Link href='#'>
                        <FacebookIcon sx={{fontSize: '30px', color: 'white'}} />
                    </Link>
                    <Link href='#'>
                        <YouTubeIcon sx={{fontSize: '30px', color: 'white'}} />
                    </Link>
                    <Link href='#'>
                        <EmailIcon sx={{fontSize: '30px', color: 'white'}} />
                    </Link>
                </Grid>
            </Grid >
           </Container>
        </Box>
    )
}
