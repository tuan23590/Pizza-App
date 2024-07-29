import { danhMucModel, kichThuocModel, loaiDeModel, sanPhamModel } from "../models/index.js";

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
        }
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
        }
    }
};