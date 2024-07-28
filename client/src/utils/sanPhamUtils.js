import { GraphQLrequest } from './request';
export const APIDanhSachPizza = async ({params}) => {
    const query = `query DanhSachSanPhamTheoMaDanhMuc($maDanhMuc: String) {
  danhSachSanPhamTheoMaDanhMuc(maDanhMuc: $maDanhMuc) {
    maSanPham
    tenSanPham
    kichThuoc {
      id
      tenKichThuoc
      giaKichThuoc
    }
    ghiChu
    moTa
    hinhAnh
    giaSanPham
    loaiDe {
      id
      tenLoaiDe
      giaLoaiDe
    }
  }
}`;
    const {danhSachSanPhamTheoMaDanhMuc} = await GraphQLrequest({query, variables: {maDanhMuc: params.maDanhMuc}});
    return danhSachSanPhamTheoMaDanhMuc;
};