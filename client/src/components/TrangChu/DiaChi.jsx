import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';
import { APIDanhSachQuanHuyen, APIDanhSachTinhTp, APIDanhSachXaPhuong } from '../../utils/diaChiUtils';
import { GioHangContext } from '../../context/GioHangProvider';
import { AuthContext } from './../../context/AuthProvider';

export default function DiaChi() {
    const { setNotifyOpen, setNotificationMessage, setNotificationSeverity } = useContext(AuthContext);
    const { gioHang,setGioHang,setHienThiDiaChi } = useContext(GioHangContext);
    const curentURL = window.location.href.split('/')[3];
    const [danhSachTinhTp, setDanhSachTinhTp] = useState([]);
    const [danhSachQuanHuyen, setDanhSachQuanHuyen] = useState([]);
    const [danhSachXaPhuong, setDanhSachXaPhuong] = useState([]);
    const [diaChiData, setDiaChiData] = useState({
        tinhTp: null,
        quanHuyen: null,
        xaPhuong: null,
        soNhaTenDuong: '',
    });

    useEffect(() => {
        const fetchDanhSachTinhTp = async () => {
            const data = await APIDanhSachTinhTp();
            setDanhSachTinhTp(data);
        };
        fetchDanhSachTinhTp();
    }, []);

    useEffect(() => {
        const fetchDanhSachQuanHuyen = async () => {
            if (diaChiData.tinhTp) {
                const data = await APIDanhSachQuanHuyen(diaChiData.tinhTp.code);
                setDanhSachQuanHuyen(data);
            } else {
                setDanhSachQuanHuyen([]);
            }
        };
        fetchDanhSachQuanHuyen();
    }, [diaChiData.tinhTp]);

    useEffect(() => {
        const fetchDanhSachXaPhuong = async () => {
            if (diaChiData.quanHuyen) {
                const data = await APIDanhSachXaPhuong(diaChiData.quanHuyen.code);
                setDanhSachXaPhuong(data);
            } else {
                setDanhSachXaPhuong([]);
            }
        };
        fetchDanhSachXaPhuong();
    }, [diaChiData.quanHuyen]);

    const handleTinhTpChange = (event, value) => {
        setDiaChiData({
            tinhTp: value,
            quanHuyen: null, // Reset selected QuanHuyen and XaPhuong when TinhTp changes
            xaPhuong: null,
            soNhaTenDuong: diaChiData.soNhaTenDuong,
        });
    };

    const handleQuanHuyenChange = (event, value) => {
        setDiaChiData({
            ...diaChiData,
            quanHuyen: value,
            xaPhuong: null, // Reset selected XaPhuong when QuanHuyen changes
        });
    };

    const handleXaPhuongChange = (event, value) => {
        setDiaChiData({
            ...diaChiData,
            xaPhuong: value,
        });
    };

    const navigate = useNavigate();

    const handleXacNhanDiaChi = () => {
        if (!diaChiData.tinhTp || !diaChiData.quanHuyen || !diaChiData.xaPhuong || !diaChiData.soNhaTenDuong) {
            setNotifyOpen(true);
            setNotificationMessage('Vui lòng chọn đầy đủ thông tin địa chỉ giao hàng');
            setNotificationSeverity('error');
            return;
        }
        const stringDiaChi = `${diaChiData.soNhaTenDuong}, ${diaChiData.xaPhuong.path_with_type}`;
        setGioHang((prevGioHang) => {
            return {
                ...prevGioHang,
                diaChiGiaoHang: stringDiaChi,
            }
        });
        if (curentURL) {
            setHienThiDiaChi(false);
        } else {
            navigate('/DatHang');
        }
    };
    return (
        <Box sx={{
            width: '30vw',
            minWidth: '300px',
            textAlign: 'center',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.4)',
            position: 'absolute', 
            top: "80%", 
            zIndex: 10,
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    sx={{
                        cursor: 'pointer',
                        backgroundColor: '#f0f0f0',
                        color: 'red',
                        padding: '10px',
                        borderRadius: '10px 10px 0px 0px',
                        width: '100%',
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <LocalShippingIcon sx={{ marginX: '5px' }} />
                    Giao hàng tận nơi
                </Typography>
            </Box>
            <Box sx={{ padding: '10px', backgroundColor: 'white' ,borderRadius: '0px 0px 10px 10px', }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Autocomplete
                        autoFocus
                        fullWidth
                        options={danhSachTinhTp}
                        getOptionLabel={(option) => option.name_with_type}
                        value={diaChiData.tinhTp}
                        onChange={handleTinhTpChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tỉnh/Thành phố"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        )}
                    />

                    <Autocomplete
                        fullWidth
                        options={danhSachQuanHuyen}
                        getOptionLabel={(option) => option.name_with_type}
                        value={diaChiData.quanHuyen}
                        onChange={handleQuanHuyenChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Quận/Huyện"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        )}
                    />

                    <Autocomplete
                        fullWidth
                        options={danhSachXaPhuong}
                        getOptionLabel={(option) => option.name_with_type}
                        value={diaChiData.xaPhuong}
                        onChange={handleXaPhuongChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Xã/Phường"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        )}
                    />

                    <TextField label="Số nhà, tên đường" variant="outlined" size="small" fullWidth value={diaChiData.soNhaTenDuong} onChange={(e) => setDiaChiData({ ...diaChiData, soNhaTenDuong: e.target.value })} />
                </Box>
                <Button variant='contained' fullWidth color='success' sx={{marginTop: '10px'}} onClick={handleXacNhanDiaChi}>Bắt đầu đặt hàng</Button>
            </Box>
        </Box>
    );
}
