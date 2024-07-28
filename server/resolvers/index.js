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
        }
    },
    SanPham: {
        kichThuoc: async (parent) => {
            const danhSachKichThuoc = await kichThuocModel.find({ _id: { $in: parent.kichThuoc } });
            console.log(danhSachKichThuoc);
            return danhSachKichThuoc;
        },
        danhMuc: async (parent) => {
            const danhSachDanhMuc = await danhMucModel.find({ maDanhMuc: { $in: parent.danhMuc } });
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

        const danhSachTuyChon = args.tuyChon || [];
        let danhSachTuyChonMoi = [];
        
        for (const tuyChon of danhSachTuyChon) {
            const tc = new tuyChonModel({ tuyChon });
            await tc.save();
            danhSachTuyChonMoi.push(tc.id);
        }
        
        const sanPham = new sanPhamModel({
            ...args,
            maSanPham: maSanPhamMoi,
            tuyChon: danhSachTuyChonMoi
        });
        
        return await sanPham.save();
        }
    }
};