import mongoose from 'mongoose'

const SanPhamSchema = new mongoose.Schema({
    maSanPham: {
        type: String,
    },
    tenSanPham: {
        type: String,
    },
    tuyChon: {
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
    trangThai: {
        type: String,
    },
},{timestamps: true});

const sanPhamModel = mongoose.model('SanPham',SanPhamSchema);
export default sanPhamModel;