import {
  chiTietDonNhapModel,
  danhMucModel,
  donHangModel,
  donNhapModel,
  nhapCungCapModel,
  sanPhamDaMuaModel,
  sanPhamModel,
  thongBaoModel,
  trangThaiGiaoHangModel,
} from "../models/index.js";
import fs from "fs";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    danhSachSanPham: async () => {
      const danhSachSanPham = await sanPhamModel.find();
      //sắp xếp theo maSanPham giảm dần và các sản có maDanhMuclà "DMXOA" sẽ đứng cuối cùng
      danhSachSanPham.sort((a, b) => {
        if (a.danhMuc === "DMXOA" && b.danhMuc !== "DMXOA") {
          return 1;
        }
        if (a.danhMuc !== "DMXOA" && b.danhMuc === "DMXOA") {
          return -1;
        }
        return b.maSanPham.localeCompare(a.maSanPham);
      });
      return danhSachSanPham;
    },
    danhSachSanPhamTheoMaDanhMuc: async (parent, args) => {
      const danhSachSanPham = await sanPhamModel.find({
        danhMuc: args.maDanhMuc,
      });
      return danhSachSanPham;
    },
    danhSachDanhMuc: async () => {
      const danhSachDanhMuc = await danhMucModel.find();
      // thêm trường số lượng sản phẩm vào danh mục
      for (let i = 0; i < danhSachDanhMuc.length; i++) {
        const soLuongSanPham = await sanPhamModel.countDocuments({
          danhMuc: danhSachDanhMuc[i].maDanhMuc,
        });
        danhSachDanhMuc[i].soLuongSanPham = soLuongSanPham;
      }
      // sắp xếp theo maDanhMuc giảm dần,các danh mục có trangThai là "Đã xóa" sẽ đứng cuối và các danh mục có maDanhMuc là "DMXOA" sẽ đứng cuối cùng
      danhSachDanhMuc.sort((a, b) => {
        if (a.trangThai === "Đã xóa" && b.trangThai !== "Đã xóa") {
          return 1;
        }
        if (a.trangThai !== "Đã xóa" && b.trangThai === "Đã xóa") {
          return -1;
        }
        if (a.maDanhMuc === "DMXOA" && b.maDanhMuc !== "DMXOA") {
          return 1;
        }
        if (a.maDanhMuc !== "DMXOA" && b.maDanhMuc === "DMXOA") {
          return -1;
        }
        return b.maDanhMuc.localeCompare(a.maDanhMuc);
      });
      return danhSachDanhMuc;
    },
    danhSachDanhMucChoNguoiDung: async () => {
      // loai bo danh muc "DMXOA", "DMNL" và danh mục có trạng thái là "Đã xóa"
      let danhSachDanhMuc = await danhMucModel.find({
        maDanhMuc: { $nin: ["DMXOA", "DMNL"] },
        trangThai: { $ne: "Đã xóa" },
      });
      // kiểm tra số lượng sản phẩm (sanPhamModel.countDocuments đếm những sanPham có trạng thái là "Đang kinh doanh" và danhMuc là maDanhMuc) nếu số lượng sản phẩm > 0 thì giữ lại danh mục đó
      danhSachDanhMuc = await Promise.all(
        danhSachDanhMuc.map(async (danhMuc) => {
          const soLuongSanPham = await sanPhamModel.countDocuments({
            trangThai: "Đang kinh doanh",
            danhMuc: danhMuc.maDanhMuc,
          });
          if (soLuongSanPham > 0) {
            return danhMuc;
          }
        })
      );
      return danhSachDanhMuc.filter((danhMuc) => danhMuc);
    },
    danhSachDanhMucThemSanPham: async () => {
      // loai bo danh muc "DMXOA" và danh mục có trạng thái là "Đã xóa"
      const danhSachDanhMuc = await danhMucModel.find({
        maDanhMuc: { $ne: "DMXOA" },
        trangThai: { $ne: "Đã xóa" },
      });
      return danhSachDanhMuc;
    },
    donHangTheoEmail: async (parent, args) => {
      const donHang = await donHangModel.find({ email: args.email });
      return donHang;
    },
    danhSachDonHang: async () => {
      const danhSachDonHang = await donHangModel.find();
      // sắp xếp theo maDonHang giảm dần
      danhSachDonHang.sort((a, b) => b.maDonHang.localeCompare(a.maDonHang));
      return danhSachDonHang;
    },
    danhSachTinhTp: (parent, args) => {
      try {
        const tinhData = fs.readFileSync("addressData/tinh_tp.json", "utf8");
        const tinhObject = JSON.parse(tinhData);
        const danhSachTinh = Object.values(tinhObject);
        return danhSachTinh;
      } catch (err) {
        return [];
      }
    },
    danhSachTinhTpDayDu: (parent, args) => {
      try {
        const tinhData = fs.readFileSync(
          "addressData/tinh_tp_day_du.json",
          "utf8"
        );
        const tinhObject = JSON.parse(tinhData);
        const danhSachTinh = Object.values(tinhObject);
        return danhSachTinh;
      } catch (err) {
        return [];
      }
    },
    danhSachQuanHuyen: (parent, args) => {
      const idTinhTP = args.idTinhTP;
      try {
        const quanHuyenData = fs.readFileSync(
          "addressData/quan_huyen.json",
          "utf8"
        );
        const quanHuyenObject = JSON.parse(quanHuyenData);
        const danhSachQuanHuyen = Object.values(quanHuyenObject).filter(
          (quanHuyen) => quanHuyen.parent_code === idTinhTP
        );
        return danhSachQuanHuyen;
      } catch (err) {
        return [];
      }
    },
    danhSachXaPhuong: (parent, args) => {
      const idQuanHuyen = args.idQuanHuyen;
      try {
        const xaPhuongData = fs.readFileSync(
          "addressData/xa_phuong.json",
          "utf8"
        );
        const xaPhuongObject = JSON.parse(xaPhuongData);
        const danhSachXaPhuong = Object.values(xaPhuongObject).filter(
          (xaPhuong) => xaPhuong.parent_code === idQuanHuyen
        );
        return danhSachXaPhuong;
      } catch (err) {
        return [];
      }
    },
    danhSachNhaCungCap: async () => {
      const danhSachNhaCungCap = await nhapCungCapModel.find();
      // sắp xếp theo maNhaCungCap giảm dần
      danhSachNhaCungCap.sort((a, b) =>
        b.maNhaCungCap.localeCompare(a.maNhaCungCap)
      );
      return danhSachNhaCungCap;
    },
    danhSachDonNhap: async () => {
      const danhSachDonNhap = await donNhapModel.find();
      // sắp xếp theo maDonNhap giảm dần
      danhSachDonNhap.sort((a, b) => b.maDonNhap.localeCompare(a.maDonNhap));
      return danhSachDonNhap;
    },
    danhSachNhaCungCapTheoDanhMuc: async (parent, args) => {
      // tìm theo id danh mục
      const danhSachNhaCungCap = await nhapCungCapModel.find({
        danhSachDanhMuc: args.id,
      });
      return danhSachNhaCungCap;
    },
    danhSachSanPhamTheoMaDanhMucNguoiDung: async (parent, args) => {
      const danhSachSanPham = await sanPhamModel.find({
        trangThai: "Đang kinh doanh",
        soLuong: { $gt: 0 },
        danhMuc: args.maDanhMuc,
      });
      // sắp xếp theo maSanPham giảm dần
      danhSachSanPham.sort((a, b) => b.maSanPham.localeCompare(a.maSanPham));
      return danhSachSanPham;
    },
    thongKeSoLuongDonHang: async (parent, args) => {
      const soNgay = args.type; // vd: 7, 30, 365
      // tìm tất cả đơn hàng trong soNgay ngày gần nhất
      // ngayDatHang trong donHangModel là kiểu epoch milliseconds
      const donHang = await donHangModel.find({
        ngayDatHang: { $gte: Date.now() - soNgay * 24 * 60 * 60 * 1000 },
      });
      if (soNgay === 1) {
        const donHangTruoc = await donHangModel.find({
          ngayDatHang: {
            $gte: Date.now() - (soNgay + 1) * 24 * 60 * 60 * 1000,
            $lt: Date.now() - 24 * 60 * 60 * 1000,
          },
        });
        const gioBatDau = 7;
        const gioKetThuc = 21;
        const labels = [];
        const datas = [];
        for (let i = gioBatDau; i <= gioKetThuc; i++) {
          labels.push(i + ":00 - " + (i + 1) + ":00");
          const gioEpoch = new Date(new Date().setHours(i, 0, 0, 0)).getTime();
          const danhSachDonHangTrongGio = donHang.filter(
            (donHang) =>
              donHang.ngayDatHang >= gioEpoch &&
              donHang.ngayDatHang < gioEpoch + 60 * 60 * 1000
          );
          datas.push(danhSachDonHangTrongGio.length);
        }
        const percent =
          donHangTruoc.length === 0
            ? 0
            : Math.round(
                ((datas.reduce((a, b) => a + b, 0) - donHangTruoc.length) /
                  donHangTruoc.length) *
                  100
              );
        return {
          labels,
          datas,
          percent,
          quantity: datas.reduce((a, b) => a + b, 0),
        };
      } else if (soNgay === 7 || soNgay === 30) {
        // tính donHangTruoc, nếu soNgay = 7 thì lấy 14 ngày trước, nếu soNgay = 30 thì lấy 60 ngày trước
        const donHangTruoc = await donHangModel.find({
          ngayDatHang: {
            $gte: Date.now() - soNgay * 2 * 24 * 60 * 60 * 1000,
            $lt: Date.now() - soNgay * 24 * 60 * 60 * 1000,
          },
        });
        const labels = [];
        const datas = [];
        for (let i = soNgay; i >= 0; i--) {
          const ngay = new Date(
            Date.now() - i * 24 * 60 * 60 * 1000
          ).toLocaleDateString();
          // fomart to dd/mm/yyyy before push to labels
          labels.push(
            new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-GB"
            )
          );
          const ngayEpoch = new Date(ngay).getTime();
          const danhSachDonHangTrongNgay = donHang.filter(
            (donHang) =>
              donHang.ngayDatHang >= ngayEpoch &&
              donHang.ngayDatHang < ngayEpoch + 24 * 60 * 60 * 1000
          );
          const soLuongDonHangTrongNgay = danhSachDonHangTrongNgay.length;
          datas.push(soLuongDonHangTrongNgay);
        }
        const percent =
          donHangTruoc.length === 0
            ? 0
            : Math.round(
                ((datas.reduce((a, b) => a + b, 0) - donHangTruoc.length) /
                  donHangTruoc.length) *
                  100
              );
        const quantity = datas.reduce((a, b) => a + b, 0);
        return { labels, datas, percent, quantity };
      } else {
        const donHangTruoc = await donHangModel.find({
          ngayDatHang: {
            $gte: Date.now() - soNgay * 2 * 24 * 60 * 60 * 1000,
            $lt: Date.now() - soNgay * 24 * 60 * 60 * 1000,
          },
        });
        const soThang = Math.floor(soNgay / 30);
        const labels = [];
        const datas = [];
        for (let i = soThang; i >= 1; i--) {
          const thang = new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000);
          labels.push(
            thang.toLocaleDateString("en-GB", {
              month: "2-digit",
              year: "numeric",
            })
          );
          const thangEpoch = new Date(thang).getTime();
          const danhSachDonHangTrongThang = donHang.filter(
            (donHang) =>
              donHang.ngayDatHang >= thangEpoch &&
              donHang.ngayDatHang < thangEpoch + 30 * 24 * 60 * 60 * 1000
          );
          datas.push(danhSachDonHangTrongThang.length);
        }
        const percent =
          donHangTruoc.length === 0
            ? 0
            : Math.round(
                ((datas.reduce((a, b) => a + b, 0) - donHangTruoc.length) /
                  donHangTruoc.length) *
                  100
              );
        const quantity = datas.reduce((a, b) => a + b, 0);
        return { labels, datas, percent, quantity };
      }
    },
    thongKeGiaTriDonHang: async (parent, args) => {
      const soNgay = args.type;
      const donHang = await donHangModel.find({
        ngayDatHang: { $gte: Date.now() - soNgay * 24 * 60 * 60 * 1000 },
      });
      if (soNgay === 1) {
        const donHangTruoc = await donHangModel.find({
          ngayDatHang: {
            $gte: Date.now() - (soNgay + 1) * 24 * 60 * 60 * 1000,
            $lt: Date.now() - 24 * 60 * 60 * 1000,
          },
        });
        const gioBatDau = 7;
        const gioKetThuc = 21;
        const labels = [];
        const datas = [];
        for (let i = gioBatDau; i <= gioKetThuc; i++) {
          labels.push(i + ":00 - " + (i + 1) + ":00");
          const gioEpoch = new Date(new Date().setHours(i, 0, 0, 0)).getTime();
          const danhSachDonHangTrongGio = donHang.filter(
            (donHang) =>
              donHang.ngayDatHang >= gioEpoch &&
              donHang.ngayDatHang < gioEpoch + 60 * 60 * 1000
          );
          const giaTriDonHangTrongGio = danhSachDonHangTrongGio.reduce(
            (a, b) => a + b.tongTien,
            0
          );
          datas.push(giaTriDonHangTrongGio);
        }
        const percent =
          donHangTruoc.length === 0
            ? 0
            : Math.round(
                ((datas.reduce((a, b) => a + b, 0) -
                  donHangTruoc.reduce((a, b) => a + b.tongTien, 0)) /
                  donHangTruoc.reduce((a, b) => a + b.tongTien, 0)) *
                  100
              );
        return {
          labels,
          datas,
          percent,
          quantity: datas.reduce((a, b) => a + b, 0),
        };
      } else if (soNgay === 7 || soNgay === 30) {
        const donHangTruoc = await donHangModel.find({
          ngayDatHang: {
            $gte: Date.now() - soNgay * 2 * 24 * 60 * 60 * 1000,
            $lt: Date.now() - soNgay * 24 * 60 * 60 * 1000,
          },
        });
        const labels = [];
        const datas = [];
        for (let i = soNgay; i >= 0; i--) {
          const ngay = new Date(
            Date.now() - i * 24 * 60 * 60 * 1000
          ).toLocaleDateString();
          labels.push(
            new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-GB"
            )
          );
          const ngayEpoch = new Date(ngay).getTime();
          const danhSachDonHangTrongNgay = donHang.filter(
            (donHang) =>
              donHang.ngayDatHang >= ngayEpoch &&
              donHang.ngayDatHang < ngayEpoch + 24 * 60 * 60 * 1000
          );
          const giaTriDonHangTrongNgay = danhSachDonHangTrongNgay.reduce(
            (a, b) => a + b.tongTien,
            0
          );
          datas.push(giaTriDonHangTrongNgay);
        }
        const percent =
          donHangTruoc.length === 0
            ? 0
            : Math.round(
                ((datas.reduce((a, b) => a + b, 0) -
                  donHangTruoc.reduce((a, b) => a + b.tongTien, 0)) /
                  donHangTruoc.reduce((a, b) => a + b.tongTien, 0)) *
                  100
              );
        const quantity = datas.reduce((a, b) => a + b, 0);
        return { labels, datas, percent, quantity };
      } else {
        const donHangTruoc = await donHangModel.find({
          ngayDatHang: {
            $gte: Date.now() - soNgay * 2 * 24 * 60 * 60 * 1000,
            $lt: Date.now() - soNgay * 24 * 60 * 60 * 1000,
          },
        });
        const soThang = Math.floor(soNgay / 30);
        const labels = [];
        const datas = [];
        for (let i = soThang; i >= 1; i--) {
          const thang = new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000);
          labels.push(
            thang.toLocaleDateString("en-GB", {
              month: "2-digit",
              year: "numeric",
            })
          );
          const thangEpoch = new Date(thang).getTime();
          const danhSachDonHangTrongThang = donHang.filter(
            (donHang) =>
              donHang.ngayDatHang >= thangEpoch &&
              donHang.ngayDatHang < thangEpoch + 30 * 24 * 60 * 60 * 1000
          );
          const giaTriDonHangTrongThang = danhSachDonHangTrongThang.reduce(
            (a, b) => a + b.tongTien,
            0
          );
          datas.push(giaTriDonHangTrongThang);
        }
        const percent =
          donHangTruoc.length === 0
            ? 0
            : Math.round(
                ((datas.reduce((a, b) => a + b, 0) -
                  donHangTruoc.reduce((a, b) => a + b.tongTien, 0)) /
                  donHangTruoc.reduce((a, b) => a + b.tongTien, 0)) *
                  100
              );
        const quantity = datas.reduce((a, b) => a + b, 0);
        return { labels, datas, percent, quantity };
      }
    },
    thongKeSoLuongDonNhap: async (parent, args) => {
      const soNgay = args.type;
      const donNhap = await donNhapModel.find({
        ngayNhap: { $gte: Date.now() - soNgay * 24 * 60 * 60 * 1000 },
      });
      if (soNgay === 1) {
        const donNhapTruoc = await donNhapModel.find({
          ngayNhap: {
            $gte: Date.now() - (soNgay + 1) * 24 * 60 * 60 * 1000,
            $lt: Date.now() - 24 * 60 * 60 * 1000,
          },
        });
        const gioBatDau = 7;
        const gioKetThuc = 21;
        const labels = [];
        const datas = [];
        for (let i = gioBatDau; i <= gioKetThuc; i++) {
          labels.push(i + ":00 - " + (i + 1) + ":00");
          const gioEpoch = new Date(new Date().setHours(i, 0, 0, 0)).getTime();
          const danhSachDonNhapTrongGio = donNhap.filter(
            (donNhap) =>
              donNhap.ngayNhap >= gioEpoch &&
              donNhap.ngayNhap < gioEpoch + 60 * 60 * 1000
          );
          datas.push(danhSachDonNhapTrongGio.length);
        }
        const percent =
          donNhapTruoc.length === 0
            ? 0
            : Math.round(
                ((datas.reduce((a, b) => a + b, 0) - donNhapTruoc.length) /
                  donNhapTruoc.length) *
                  100
              );
        return {
          labels,
          datas,
          percent,
          quantity: datas.reduce((a, b) => a + b, 0),
        };
      } else if (soNgay === 7 || soNgay === 30) {
        const donNhapTruoc = await donNhapModel.find({
          ngayNhap: {
            $gte: Date.now() - soNgay * 2 * 24 * 60 * 60 * 1000,
            $lt: Date.now() - soNgay * 24 * 60 * 60 * 1000,
          },
        });
        const labels = [];
        const datas = [];
        for (let i = soNgay; i >= 0; i--) {
          const ngay = new Date(
            Date.now() - i * 24 * 60 * 60 * 1000
          ).toLocaleDateString();
          labels.push(
            new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-GB"
            )
          );
          const ngayEpoch = new Date(ngay).getTime();
          const danhSachDonNhapTrongNgay = donNhap.filter(
            (donNhap) =>
              donNhap.ngayNhap >= ngayEpoch &&
              donNhap.ngayNhap < ngayEpoch + 24 * 60 * 60 * 1000
          );
          datas.push(danhSachDonNhapTrongNgay.length);
        }
        const percent =
          donNhapTruoc.length === 0
            ? 0
            : Math.round(
                ((datas.reduce((a, b) => a + b, 0) - donNhapTruoc.length) /
                  donNhapTruoc.length) *
                  100
              );
        const quantity = datas.reduce((a, b) => a + b, 0);
        return { labels, datas, percent, quantity };
      } else {
        const donNhapTruoc = await donNhapModel.find({
          ngayNhap: {
            $gte: Date.now() - soNgay * 2 * 24 * 60 * 60 * 1000,
            $lt: Date.now() - soNgay * 24 * 60 * 60 * 1000,
          },
        });
        const soThang = Math.floor(soNgay / 30);
        const labels = [];
        const datas = [];
        for (let i = soThang; i >= 1; i--) {
          const thang = new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000);
          labels.push(
            thang.toLocaleDateString("en-GB", {
              month: "2-digit",
              year: "numeric",
            })
          );
          const thangEpoch = new Date(thang).getTime();
          const danhSachDonNhapTrongThang = donNhap.filter(
            (donNhap) =>
              donNhap.ngayNhap >= thangEpoch &&
              donNhap.ngayNhap < thangEpoch + 30 * 24 * 60 * 60 * 1000
          );
          datas.push(danhSachDonNhapTrongThang.length);
        }
        const percent =
          donNhapTruoc.length === 0
            ? 0
            : Math.round(
                ((datas.reduce((a, b) => a + b, 0) - donNhapTruoc.length) /
                  donNhapTruoc.length) *
                  100
              );
        const quantity = datas.reduce((a, b) => a + b, 0);
        return { labels, datas, percent, quantity };
      }
    },
    thongKeGiaTriDonNhap: async (parent, args) => {
      const soNgay = args.type;
      const donNhap = await donNhapModel.find({
        ngayNhap: { $gte: Date.now() - soNgay * 24 * 60 * 60 * 1000 },
      });
      if (soNgay === 1) {
        const donNhapTruoc = await donNhapModel.find({
          ngayNhap: {
            $gte: Date.now() - (soNgay + 1) * 24 * 60 * 60 * 1000,
            $lt: Date.now() - 24 * 60 * 60 * 1000,
          },
        });
        const gioBatDau = 7;
        const gioKetThuc = 21;
        const labels = [];
        const datas = [];
        for (let i = gioBatDau; i <= gioKetThuc; i++) {
          labels.push(i + ":00 - " + (i + 1) + ":00");
          const gioEpoch = new Date(new Date().setHours(i, 0, 0, 0)).getTime();
          const danhSachDonNhapTrongGio = donNhap.filter(
            (donNhap) =>
              donNhap.ngayNhap >= gioEpoch &&
              donNhap.ngayNhap < gioEpoch + 60 * 60 * 1000
          );
          const giaTriDonNhapTrongGio = danhSachDonNhapTrongGio.reduce(
            (a, b) => a + b.tongTien,
            0
          );
          datas.push(giaTriDonNhapTrongGio);
        }
        const quantity = datas.reduce((a, b) => a + b, 0);
        const percent =
          donNhapTruoc.length === 0
            ? 0
            : Math.round(
                ((datas.reduce((a, b) => a + b, 0) -
                  donNhapTruoc.reduce((a, b) => a + b.tongTien, 0)) /
                  donNhapTruoc.reduce((a, b) => a + b.tongTien, 0)) *
                  100
              );
        return {
          labels,
          datas,
          percent,
          quantity,
        };
      } else if (soNgay === 7 || soNgay === 30) {
        const donNhapTruoc = await donNhapModel.find({
          ngayNhap: {
            $gte: Date.now() - soNgay * 2 * 24 * 60 * 60 * 1000,
            $lt: Date.now() - soNgay * 24 * 60 * 60 * 1000,
          },
        });
        const labels = [];
        const datas = [];
        for (let i = soNgay; i >= 0; i--) {
          const ngay = new Date(
            Date.now() - i * 24 * 60 * 60 * 1000
          ).toLocaleDateString();
          labels.push(
            new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(
              "en-GB"
            )
          );
          const ngayEpoch = new Date(ngay).getTime();
          const danhSachDonNhapTrongNgay = donNhap.filter(
            (donNhap) =>
              donNhap.ngayNhap >= ngayEpoch &&
              donNhap.ngayNhap < ngayEpoch + 24 * 60 * 60 * 1000
          );
          const giaTriDonNhapTrongNgay = danhSachDonNhapTrongNgay.reduce(
            (a, b) => a + b.tongTien,
            0
          );
          datas.push(giaTriDonNhapTrongNgay);
        }
        const percent =
          donNhapTruoc.length === 0
            ? 0
            : Math.round(
                ((datas.reduce((a, b) => a + b, 0) -
                  donNhapTruoc.reduce((a, b) => a + b.tongTien, 0)) /
                  donNhapTruoc.reduce((a, b) => a + b.tongTien, 0)) *
                  100
              );
        const quantity = datas.reduce((a, b) => a + b, 0);
        return { labels, datas, percent, quantity };
      } else {
        const donNhapTruoc = await donNhapModel.find({
          ngayNhap: {
            $gte: Date.now() - soNgay * 2 * 24 * 60 * 60 * 1000,
            $lt: Date.now() - soNgay * 24 * 60 * 60 * 1000,
          },
        });
        const soThang = Math.floor(soNgay / 30);
        const labels = [];
        const datas = [];
        for (let i = soThang; i >= 1; i--) {
          const thang = new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000);
          labels.push(
            thang.toLocaleDateString("en-GB", {
              month: "2-digit",
              year: "numeric",
            })
          );
          const thangEpoch = new Date(thang).getTime();
          const danhSachDonNhapTrongThang = donNhap.filter(
            (donNhap) =>
              donNhap.ngayNhap >= thangEpoch &&
              donNhap.ngayNhap < thangEpoch + 30 * 24 * 60 * 60 * 1000
          );
          const giaTriDonNhapTrongThang = danhSachDonNhapTrongThang.reduce(
            (a, b) => a + b.tongTien,
            0
          );
          datas.push(giaTriDonNhapTrongThang);
        }
        const percent =
          donNhapTruoc.length === 0
            ? 0
            : Math.round(
                ((datas.reduce((a, b) => a + b, 0) -
                  donNhapTruoc.reduce((a, b) => a + b.tongTien, 0)) /
                  donNhapTruoc.reduce((a, b) => a + b.tongTien, 0)) *
                  100
              );
        const quantity = datas.reduce((a, b) => a + b, 0);
        return { labels, datas, percent, quantity };
      }
    },
    thongKeSanPhamTheoDanhMuc: async (parent, args) => {
      const soNgay = args.type;
      const sanPhamDaMua = await sanPhamDaMuaModel.find({
        updatedAt: { $gte: Date.now() - soNgay * 24 * 60 * 60 * 1000 },
      });
      const danhSachSanPham = await sanPhamModel.find({
        danhMuc: args.maDanhMuc,
      });
      const danhSachDonNhap = await chiTietDonNhapModel.find({
        updatedAt: { $gte: Date.now() - soNgay * 24 * 60 * 60 * 1000 },
      });
      let labels = [];
      let datas = [];
      let oldDatas = [];
        for (let i = 0; i < danhSachSanPham.length; i++) {
          labels.push(danhSachSanPham[i].tenSanPham);
          const soLuongSanPham = sanPhamDaMua.filter(
            (sanPham) => sanPham.maSanPham === danhSachSanPham[i].maSanPham
          );
          const soLuongSanPhamOld = danhSachDonNhap.filter(
            (sanPham) => sanPham.sanPham === danhSachSanPham[i].maSanPham
          );
            const giaSanPhamDaMua = args.loaiThongKe == 2 ? 1 : (
                sanPhamDaMua.find(
                    (sanPham) => sanPham.maSanPham === danhSachSanPham[i].maSanPham
                  )?.giaSanPham || 1
            );
            const giaSanPhamDaNhap = args.loaiThongKe == 2 ? 1 : (
                danhSachDonNhap.find(
                    sanPham => sanPham.sanPham === danhSachSanPham[i].maSanPham
                  )?.giaNhap || 1
            )
          datas.push(soLuongSanPham.reduce((a, b) => a + b.soLuong, 0) * giaSanPhamDaMua);
          oldDatas.push(soLuongSanPhamOld.reduce((a, b) => a + b.soLuong, 0) * giaSanPhamDaNhap);
        }

      return { labels, datas, oldDatas };
    },
    danhMucTheoNhaCungCap: async (parent, args) => {
      const danhSachMaDanhMuc = await nhapCungCapModel.findOne({
        maNhaCungCap: args.maNhaCungCap,
      });
      const danhSachDanhMuc = await danhMucModel.find({ _id: { $in: danhSachMaDanhMuc.danhSachDanhMuc } });
      return danhSachDanhMuc;
    }
  },
  DonHang: {
    danhSachSanPham: async (parent) => {
      const danhSachSanPham = await sanPhamDaMuaModel.find({
        _id: { $in: parent.danhSachSanPham },
      });
      return danhSachSanPham;
    },
    trangThai: async (parent) => {
      //parent.trangThai là danh sách id trạng thái
      const trangThai = await trangThaiGiaoHangModel.find({ _id: { $in: parent.trangThai } });
      console.log(trangThai);
      return trangThai;
    }
  },
  SanPham: {
    danhMuc: async (parent) => {
      const danhSachDanhMuc = await danhMucModel.findOne({
        maDanhMuc: parent.danhMuc,
      });
      return danhSachDanhMuc;
    },
    hinhAnh: (parent) => {
      // thêm DB_URL
      return process.env.DB_URL + parent.hinhAnh;
    },
  },
  NhaCungCap: {
    danhSachDanhMuc: async (parent) => {
      //tìm theo id danh mục
      const danhSachDanhMuc = await danhMucModel.find({
        _id: { $in: parent.danhSachDanhMuc },
      });
      return danhSachDanhMuc;
    },
  },
  ChiTietDonNhap: {
    sanPham: async (parent) => {
      const sanPham = await sanPhamModel.findOne({ maSanPham: parent.sanPham });
      return sanPham;
    },
    nhaCungCap: async (parent) => {
      const nhaCungCap = await nhapCungCapModel.findOne({
        maNhaCungCap: parent.nhaCungCap,
      });
      return nhaCungCap;
    },
  },
  DonNhap: {
    chiTietDonNhap: async (parent) => {
      const chiTietDonNhap = await chiTietDonNhapModel.find({
        _id: { $in: parent.chiTietDonNhap },
      });
      return chiTietDonNhap;
    },
  },
  Mutation: {
    themDanhMuc: async (parent, args) => {
      const danhMucCuoi = await danhMucModel
        .findOne({ maDanhMuc: { $ne: "DMXOA" } })
        .sort({ _id: -1 })
        .exec();
      let maDanhMucMoi;
      if (danhMucCuoi) {
        const maDanhMucCuoi = danhMucCuoi.maDanhMuc;
        const soCuoi = parseInt(maDanhMucCuoi.replace("DM", ""), 10);
        maDanhMucMoi = "DM" + (soCuoi + 1);
      } else {
        maDanhMucMoi = "DM1";
      }
      const danhMuc = new danhMucModel(args);
      danhMuc.maDanhMuc = maDanhMucMoi;
      danhMuc.trangThai = "Hoạt động";
      return danhMuc.save();
    },
    capNhatDanhMuc: async (parent, args) => {
      const danhMuc = await danhMucModel.findOneAndUpdate(
        { _id: args.id },
        { tenDanhMuc: args.tenDanhMuc },
        { new: true }
      );
      return danhMuc;
    },
    xoaDanhMuc: async (parent, args) => {
      // cập nhật trạng thái của danh mục thành "Đã xóa"
      const danhMuc = await danhMucModel.findOneAndUpdate(
        { _id: args.id },
        { trangThai: "Đã xóa" },
        { new: true }
      );
      //tìm tất cả sản phẩm thuộc danhMuc và chuyến danh mục của nó thành "DMXOA" và trang thái thành "Ngừng kinh doanh"
      await sanPhamModel.updateMany(
        { danhMuc: danhMuc.maDanhMuc },
        { danhMuc: "DMXOA", trangThai: "Ngừng kinh doanh" }
      );
      return "Xóa danh mục thành công";
    },
    xoaSanPham: async (parent, args) => {
      // tìm sanPham theo id và chuyển trạng thái thành "Ngừng kinh doanh" và chuyển danh mục thành "DMXOA"
      const sanPham = await sanPhamModel.findOneAndUpdate(
        { _id: args.id },
        { trangThai: "Ngừng kinh doanh", danhMuc: "DMXOA" },
        { new: true }
      );
      return "Xóa sản phẩm thành công";
    },
    themSanPham: async (parent, args) => {
      const sanPhamCuoi = await sanPhamModel.findOne().sort({ _id: -1 }).exec();

      let maSanPhamMoi;

      if (sanPhamCuoi) {
        const maSanPhamCuoi = sanPhamCuoi.maSanPham;
        const soCuoi = parseInt(maSanPhamCuoi.replace("SP", ""), 10);
        maSanPhamMoi = "SP" + (soCuoi + 1);
      } else {
        maSanPhamMoi = "SP1";
      }
      const sanPham = new sanPhamModel({
        ...args,
        giaSanPham: parseFloat(args.giaSanPham),
        maSanPham: maSanPhamMoi,
        trangThai: "Đang kinh doanh",
        soLuong: 0,
      });
      return await sanPham.save();
    },
    capNhatSanPham: async (parent, args) => {
      // nếu args.hinhAnh có chưa http thì xóa httt. ví dụ: http://localhost:3000/uploads/SP1.jpg -> /uploads/SP1.jpg. slip("/")
      if (args.hinhAnh.includes("http")) {
        args.hinhAnh = "/" + args.hinhAnh.split("/").slice(3).join("/");
      }
      const sanPham = await sanPhamModel.findOneAndUpdate(
        { _id: args.id },
        args,
        { new: true }
      );
      return sanPham;
    },
    themDonHang: async (parent, args) => {
      const donHangCuoi = await donHangModel.findOne().sort({ _id: -1 }).exec();

      let maDonHangMoi;

      if (donHangCuoi) {
        const maDonHangCuoi = donHangCuoi.maDonHang;
        const soCuoi = parseInt(maDonHangCuoi.replace("DH", ""), 10);
        maDonHangMoi = "DH" + (soCuoi + 1);
      } else {
        maDonHangMoi = "DH1";
      }
      const donHang = new donHangModel(args);
      donHang.maDonHang = maDonHangMoi;
      const idTrangThai = new trangThaiGiaoHangModel({
        trangThai: "Đang xử lý",
        thoiGian: Date.now(),
      });
      await idTrangThai.save();
      donHang.trangThai.push(idTrangThai._id);
      donHang.ngayDatHang = Date.now();
      // nếu args.thoiGianGiaoHang = "Càng sớm càng tốt" thì lấy Date.now() + 2 giờ ngược lại lấy args.thoiGianGiaoHang
      donHang.thoiGianGiaoHang =
        args.thoiGianGiaoHang == "Càng sớm càng tốt"
          ? Date.now() + 2 * 60 * 60 * 1000
          : args.thoiGianGiaoHang;
      const danhSachSanPham = JSON.parse(args.danhSachSanPham);
      let danhSachIdSanPhamDaMua = [];
      try {
        for (let i = 0; i < danhSachSanPham.length; i++) {
          const sanPhamDaMua = new sanPhamDaMuaModel(danhSachSanPham[i]);
          sanPhamDaMua.loaiDe =
            JSON.stringify(danhSachSanPham[i]?.loaiDe) || null;
          sanPhamDaMua.kichThuoc =
            JSON.stringify(danhSachSanPham[i]?.kichThuoc) || null;
          sanPhamDaMua.maDonHang = maDonHangMoi;
          await sanPhamDaMua.save();
          danhSachIdSanPhamDaMua.push(sanPhamDaMua._id);
          await sanPhamModel.findOneAndUpdate(
            { _id: danhSachSanPham[i].id },
            { $inc: { soLuong: -danhSachSanPham[i].soLuong } },
            { new: true }
          );
        }
        donHang.danhSachSanPham = danhSachIdSanPhamDaMua;
        return donHang.save();
      } catch (err) {
        console.error(err);
      }
    },
    capNhatTrangThaiDonHang: async (parent, args) => {
      console.log(args);
      const trangThai = new trangThaiGiaoHangModel({
        trangThai: args.trangThai,
        thoiGian: Date.now(),
        lyDoHuyDonHang: args.lyDoHuyDonHang,
      });
      await trangThai.save();
      const donHang = await donHangModel.findOneAndUpdate( { maDonHang: args.maDonHang }, { $push: { trangThai: trangThai._id } }, { new: true });
      pubsub.publish("THEM_THONG_BAO", {
        Notify: {
          message: `Đơn hàng ${args.maDonHang} đã được cập nhật trạng thái thành ${args.trangThai}`,
          type: "update",
        },
      });
      return donHang;
    },
    themNhaCungCap: async (parent, args) => {
      const nhaCungCapCuoi = await nhapCungCapModel
        .findOne()
        .sort({ _id: -1 })
        .exec();
      let maNhaCungCapMoi;
      if (nhaCungCapCuoi) {
        const maNhaCungCapCuoi = nhaCungCapCuoi.maNhaCungCap;
        const soCuoi = parseInt(maNhaCungCapCuoi.replace("NCC", ""), 10);
        maNhaCungCapMoi = "NCC" + (soCuoi + 1);
      } else {
        maNhaCungCapMoi = "NCC1";
      }
      const nhaCungCap = new nhapCungCapModel(args);
      nhaCungCap.maNhaCungCap = maNhaCungCapMoi;
      return nhaCungCap.save();
    },
    capNhatNhaCungCap: async (parent, args) => {
      const nhaCungCap = await nhapCungCapModel.findOneAndUpdate(
        { _id: args.id },
        args,
        { new: true }
      );
      return nhaCungCap;
    },
    themDonNhap: async (parent, args) => {
      const donNhapCuoi = await donNhapModel.findOne().sort({ _id: -1 }).exec();
      let maDonNhapMoi;
      if (donNhapCuoi) {
        const maDonNhapCuoi = donNhapCuoi.maDonNhap;
        const soCuoi = parseInt(maDonNhapCuoi.replace("DN", ""), 10);
        maDonNhapMoi = "DN" + (soCuoi + 1);
      } else {
        maDonNhapMoi = "DN1";
      }

      const danhSachSanPham = JSON.parse(args.danhSachSanPham).map((item) => {
        return {
          maSanPham: item.sanPham.maSanPham,
          soLuong: item.soLuong,
          giaNhap: parseInt(item.giaNhap),
          maNhaCungCap: item.nhaCungCap.maNhaCungCap,
          ghiChu: item.ghiChu,
          thanhTien: item.thanhTien,
          donViTinh: item.donViTinh,
        };
      });
      for (let i = 0; i < danhSachSanPham.length; i++) {
        await sanPhamModel.findOneAndUpdate(
          { _id: danhSachSanPham[i].idSanPham },
          { $inc: { soLuong: danhSachSanPham[i].soLuong } },
          { new: true }
        );
      }
      let danhSachIdChiTietDonNhap = [];
      for (let i = 0; i < danhSachSanPham.length; i++) {
        const chiTietDonNhap = new chiTietDonNhapModel(danhSachSanPham[i]);
        chiTietDonNhap.sanPham = danhSachSanPham[i].maSanPham;
        chiTietDonNhap.nhaCungCap = danhSachSanPham[i].maNhaCungCap;
        await chiTietDonNhap.save();
        danhSachIdChiTietDonNhap.push(chiTietDonNhap._id);
      }
      const donNhap = new donNhapModel(args);
      donNhap.chiTietDonNhap = danhSachIdChiTietDonNhap;
      donNhap.maDonNhap = maDonNhapMoi;
      donNhap.ngayNhap = Date.now();
      return donNhap.save();
    },
    capNhatDonNhap: async (parent, args) => {
      const donNhap = await donNhapModel.findOneAndUpdate(
        { _id: args.id },
        args,
        { new: true }
      );
      return donNhap;
    },
    themThongBao: async (parent, args) => {
      const thongBao = new thongBaoModel(args);
      pubsub.publish("THEM_THONG_BAO", { Notify: thongBao });
      return thongBao.save();
    },
  },
  Subscription: {
    Notify: {
      subscribe: () => pubsub.asyncIterator(["THEM_THONG_BAO"]),
    },
  },
};
