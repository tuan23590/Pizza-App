import { Box, Typography,Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { APIDanhSachDanhMuc } from '../../utils/danhMucUtils';
import { useNavigate } from 'react-router-dom';

export default function DanhMuc() {
    const [danhSachDanhMuc,setDanhSachDanhMuc] = useState([])
    const curntPath = window.location.pathname.split('/')[2];
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const dataDM = await APIDanhSachDanhMuc();
        setDanhSachDanhMuc(dataDM);
    };
    useEffect(() => {
        if (danhSachDanhMuc.length > 0) {
            navigate(`/datHang/${danhSachDanhMuc[0].maDanhMuc}`);
        }
    }, [danhSachDanhMuc]);
    return (
        <Box sx={{borderTop: 1,borderBottom: 1,borderColor: 'gray',display: 'flex',}}>
            {danhSachDanhMuc.map((danhMuc) => (
                <Box 
                 key={danhMuc.maDanhMuc} sx={{
                    color: curntPath == danhMuc.maDanhMuc ? 'white' : 'gray',
                    backgroundColor: curntPath == danhMuc.maDanhMuc ? 'red' : 'white',
                    transition: 'all 0.3s',
                    padding: '10px' ,
                    ':hover': {
                    cursor: 'pointer',
                    color: curntPath == danhMuc.maDanhMuc ? 'white' : 'red',
                  }}}
                onClick={() => {navigate(`/datHang/${danhMuc.maDanhMuc}`)}}>
                        <Typography sx={{fontWeight: '500'}}>
                            {danhMuc.tenDanhMuc.toUpperCase()}
                        </Typography>   
                </Box>
            ))}
        </Box>
    )
}
