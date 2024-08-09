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
    kichThuoc {
      id
      tenKichThuoc
      giaKichThuoc
    }
    ghiChu
    moTa
    hinhAnh
    danhMuc {
      id
      tenDanhMuc
      maDanhMuc
    }
    trangThai
    soLuong
    loaiDe {
      id
      tenLoaiDe
      giaLoaiDe
    }
    giaSanPham
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

export const APIThemSanPham = async ({formData, selectedLoaiDe, selectedKichThuoc}) => {
  const query = `mutation ThemSanPham($tenSanPham: String, $kichThuoc: [String], $loaiDe: [String], $ghiChu: String, $moTa: String, $hinhAnh: String, $danhMuc: String, $trangThai: String) {
  themSanPham(tenSanPham: $tenSanPham, kichThuoc: $kichThuoc, loaiDe: $loaiDe, ghiChu: $ghiChu, moTa: $moTa, hinhAnh: $hinhAnh, danhMuc: $danhMuc, trangThai: $trangThai) {
    maSanPham
  }
}`;
  const {themSanPham} = await GraphQLrequest({query, variables: {...formData, kichThuoc: selectedKichThuoc, loaiDe: selectedLoaiDe}});
  return themSanPham;
};