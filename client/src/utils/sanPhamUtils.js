import { GraphQLrequest } from './request';
export const APIDanhSachSanPhamTheoMaDanhMuc = async (maDanhMuc) => {
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
          donViTinh
          moTa
          hinhAnh
          giaSanPham
          loaiDe
      }
  }`;

  const { danhSachSanPhamTheoMaDanhMuc } = await GraphQLrequest({
      query,
      variables: { maDanhMuc },
  });

  return danhSachSanPhamTheoMaDanhMuc;
};

export const APIDanhSachSanPhamTheoMaDanhMucNguoiDung = async ({params: { maDanhMuc }}) => {
  const query = `query DanhSachSanPhamTheoMaDanhMucNguoiDung($maDanhMuc: String) {
  danhSachSanPhamTheoMaDanhMucNguoiDung(maDanhMuc: $maDanhMuc) {
    maSanPham
          id
          tenSanPham
          danhMuc {
              id
              tenDanhMuc
              maDanhMuc
          }
          kichThuoc
          donViTinh
          moTa
          hinhAnh
          giaSanPham
          loaiDe
  }
}`;

  const { danhSachSanPhamTheoMaDanhMucNguoiDung } = await GraphQLrequest({
      query,
      variables: { maDanhMuc },
  });

  return danhSachSanPhamTheoMaDanhMucNguoiDung;
};

export const APIDanhSachSanPham = async () => {
    const query = `query DanhSachSanPham {
  danhSachSanPham {
    id
    maSanPham
    tenSanPham
    donViTinh
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

export const APIThemSanPham = async (formData) => {
  const query = `mutation ThemSanPham($danhMuc: String, $tenSanPham: String, $giaSanPham: Float, $moTa: String, $hinhAnh: String, $trangThai: String, $kichThuoc: String, $loaiDe: String, $donViTinh: String) {
  themSanPham(danhMuc: $danhMuc, tenSanPham: $tenSanPham, giaSanPham: $giaSanPham,  moTa: $moTa, hinhAnh: $hinhAnh, trangThai: $trangThai, kichThuoc: $kichThuoc, loaiDe: $loaiDe, donViTinh: $donViTinh) {
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
  const query = `mutation CapNhatSanPham($capNhatSanPhamId: String, $danhMuc: String, $tenSanPham: String, $kichThuoc: String, $giaSanPham: Float, $moTa: String, $hinhAnh: String, $trangThai: String, $loaiDe: String, $soLuong: Int, $donViTinh: String) {
  capNhatSanPham(id: $capNhatSanPhamId, danhMuc: $danhMuc, tenSanPham: $tenSanPham, kichThuoc: $kichThuoc, giaSanPham: $giaSanPham, moTa: $moTa, hinhAnh: $hinhAnh, trangThai: $trangThai, loaiDe: $loaiDe, soLuong: $soLuong, donViTinh: $donViTinh) {
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