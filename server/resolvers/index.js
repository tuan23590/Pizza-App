import { danhMucModel, donHangModel, nhapCungCapModel, sanPhamDaMuaModel, sanPhamModel } from "../models/index.js";
import fs from 'fs';

export const resolvers = {
    Query: {
        danhSachSanPham: async () => {
            const danhSachSanPham = await sanPhamModel.find();
            // thêm DB_URL vào hình ảnh 
            for (let i = 0; i < danhSachSanPham.length; i++) {
                danhSachSanPham[i].hinhAnh = process.env.DB_URL + danhSachSanPham[i].hinhAnh;
            }
            return danhSachSanPham;
        },
        danhSachSanPhamTheoMaDanhMuc: async (parent, args) => {
            const danhSachSanPham = await sanPhamModel.find({ danhMuc: args.maDanhMuc });
             // thêm DB_URL vào hình ảnh 
             for (let i = 0; i < danhSachSanPham.length; i++) {
                danhSachSanPham[i].hinhAnh = process.env.DB_URL + danhSachSanPham[i].hinhAnh;
            }
            return danhSachSanPham;
        },
        danhSachDanhMuc: async () => {
            const danhSachDanhMuc = await danhMucModel.find();
            // thêm trường số lượng sản phẩm vào danh mục
            for (let i = 0; i < danhSachDanhMuc.length; i++) {
                const soLuongSanPham = await sanPhamModel.countDocuments({ danhMuc: danhSachDanhMuc[i].maDanhMuc });
                danhSachDanhMuc[i].soLuongSanPham = soLuongSanPham;
            }
            return danhSachDanhMuc;
        },
        danhSachDanhMucChoNguoiDung: async () => {
            // loai bo danh muc "DMXOA"
            const danhSachDanhMuc = await danhMucModel.find({ maDanhMuc: { $ne: "DMXOA" } });
            return danhSachDanhMuc;
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
        danhSachTinhTpDayDu: (parent, args) => {
            try {
                const tinhData = fs.readFileSync('addressData/tinh_tp_day_du.json', 'utf8');
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
        danhSachNhaCungCap: async () => {
            const danhSachNhaCungCap = await nhapCungCapModel.find();
            return danhSachNhaCungCap;
        },      
    },
    DonHang: {
        danhSachSanPham: async (parent) => {
            const danhSachSanPham = await sanPhamDaMuaModel.find({ _id: { $in: parent.danhSachSanPham } });
            return danhSachSanPham;
        }
    },
    SanPham: {
        danhMuc: async (parent) => {
            const danhSachDanhMuc = await danhMucModel.findOne({maDanhMuc: parent.danhMuc});
            return danhSachDanhMuc;
        },
    },
    NhaCungCap: {
        danhSachDanhMuc: async (parent) => {
            //tìm theo id danh mục
            const danhSachDanhMuc = await danhMucModel.find({ _id: { $in: parent.danhSachDanhMuc } });
            return danhSachDanhMuc;
        }
    },
    Mutation:{
        themDanhMuc: async (parent, args) => {
            const danhMucCuoi = await danhMucModel.findOne({ maDanhMuc: { $ne: "DMXOA" } }).sort({ _id: -1 }).exec();
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
        capNhatDanhMuc: async (parent, args) => {
            const danhMuc = await danhMucModel.findOneAndUpdate({ _id: args.id }, { tenDanhMuc: args.tenDanhMuc }, { new: true });
            return danhMuc;
        },
        xoaDanhMuc: async (parent, args) => {
            const danhMuc = await danhMucModel.findOneAndDelete({ _id: args.id });
            //tìm tất cả sản phẩm thuộc danhMuc và chuyến danh mục của nó thành "DMXOA" và trang thái thành "Ngừng kinh doanh"
            await sanPhamModel.updateMany({ danhMuc: danhMuc.maDanhMuc }, { danhMuc: "DMXOA", trangThai: "Ngừng kinh doanh" });
            return 'Xóa danh mục thành công';
        },
        xoaSanPham: async (parent, args) => {
            // tìm sanPham theo id và chuyển trạng thái thành "Ngừng kinh doanh" và chuyển danh mục thành "DMXOA"
            const sanPham = await sanPhamModel.findOneAndUpdate({ _id: args.id }, { trangThai: "Ngừng kinh doanh", danhMuc: "DMXOA" }, { new: true });
            return 'Xóa sản phẩm thành công';
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
            trangThai: "Ngừng kinh doanh",
            soLuong: 0
        });
        return await sanPham.save();
        },
        capNhatSanPham: async (parent, args) => {
            // nếu args.hinhAnh có chưa http thì xóa httt. ví dụ: http://localhost:3000/uploads/SP1.jpg -> /uploads/SP1.jpg. slip("/")
            if (args.hinhAnh.includes("http")) {
                args.hinhAnh = '/' +  args.hinhAnh.split("/").slice(3).join("/");
            }
            const sanPham = await sanPhamModel.findOneAndUpdate({ _id: args.id }, args, { new: true });
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
            donHang.trangThai = "Đang xử lý";
            donHang.ngayDatHang = Date.now();
            // nếu args.thoiGianGiaoHang = "Càng sớm càng tốt" thì lấy Date.now() + 2 giờ ngược lại lấy args.thoiGianGiaoHang
            donHang.thoiGianGiaoHang = args.thoiGianGiaoHang == 'Càng sớm càng tốt' ? Date.now() + 2 * 60 * 60 * 1000 : args.thoiGianGiaoHang;
            const danhSachSanPham = JSON.parse(args.danhSachSanPham)
            console.log(danhSachSanPham);
            let danhSachIdSanPhamDaMua = [];  
            try{
                for (let i = 0; i < danhSachSanPham.length; i++) {
                    const sanPhamDaMua = new sanPhamDaMuaModel(danhSachSanPham[i]);
                    sanPhamDaMua.loaiDe = JSON.stringify(danhSachSanPham[i]?.loaiDe) || null;
                    sanPhamDaMua.kichThuoc = JSON.stringify(danhSachSanPham[i]?.kichThuoc) || null;
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
        },
        themNhaCungCap: async (parent, args) => {
            const nhaCungCapCuoi = await nhapCungCapModel.findOne().sort({ _id: -1 }).exec();
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
            console.log(args);
            const nhaCungCap = await nhapCungCapModel.findOneAndUpdate({ _id: args.id }, args, { new: true });
            return nhaCungCap;
        },
    }
};