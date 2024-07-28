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