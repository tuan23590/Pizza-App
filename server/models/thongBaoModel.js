import mongoose from 'mongoose'


const ThongBaoSchema = new mongoose.Schema({
    noiDung: {
        type: String,
        required: true
    },
    nguoiNhan: {
        type: [String],
    },
    trangThai:{
        type: String,
        default: 'Chưa đọc',
    },
    hinhAnh: {
        type: String,
    },
},{timestamps: true});

const thongBaoModel = mongoose.model('ThongBao',ThongBaoSchema);
export default thongBaoModel;