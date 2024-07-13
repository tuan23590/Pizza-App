import { danhMucModel, sanPhamModel, tuyChonModel } from "../models/index.js";

export const resolvers = {
    Query: {
        danhSachSanPham: async () => {
            const danhSachSanPham = await sanPhamModel.find();
            return danhSachSanPham;
        }
    },
    SanPham: {
        danhMuc: async (parent) => {
            const danhSachDanhMuc = await danhMucModel.find({ _id: { $in: parent.danhMuc } });
            return danhSachDanhMuc;
        },
        tuyChon: async (parent) => {
            const danhSachTuyChon = await tuyChonModel.find({ _id: { $in: parent.tuyChon } });
            return danhSachTuyChon;
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