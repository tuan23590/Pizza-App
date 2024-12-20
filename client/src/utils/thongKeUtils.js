import { GraphQLrequest } from "./request";

export const APIThongKeGiaTriDonHang = async (type) => {
  const query = `query thongKeGiaTriDonHang($type: Int) {
  thongKeGiaTriDonHang(type: $type) {
    labels
    datas
    percent
    quantity
  }
}`;
  const { thongKeGiaTriDonHang } = await GraphQLrequest({
    query,
    variables: { type },
  });
  return thongKeGiaTriDonHang;
};

export const APIThongKeSoLuongDonHang = async (type) => {
  const query = `query thongKeSoLuongDonHang($type: Int) {
  thongKeSoLuongDonHang(type: $type) {
    labels
    datas
    percent
    quantity
  }
}`;
  const { thongKeSoLuongDonHang } = await GraphQLrequest({
    query,
    variables: { type },
  });
  return thongKeSoLuongDonHang;
};

export const APIThongKeSoLuongDonNhap = async (type) => {
  const query = `query ThongKeSoLuongDonNhap($type: Int) {
  thongKeSoLuongDonNhap(type: $type) {
    labels
    datas
    percent
    quantity
  }
}`;
  const { thongKeSoLuongDonNhap } = await GraphQLrequest({
    query,
    variables: { type },
  });
  return thongKeSoLuongDonNhap;
};

export const APIThongKeGiaTriDonNhap = async (type) => {
  const query = `query ThongKeGiaTriDonNhap($type: Int) {
  thongKeGiaTriDonNhap(type: $type) {
    labels
    datas
    percent
    quantity
  }
}`;
  const { thongKeGiaTriDonNhap } = await GraphQLrequest({
    query,
    variables: { type },
  });
  return thongKeGiaTriDonNhap;
};

export const APIThongKeSanPhamTheoDanhMuc = async (loaiThongKe,maDanhMuc,type) => {
  const query = `query ThongKeSanPhamTheoDanhMuc($loaiThongKe: Int, $maDanhMuc: String, $type: Int) {
  thongKeSanPhamTheoDanhMuc(loaiThongKe: $loaiThongKe, maDanhMuc: $maDanhMuc, type: $type) {
    labels
    datas
    percent
    quantity
    oldDatas
  }
}`;
  const { thongKeSanPhamTheoDanhMuc } = await GraphQLrequest({
    query,
    variables: { loaiThongKe,maDanhMuc,type },
  });
  return thongKeSanPhamTheoDanhMuc;
};