import { GraphQLrequest } from './request';
export const APIDanhSachTinhTp = async () => {
    const query = `query DanhSachTinhTp {
  danhSachTinhTp {
    name_with_type
    code
  }
}`;
    const {danhSachTinhTp} = await GraphQLrequest({query});
    return danhSachTinhTp;
};

export const APIDanhSachQuanHuyen = async (idTinhTp) => {
    const query = `query DanhSachQuanHuyen($idTinhTp: String) {
    danhSachQuanHuyen(idTinhTP: $idTinhTp) {
      code
      name_with_type
    }
  }`;
    const {danhSachQuanHuyen} = await GraphQLrequest({query, variables: {idTinhTp}});
    return danhSachQuanHuyen;
};

export const APIDanhSachXaPhuong = async (idQuanHuyen) => {
    const query = `query DanhSachXaPhuong($idQuanHuyen: String) {
  danhSachXaPhuong(idQuanHuyen: $idQuanHuyen) {
    name_with_type
    path_with_type
  }
}`;
    const {danhSachXaPhuong} = await GraphQLrequest({query, variables: {idQuanHuyen}});
    return danhSachXaPhuong;
};
