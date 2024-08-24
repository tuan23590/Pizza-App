import { GraphQLrequest } from './request';
export const APIThemNhaCungCap = async (formData) => {
    const query = `mutation ThemNhaCungCap($tenNhaCungCap: String, $soDienThoai: String, $email: String, $ghiChu: String, $danhSachDanhMuc: [String], $tinhTp: String, $quanHuyen: String, $xaPhuong: String, $soNhaTenDuong: String) {
  themNhaCungCap(tenNhaCungCap: $tenNhaCungCap, soDienThoai: $soDienThoai, email: $email, ghiChu: $ghiChu, danhSachDanhMuc: $danhSachDanhMuc, tinhTp: $tinhTp, quanHuyen: $quanHuyen, xaPhuong: $xaPhuong, soNhaTenDuong: $soNhaTenDuong) {
    maNhaCungCap
  }
}`;
    const {themNhaCungCap} = await GraphQLrequest({query, variables: 
        {
            ...formData,
            tinhTp: JSON.stringify(formData.tinhTp),
            quanHuyen: JSON.stringify(formData.quanHuyen),
            xaPhuong: JSON.stringify(formData.xaPhuong),         
        }
    });
    return themNhaCungCap;
};

export const APIDanhSachNhaCungCap = async () => {
  const query = `query DanhSachNhaCungCap {
  danhSachNhaCungCap {
    id
    maNhaCungCap
    tenNhaCungCap
    soDienThoai
    email
    ghiChu
    danhSachDanhMuc {
      id
      tenDanhMuc
      maDanhMuc
      soLuongSanPham
    }
    tinhTp
    quanHuyen
    xaPhuong
    soNhaTenDuong
  }
}`;
  const {danhSachNhaCungCap} = await GraphQLrequest({query});
  return danhSachNhaCungCap;
};

export const APICapNhatNhaCungCap = async (formData) => {
  console.log(formData);
  const query = `mutation CapNhatNhaCungCap($capNhatNhaCungCapId: String, $tenNhaCungCap: String, $soDienThoai: String, $email: String, $ghiChu: String, $danhSachDanhMuc: [String], $tinhTp: String, $quanHuyen: String, $xaPhuong: String, $soNhaTenDuong: String) {
  capNhatNhaCungCap(id: $capNhatNhaCungCapId, tenNhaCungCap: $tenNhaCungCap, soDienThoai: $soDienThoai, email: $email, ghiChu: $ghiChu, danhSachDanhMuc: $danhSachDanhMuc, tinhTp: $tinhTp, quanHuyen: $quanHuyen, xaPhuong: $xaPhuong, soNhaTenDuong: $soNhaTenDuong) {
    maNhaCungCap
  }
}`;
  const {capNhatNhaCungCap} = await GraphQLrequest({query, variables: 
    {
      ...formData,
      capNhatNhaCungCapId: formData.id,
      tinhTp: JSON.stringify(formData.tinhTp),
      quanHuyen: JSON.stringify(formData.quanHuyen),
      xaPhuong: JSON.stringify(formData.xaPhuong),         
  }
  });
  return capNhatNhaCungCap;
};