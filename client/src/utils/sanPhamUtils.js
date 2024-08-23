import { GraphQLrequest } from './request';
export const APIDanhSachSanPhamTheoMaDanhMuc = async ({params}) => {
    const query = `query DanhSachSanPhamTheoMaDanhMuc($maDanhMuc: String) {
  danhSachSanPhamTheoMaDanhMuc(maDanhMuc: $maDanhMuc) {
    maSanPham
    id
    tenSanPham
     danhMuc {
      id
      tenDanhMuc
      maDanhMuc
    }
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

export const APIDanhSachSanPham = async () => {
    const query = `query DanhSachSanPham {
  danhSachSanPham {
    id
    maSanPham
    tenSanPham
    ghiChu
    moTa
    hinhAnh
    danhMuc {
      maDanhMuc
      id
      tenDanhMuc
    }
    trangThai
    giaSanPham
    soLuong
    kichThuoc
    loaiDe
  }
}`;
    const {danhSachSanPham} = await GraphQLrequest({query});
    return danhSachSanPham;
};

export const APIDanhLoaiDe = async () => {
  const query = `query DanhSachLoaiDe {
  danhSachLoaiDe {
    id
    tenLoaiDe
    giaLoaiDe
  }
}`;
  const {danhSachLoaiDe} = await GraphQLrequest({query});
  return danhSachLoaiDe;
};

export const APIDanhKichThuoc = async () => {
  const query = `query DanhSachKichThuoc {
  danhSachKichThuoc {
    id
    tenKichThuoc
    giaKichThuoc
  }
}`;
  const {danhSachKichThuoc} = await GraphQLrequest({query});
  return danhSachKichThuoc;
};

export const APIThemSanPham = async (formData) => {
  const query = `mutation ThemSanPham($danhMuc: String, $tenSanPham: String, $danhSachKichThuoc: String, $danhSachLoaiDe: String, $giaSanPham: Float, $ghiChu: String, $moTa: String, $hinhAnh: String, $trangThai: String) {
  themSanPham(danhMuc: $danhMuc, tenSanPham: $tenSanPham, danhSachKichThuoc: $danhSachKichThuoc, danhSachLoaiDe: $danhSachLoaiDe, giaSanPham: $giaSanPham, ghiChu: $ghiChu, moTa: $moTa, hinhAnh: $hinhAnh, trangThai: $trangThai) {
    maSanPham
  }
}`;
  const {themSanPham} = await GraphQLrequest({query, variables: {
    ...formData,
    danhSachKichThuoc: JSON.stringify(formData.danhSachKichThuoc),
    danhSachLoaiDe: JSON.stringify(formData.danhSachLoaiDe),
    giaSanPham: parseFloat(formData.giaSanPham)
  }});
  return themSanPham;
};