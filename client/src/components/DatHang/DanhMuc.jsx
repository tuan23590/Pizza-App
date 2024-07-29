import { Box, Typography,Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { APIDanhSachDanhMuc } from '../../utils/danhMucUtils';

export default function DanhMuc() {
    const [danhSachDanhMuc,setDanhSachDanhMuc] = useState([])
    const fetchData = async () => {
        const dataDM = await APIDanhSachDanhMuc();
        setDanhSachDanhMuc(dataDM);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const curntPath = window.location.pathname.split('/')[2];
    const [danhMucDaChon,setDanhMucDaChon] = useState(danhSachDanhMuc[0]);
    return (
        <Box sx={{borderTop: 1,borderBottom: 1,borderColor: 'gray',display: 'flex',}}>
            {danhSachDanhMuc.map((danhMuc) => (
                <Link href={`/datHang/${danhMuc.maDanhMuc || ''}`} key={danhMuc.maDanhMuc} sx={{
                    textDecoration: 'none',
                    color: curntPath == danhMuc.maDanhMuc ? 'white' : 'gray',
                    backgroundColor: curntPath == danhMuc.maDanhMuc ? 'red' : 'white',
                    transition: 'all 0.3s',
                    padding: '10px' ,
                    ':hover': {
                    cursor: 'pointer',
                    color: curntPath == danhMuc.maDanhMuc ? 'white' : 'red',
                  }}}
                onClick={() => setDanhMucDaChon(danhMuc)}>
                        <Typography sx={{fontWeight: '500'}}>
                            {danhMuc.tenDanhMuc.toUpperCase()}
                        </Typography>   
                </Link>
            ))}
        </Box>
    )
}
