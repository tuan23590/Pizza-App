import { GraphQLrequest } from './request';
export const APIDanhSachSanPhamTheoMaDanhMuc = async ({params}) => {
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