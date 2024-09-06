import { GraphQLrequest } from './request';
export const APIThemDonHang = async (formData) => {
    const query = `mutation ThemDonHang($soDienThoai: String, $email: String, $danhSachSanPham: String, $phuongThucThanhToan: String, $diaChiGiaoHang: String, $thoiGianGiaoHang: String, $tongTien: Float, $giamGia: Float, $tamTinh: Float, $tenKhachHang: String, $ghiChuDiaChi: String) {
  themDonHang(soDienThoai: $soDienThoai, email: $email, danhSachSanPham: $danhSachSanPham, phuongThucThanhToan: $phuongThucThanhToan, diaChiGiaoHang: $diaChiGiaoHang, thoiGianGiaoHang: $thoiGianGiaoHang, tongTien: $tongTien, giamGia: $giamGia, tamTinh: $tamTinh, tenKhachHang: $tenKhachHang, ghiChuDiaChi: $ghiChuDiaChi) {
    maDonHang
  }
}`;
    const {themDonHang} = await GraphQLrequest({query, variables: {
        soDienThoai: formData.soDienThoai,
        email: formData.email,
        danhSachSanPham: JSON.stringify(formData.danhSachSanPham),
        phuongThucThanhToan: formData.phuongThucThanhToan,
        diaChiGiaoHang: formData.diaChiGiaoHang,
        ghiChuDiaChi: formData.ghiChuDiaChi,
        thoiGianGiaoHang: formData.thoiGianGiaoHang.toString(),
        tongTien: formData.tongTien,
        giamGia: formData.giamGia,
        tamTinh: formData.tamTinh,
        tenKhachHang: formData.tenKhachHang
    }});
    return themDonHang;
};

export const APIDonHangTheoEmail = async (email) => {
  const query = `query DonHangTheoEmail($email: String) {
  donHangTheoEmail(email: $email) {
    id
    maDonHang
    tenKhachHang
    soDienThoai
    email
    ngayDatHang
    thoiGianGiaoHang
    diaChiGiaoHang
    tamTinh
    giamGia
    tongTien
    ghiChuDiaChi
    phuongThucThanhToan
    danhSachSanPham {
      maSanPham
      tenSanPham
      soLuong
      donViTinh
      moTa
      hinhAnh
      danhMuc
      giaSanPham
      kichThuoc 
      loaiDe
    }
    trangThai {
      id
      thoiGian
      trangThai
      lyDoHuyDonHang
    }
  }
}`;
  const {donHangTheoEmail} = await GraphQLrequest({query, variables: {email}});
  return donHangTheoEmail;
};


export const APIDanhSachDonHang = async () => {
  const query = `query DanhSachDonHang {
  danhSachDonHang {
    id
    maDonHang
    tenKhachHang
    soDienThoai
    email
    ngayDatHang
    thoiGianGiaoHang
    diaChiGiaoHang
    tamTinh
    giamGia
    tongTien
    ghiChuDiaChi
    phuongThucThanhToan
     trangThai {
      id
      thoiGian
      trangThai
      lyDoHuyDonHang
    }
    danhSachSanPham {
      maSanPham
      tenSanPham
      soLuong
      moTa
      hinhAnh
      danhMuc
      giaSanPham
      kichThuoc
      loaiDe
      donViTinh
    }
  }
}`;
  const {danhSachDonHang} = await GraphQLrequest({query});
  return danhSachDonHang;
};

export const APICapNhatTrangThaiDonHang = async ({maDonHang,trangThai}) => {
  const query = `mutation CapNhatTrangThaiDonHang($maDonHang: String, $trangThai: String) {
  capNhatTrangThaiDonHang(maDonHang: $maDonHang, trangThai: $trangThai) {
    maDonHang
  }
}`;
  const {capNhatTrangThaiDonHang} = await GraphQLrequest({query, variables: {maDonHang, trangThai}});
  return capNhatTrangThaiDonHang;
};