import { GraphQLrequest } from './request';
export const APIDanhSachDanhMuc = async () => {
    const query = `query DanhSachDanhMuc {
  danhSachDanhMuc {
    id
    tenDanhMuc
    maDanhMuc
    soLuongSanPham
    trangThai
  }
}`;
    const {danhSachDanhMuc} = await GraphQLrequest({query});
    return danhSachDanhMuc;
};

export const APIDanhSachDanhMucThemSanPham = async () => {
  const query = `query DanhSachDanhMuc {
danhSachDanhMucThemSanPham {
  id
  tenDanhMuc
  maDanhMuc
  soLuongSanPham
  trangThai
}
}`;
  const {danhSachDanhMucThemSanPham} = await GraphQLrequest({query});
  return danhSachDanhMucThemSanPham;
};

export const APIDanhSachDanhMucChoNguoiDung = async () => {
  const query = `query DanhSachDanhMucChoNguoiDung {
  danhSachDanhMucChoNguoiDung {
    id
    tenDanhMuc
    maDanhMuc
    soLuongSanPham
    trangThai
  }
}`;
  const {danhSachDanhMucChoNguoiDung} = await GraphQLrequest({query});
  return danhSachDanhMucChoNguoiDung;
};

export const APIThemDanhMuc = async (tenDanhMuc) => {
    const query = `mutation ThemDanhMuc($tenDanhMuc: String) {
  themDanhMuc(tenDanhMuc: $tenDanhMuc) {
    id
    tenDanhMuc
    maDanhMuc
  }
}`;
    const {themDanhMuc} = await GraphQLrequest({query, variables: {tenDanhMuc}});
    return themDanhMuc;
};

export const APIXoaDanhMuc = async (deleteId) => {
    const query = `mutation XoaDanhMuc($xoaDanhMucId: String) {
  xoaDanhMuc(id: $xoaDanhMucId)
}`;
    const {xoaDanhMuc} = await GraphQLrequest({query, variables: {xoaDanhMucId: deleteId}});
    return xoaDanhMuc;
};

export const APICapNhatDanhMuc = async (id,tenDanhMuc) => {
  console.log(id,tenDanhMuc);
  const query = `mutation CapNhatDanhMuc($capNhatDanhMucId: String, $tenDanhMuc: String) {
  capNhatDanhMuc(id: $capNhatDanhMucId, tenDanhMuc: $tenDanhMuc) {
    id
    tenDanhMuc
    maDanhMuc
    soLuongSanPham
  }
}`;
  const {capNhatDanhMuc} = await GraphQLrequest({query, variables: {capNhatDanhMucId: id, tenDanhMuc}});
  return capNhatDanhMuc;
};