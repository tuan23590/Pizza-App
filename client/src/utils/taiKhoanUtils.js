import { GraphQLrequest } from './request';
export const APIThemTaiKhoan = async (formData) => {
    const query = `mutation ThemTaiKhoan($uid: String, $email: String, $phanQuyen: String, $hoTen: String, $soDienThoai: String, $diaChi: String) {
  themTaiKhoan(uid: $uid, email: $email, phanQuyen: $phanQuyen, hoTen: $hoTen, soDienThoai: $soDienThoai, diaChi: $diaChi) {
    uid
    email
    phanQuyen
    hoTen
    soDienThoai
    diaChi
  }
}`;
    const {themTaiKhoan} = await GraphQLrequest({query, variables: {
        uid: formData.uid || "",
        email: formData.email || "",
        phanQuyen: formData.phanQuyen || "",
        hoTen: formData.displayName || formData.hoTen || "",
        soDienThoai: formData.soDienThoai || "",
        diaChi: formData.diaChi || "",
    }});
    return themTaiKhoan;
};

export const APIDanhSachTaiKhoan = async () => {
  const query = `query DanhSachTaiKhoan {
  danhSachTaiKhoan {
    uid
    email
    phanQuyen
    hoTen
    soDienThoai
    diaChi
    soDonHang
    lanCuoiDangNhap
  }
}`;
  const {danhSachTaiKhoan} = await GraphQLrequest({query});
  return danhSachTaiKhoan;
};

export const APIXoaTaiKhoan = async (email) => {
  const query = `mutation XoaTaiKhoan($email: String) {
  xoaTaiKhoan(email: $email)
}`;
  const {xoaTaiKhoan} = await GraphQLrequest({query, variables: {email}});
  return xoaTaiKhoan;
};