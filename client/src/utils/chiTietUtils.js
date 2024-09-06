import { GraphQLrequest } from './request';
export const APIDanhSachChiTiet = async () => {
    const query = `query DanhSachChiTiet {
  danhSachChiTiet {
    tenChiTiet
    loaiChiTiet
  }
}`;
    const {danhSachChiTiet} = await GraphQLrequest({query});
    return danhSachChiTiet;
};

export const APIThemChiTiet = async (tenChiTiet,loaiChiTiet) => {
    const query = `mutation ThemChiTiet($tenChiTiet: String, $loaiChiTiet: String) {
  themChiTiet(tenChiTiet: $tenChiTiet, loaiChiTiet: $loaiChiTiet) {
    tenChiTiet
    loaiChiTiet
  }
}`;
    const {themChiTiet} = await GraphQLrequest({query,variables:{tenChiTiet,loaiChiTiet}});
    return themChiTiet;
};
