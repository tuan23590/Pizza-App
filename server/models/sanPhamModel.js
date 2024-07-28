import mongoose from 'mongoose'

const SanPhamSchema = new mongoose.Schema({
    maSanPham: {
        type: String,
    },
    tenSanPham: {
        type: String,
    },
    kichThuoc: {
        type: [String],
    },
    ghiChu: {
        type: String,
    },
    moTa: {
        type: String,
    },
    hinhAnh: {
        type: String,
    },
    danhMuc: {
        type: [String],
    },
    giaSanPham: {
        type: Number,
    },
    trangThai: {
        type: String,
    },
    loaiDe: {
        type: [String],
    },
},{timestamps: true});

const sanPhamModel = mongoose.model('SanPham',SanPhamSchema);
export default sanPhamModel;