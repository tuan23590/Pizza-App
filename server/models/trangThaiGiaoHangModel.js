import mongoose from 'mongoose'


const TrangThaiGiaoHangSchema = new mongoose.Schema({
    trangThai: {
        type: String,
    },
    thoiGian: {
        type: String,
    },
    lyDoHuyDonHang: {
        type: String,
    },
},{timestamps: true});

const trangThaiGiaoHangModel = mongoose.model('TrangThaiGiaoHang',TrangThaiGiaoHangSchema);
export default trangThaiGiaoHangModel;