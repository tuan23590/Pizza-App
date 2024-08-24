import mongoose from 'mongoose'


const NhapCungCapSchema = new mongoose.Schema({
    maNhaCungCap: {
        type: String,
    },
    tenNhaCungCap: {
        type: String
    },
    soDienThoai: {
        type: String,
    },
    email: {
        type: String,
    },
    ghiChu: {
        type: String,
    },
    danhSachDanhMuc: {
        type: [String],
    },
    tinhTp: {
        type: String,
    },
    quanHuyen: {
        type: String,
    },
    xaPhuong: {
        type: String,
    },
    soNhaTenDuong: {
        type: String,
    },
},{timestamps: true});

const nhapCungCapModel = mongoose.model('NhapCungCap',NhapCungCapSchema);
export default nhapCungCapModel;