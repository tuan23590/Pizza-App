import { GraphQLrequest } from './request';
export const APIThemDonHang = async (formData) => {
    const query = `mutation ThemDonHang($hoTen: String, $soDienThoai: String, $email: String, $gioHang: String, $phuongThucThanhToan: String, $diaChiGiaoHang: String, $thoiGianGiao: String, $tongTien: Float, $giamGia: Float, $tamTinh: Float) {
  themDonHang(hoTen: $hoTen, soDienThoai: $soDienThoai, email: $email, gioHang: $gioHang, phuongThucThanhToan: $phuongThucThanhToan, diaChiGiaoHang: $diaChiGiaoHang, thoiGianGiao: $thoiGianGiao, tongTien: $tongTien, giamGia: $giamGia, tamTinh: $tamTinh) {
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