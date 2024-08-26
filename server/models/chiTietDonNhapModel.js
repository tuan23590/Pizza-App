import mongoose from 'mongoose'

const ChiTietDonNhapSchema = new mongoose.Schema({
    sanPham: {
        type: String,
    },
    soLuong: {
        type: Number,
    },
    giaNhap: {
        type: Number,
    },
    nhaCungCap: {
        type: String,
    },
    ghiChu: {
        type: String,
    },
    thanhTien: {
        type: Number,
    },
},{timestamps: true});

const chiTietDonNhapModel = mongoose.model('ChiTietDonNhap',ChiTietDonNhapSchema);
export default chiTietDonNhapModel;