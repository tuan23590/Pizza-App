import { GraphQLrequest } from './request';
export const APIDanhSachDanhMuc = async () => {
    const query = `query DanhSachDanhMuc {
  danhSachDanhMuc {
    id
    tenDanhMuc
    maDanhMuc
  }
}`;
    const {danhSachDanhMuc} = await GraphQLrequest({query});
    return danhSachDanhMuc;
};

export const APIThemDanhMuc = async (tenDanhMuc) => {
  console.log('APIThemDanhMuc', tenDanhMuc);
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