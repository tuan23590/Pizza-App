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
    kichThuoc
    ghiChu
    moTa
    hinhAnh
    giaSanPham
    loaiDe
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
  const query = `mutation ThemSanPham($danhMuc: String, $tenSanPham: String, $giaSanPham: Float, $ghiChu: String, $moTa: String, $hinhAnh: String, $trangThai: String, $kichThuoc: String, $loaiDe: String) {
  themSanPham(danhMuc: $danhMuc, tenSanPham: $tenSanPham, giaSanPham: $giaSanPham, ghiChu: $ghiChu, moTa: $moTa, hinhAnh: $hinhAnh, trangThai: $trangThai, kichThuoc: $kichThuoc, loaiDe: $loaiDe) {
    maSanPham
  }
}`;
  const { themSanPham } = await GraphQLrequest({
    query,
    variables: {
      ...formData,
      kichThuoc: JSON.stringify(formData.danhSachKichThuoc),
      loaiDe: JSON.stringify(formData.danhSachLoaiDe),
      giaSanPham: parseFloat(formData.giaSanPham),
    },
  });

  return themSanPham;
};


export const APICapNhatSanPham = async (formData) => {
  const query = `mutation CapNhatSanPham($capNhatSanPhamId: String, $danhMuc: String, $tenSanPham: String, $kichThuoc: String, $giaSanPham: Float, $ghiChu: String, $moTa: String, $hinhAnh: String, $trangThai: String, $loaiDe: String, $soLuong: Int) {
  capNhatSanPham(id: $capNhatSanPhamId, danhMuc: $danhMuc, tenSanPham: $tenSanPham, kichThuoc: $kichThuoc, giaSanPham: $giaSanPham, ghiChu: $ghiChu, moTa: $moTa, hinhAnh: $hinhAnh, trangThai: $trangThai, loaiDe: $loaiDe, soLuong: $soLuong) {
    maSanPham
  }
}`;
  const {capNhatSanPham} = await GraphQLrequest({query, variables: {
    ...formData,
    capNhatSanPhamId: formData.id,
    kichThuoc: JSON.stringify(formData.danhSachKichThuoc),
    loaiDe: JSON.stringify(formData.danhSachLoaiDe),
    giaSanPham: parseFloat(formData.giaSanPham)
  }});
  return capNhatSanPham;
};

export const APIXoaSanPham = async (id) => {
  const query = `mutation XoaSanPham($xoaSanPhamId: String) {
  xoaSanPham(id: $xoaSanPhamId)
}`;
  const {xoaSanPham} = await GraphQLrequest({query, variables: {
    xoaSanPhamId: id
  }});
  return xoaSanPham;
};