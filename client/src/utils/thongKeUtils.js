import { GraphQLrequest } from "./request";
export const APIThongKeDoanhThu = async (type) => {
  const query = `query ThongKeDoanhThu($type: String) {
  thongKeDoanhThu(type: $type) {
    labels
    datas
    percent
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
  }
}`;
  const { thongKeDonHang } = await GraphQLrequest({
    query,
    variables: { type },
  });
  return thongKeDonHang;
};
