import { GraphQLrequest } from './request';
export const APIThemDonHang = async (formData) => {
    const query = `mutation ThemDonHang($soDienThoai: String, $email: String, $gioHang: String, $phuongThucThanhToan: String, $diaChiGiaoHang: String, $thoiGianGiao: String, $tongTien: Float, $giamGia: Float, $tamTinh: Float, $tenKhachHang: String) {
  themDonHang(soDienThoai: $soDienThoai, email: $email, gioHang: $gioHang, phuongThucThanhToan: $phuongThucThanhToan, diaChiGiaoHang: $diaChiGiaoHang, thoiGianGiao: $thoiGianGiao, tongTien: $tongTien, giamGia: $giamGia, tamTinh: $tamTinh, tenKhachHang: $tenKhachHang) {
    maDonHang
  }
}`;
    const {themDonHang} = await GraphQLrequest({query, variables: formData});
    return themDonHang;
};

export const APIDonHangTheoMaDonHangHoacSoDienThoai = async (duLieuTimKiem) => {
  const query = `query DonHangTheoMaDonHangHoacSoDienThoai($duLieuTimKiem: String) {
  donHangTheoMaDonHangHoacSoDienThoai(duLieuTimKiem: $duLieuTimKiem) {
    id
    maDonHang
    tenKhachHang
    soDienThoai
    email
    ngayDatHang
    thoiGianGiao
    diaChiGiaoHang
    tamTinh
    giamGia
    tongTien
    phuongThucThanhToan
    trangThai
    danhSachSanPham
  }
}`;
  const {donHangTheoMaDonHangHoacSoDienThoai} = await GraphQLrequest({query, variables: duLieuTimKiem});
  return donHangTheoMaDonHangHoacSoDienThoai;
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
    thoiGianGiao
    diaChiGiaoHang
    tamTinh
    giamGia
    tongTien
    phuongThucThanhToan
    trangThai
    danhSachSanPham
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