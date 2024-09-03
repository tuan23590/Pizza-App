import mongoose from 'mongoose'

const SanPhamDaMuaSchema = new mongoose.Schema({
    maSanPham: {
        type: String,
    },
    tenSanPham: {
        type: String,
    },
    kichThuoc: {
        type: String,
    },
    soLuong: {  
        type: Number,
    },
    moTa: {
        type: String,
    },
    hinhAnh: {
        type: String,
    },
    danhMuc: {
        type: String,
    },
    giaSanPham: {
        type: Number,
    },
    loaiDe: {
        type: String,
    },
    donViTinh: {
        type: String,
    },
    maDonHang: {
        type: String,
    }
},{timestamps: true});

const sanPhamDaMuaModel = mongoose.model('SanPhamDaMua',SanPhamDaMuaSchema);
export default sanPhamDaMuaModel;