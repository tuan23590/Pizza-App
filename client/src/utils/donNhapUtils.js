import { GraphQLrequest } from './request';
export const APIDanhSachDonNhap = async () => {
    const query = `query DanhSachDonNhap {
  danhSachDonNhap {
    id
    maDonNhap
    ngayNhap
    tongTien
    ghiChu
    chiTietDonNhap {
      id
      soLuong
      giaNhap
      ghiChu
      thanhTien
      nhaCungCap {
        id
        maNhaCungCap
        tenNhaCungCap
        soDienThoai
      }
      sanPham {
        maSanPham
        tenSanPham
        soLuong
        donViTinh
        danhMuc {
          id
          tenDanhMuc
          maDanhMuc
          soLuongSanPham
        }
      }
    }
  }
}`;
    const {danhSachDonNhap} = await GraphQLrequest({query});
    return danhSachDonNhap;
};

export const APIThemDonNhap = async (formData) => {
  const query = `mutation ThemDonNhap($nhaCungCap: String, $tongTien: Float, $danhSachSanPham: String, $ghiChu: String) {
  themDonNhap(nhaCungCap: $nhaCungCap, tongTien: $tongTien, danhSachSanPham: $danhSachSanPham, ghiChu: $ghiChu) {
    maDonNhap
  }
}`;
  const {themDonNhap} = await GraphQLrequest({query, variables: {
    ...formData,
    tongTien: parseFloat(formData.tongTien),
    danhSachSanPham: JSON.stringify(formData.danhSachSanPham),
  }});
  return themDonNhap;
};

