import { danhMucModel, donHangModel, kichThuocModel, loaiDeModel, sanPhamDaMuaModel, sanPhamModel } from "../models/index.js";
import fs from 'fs';

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
        donHangTheoEmail: async (parent, args) => {
            const donHang = await donHangModel.find({ email: args.email });
            return donHang;
        },  
        danhSachDonHang: async () => {
            const danhSachDonHang = await donHangModel.find();
            return danhSachDonHang;
        },
        danhSachTinhTp: (parent, args) => {
            try {
                const tinhData = fs.readFileSync('addressData/tinh_tp.json', 'utf8');
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
                const quanHuyenData = fs.readFileSync('addressData/quan_huyen.json', 'utf8');
                const quanHuyenObject = JSON.parse(quanHuyenData);
                const danhSachQuanHuyen = Object.values(quanHuyenObject).filter(quanHuyen => quanHuyen.parent_code === idTinhTP);
                return danhSachQuanHuyen;
            } catch (err) {
                return [];
            }
        },
        danhSachXaPhuong: (parent, args) => {
            const idQuanHuyen = args.idQuanHuyen;
            try {
                const xaPhuongData = fs.readFileSync('addressData/xa_phuong.json', 'utf8');
                const xaPhuongObject = JSON.parse(xaPhuongData);
                const danhSachXaPhuong = Object.values(xaPhuongObject).filter(xaPhuong => xaPhuong.parent_code === idQuanHuyen);
                return danhSachXaPhuong;
            } catch (err) {
                return [];
            }
        },      
    },
    SanPhamDaMua: {
        kichThuoc: async (parent) => {
            const kichThuoc = await kichThuocModel.findOne({ _id: parent.kichThuoc });
            return kichThuoc;
        },
        loaiDe: async (parent) => {
            const loaiDe = await loaiDeModel.findOne({ _id: parent.loaiDe });
            return loaiDe;
        }
    },
    DonHang: {
        danhSachSanPham: async (parent) => {
            const danhSachSanPham = await sanPhamDaMuaModel.find({ _id: { $in: parent.danhSachSanPham } });
            return danhSachSanPham;
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
            donHang.trangThai = "Đang xử lý";
            donHang.ngayDatHang = Date.now();
            donHang.thoiGianGiaoHang = Date.now() + 2 * 60 * 60 * 1000;
            const danhSachSanPham = JSON.parse(args.danhSachSanPham)
            console.log(danhSachSanPham);
            let danhSachIdSanPhamDaMua = [];  
            try{
                for (let i = 0; i < danhSachSanPham.length; i++) {
                    const sanPhamDaMua = new sanPhamDaMuaModel(danhSachSanPham[i]);
                    sanPhamDaMua.loaiDe = danhSachSanPham[i]?.loaiDe?.id || null;
                    sanPhamDaMua.kichThuoc = danhSachSanPham[i]?.kichThuoc?.id || null;
                    await sanPhamDaMua.save();
                    danhSachIdSanPhamDaMua.push(sanPhamDaMua._id);
                    await sanPhamModel.findOneAndUpdate({ _id: danhSachSanPham[i].id }, { $inc: { soLuong: -danhSachSanPham[i].soLuong } }, { new: true });
                }
                donHang.danhSachSanPham = danhSachIdSanPhamDaMua;
                return donHang.save();
            }catch(err){
                console.log(err);
            }
            
        },
        capNhatTrangThaiDonHang: async (parent, args) => {
            const donHang = await donHangModel.findOneAndUpdate({ maDonHang: args.maDonHang }, { trangThai: args.trangThai }, { new: true });
            return donHang;
        }
    }
};