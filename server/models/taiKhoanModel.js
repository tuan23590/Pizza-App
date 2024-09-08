import mongoose from 'mongoose'

const TaiKhoanSchema = new mongoose.Schema({
    uid: {
        type: String,
    },
    email: {
        type: String,
    },
    phanQuyen: {
        type: String,
    },
    hoTen: {
        type: String,
    },
    soDienThoai: {
        type: String,
    },
    diaChi: {
        type: String,
    },
    lanCuoiDangNhap: {
        type: String,
    },
},{timestamps: true});

const taiKhoanModel = mongoose.model('TaiKhoan',TaiKhoanSchema);
export default taiKhoanModel;