import { GraphQLrequest } from './request';
export const APIDanhSachDanhMuc = async () => {
    const query = `query DanhSachDanhMuc {
  danhSachDanhMuc {
    id
    tenDanhMuc
    maDanhMuc
    soLuongSanPham
  }
}`;
    const {danhSachDanhMuc} = await GraphQLrequest({query});
    return danhSachDanhMuc;
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