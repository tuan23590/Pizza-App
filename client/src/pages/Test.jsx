import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { APINhanThongBao } from '../utils/thongBaoUtils';


export default function Test() {
  const { data, loading, error } = APINhanThongBao();
  const [danhSachThongBao, setDanhSachThongBao] = useState([]);
  useEffect(() => {
    if (data) {
      setDanhSachThongBao((prev) => [...prev, data.Notify]);
    }
  }, [data]);
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  console.log(danhSachThongBao);
  return (
    danhSachThongBao.map((thongBao) => (
      <div key={thongBao.id}>
        <Typography variant="h6">{thongBao.noiDung}</Typography>
        <Typography variant="subtitle1">Nguoi Nhan: {thongBao.nguoiNhan}</Typography>
        <Typography variant="subtitle2">Trang Thai: {thongBao.trangThai}</Typography>
        {thongBao.hinhAnh && (
          <img src={thongBao.hinhAnh} alt="Hinh Anh" style={{ width: '100px' }} />
        )}
        <Typography variant="caption">{new Date(thongBao.createdAt).toLocaleString()}</Typography>
      </div>
    ))
    // <div>
      
    //     <div key={data.Notify.id}>
    //       <Typography variant="h6">{data.Notify.noiDung}</Typography>
    //       <Typography variant="subtitle1">Nguoi Nhan: {data.Notify.nguoiNhan}</Typography>
    //       <Typography variant="subtitle2">Trang Thai: {data.Notify.trangThai}</Typography>
    //       {data.Notify.hinhAnh && (
    //         <img src={data.Notify.hinhAnh} alt="Hinh Anh" style={{ width: '100px' }} />
    //       )}
    //       <Typography variant="caption">{new Date(data.Notify.createdAt).toLocaleString()}</Typography>
    //     </div>
    // </div>
  );
}
