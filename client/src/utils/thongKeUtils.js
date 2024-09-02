import { GraphQLrequest } from "./request";
export const APIThongKeDoanhThu = async (type) => {
  const query = `query ThongKeDoanhThu($type: String) {
  thongKeDoanhThu(type: $type) {
    labels
    datas
    percent
    quantity
  }
}`;
  const { thongKeDoanhThu } = await GraphQLrequest({
    query,
    variables: { type },
  });
  return thongKeDoanhThu;
};

export const APIThongKeDonHang = async (type) => {
  const query = `query ThongKeDonHang($type: String) {
  thongKeDonHang(type: $type) {
    labels
    datas
    percent
    quantity
  }
}`;
  const { thongKeDonHang } = await GraphQLrequest({
    query,
    variables: { type },
  });
  return thongKeDonHang;
};

export const APIThongKeDonNhap = async (type) => {
  const query = `query ThongKeDonNhap($type: String) {
  thongKeDonNhap(type: $type) {
    labels
    datas
    percent
    quantity
  }
}`;
  const { thongKeDonNhap } = await GraphQLrequest({
    query,
    variables: { type },
  });
  return thongKeDonNhap;
};