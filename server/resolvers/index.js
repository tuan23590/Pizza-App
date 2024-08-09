import { danhMucModel, donHangModel, kichThuocModel, loaiDeModel, sanPhamModel } from "../models/index.js";

export const resolvers = {
    Query: {
        danhSachSanPham: async () => {
            const danhSachSanPham = await sanPhamModel.find();
            return danhSachSanPham;
        },
        danhSachSanPhamTheoMaDanhMuc: async (parent, args) => {
            const danhSachSanPham = await sanPhamModel.find({ danhMuc: args.maDanhMuc });
            return danhSachSanPham;
        },
        danhSachDanhMuc: async () => {
            const danhSachDanhMuc = await danhMucModel.find();
            return danhSachDanhMuc;
        },
        danhSachLoaiDe: async () => {
            const danhSachLoaiDe = await loaiDeModel.find();
            return danhSachLoaiDe;
        },
        danhSachKichThuoc: async () => {
            const danhSachKichThuoc = await kichThuocModel.find();
            return danhSachKichThuoc;
        },
        donHangTheoMaDonHangHoacSoDienThoai: async (parent, args) => {
            const duLieuTimKiem = args.duLieuTimKiem.trim().toUpperCase();
            const donHang = await donHangModel.find({ $or: [{ maDonHang: duLieuTimKiem }, { soDienThoai: duLieuTimKiem }] });
            return donHang;
        },        
    },
    SanPham: {
        kichThuoc: async (parent) => {
            const danhSachKichThuoc = await kichThuocModel.find({ _id: { $in: parent.kichThuoc } });
            return danhSachKichThuoc;
        },
        danhMuc: async (parent) => {
            const danhSachDanhMuc = await danhMucModel.findOne({maDanhMuc: parent.danhMuc});
            return danhSachDanhMuc;
        },
        loaiDe: async (parent) => {
            const danhSachLoaiDe = await loaiDeModel.find({ _id: { $in: parent.loaiDe } });
            return danhSachLoaiDe;
        }
    },
    Mutation:{
        themDanhMuc: async (parent, args) => {
            const danhMucCuoi = await danhMucModel.findOne().sort({ _id: -1 }).exec();
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
            return danhMuc.save();
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
            kichThuoc: args.kichThuoc,
            loaiDe: args.loaiDe,
            trangThai: "Đang kinh doanh",
            soLuong: 0
        });
        return await sanPham.save();
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
            const donHang = new donHangModel();
            donHang.tenKhachHang = args.tenKhachHang;
            donHang.soDienThoai = args.soDienThoai;
            donHang.email = args.email;
            donHang.maDonHang = maDonHangMoi;
            donHang.danhSachSanPham = args.gioHang;
            donHang.phuongThucThanhToan = args.phuongThucThanhToan;
            donHang.trangThai = "Đang xử lý";
            donHang.diaChiGiaoHang = args.diaChiGiaoHang;
            donHang.thoiGianGiao = args.thoiGianGiao;
            donHang.tongTien = parseFloat(args.tongTien);
            donHang.tamTinh = parseFloat(args.tamTinh);
            donHang.giamGia = parseFloat(args.giamGia);
            donHang.ngayDatHang = new Date().toISOString();
            return donHang.save();
        },
    }
};