import mongoose from 'mongoose'

const DonHangSchema = new mongoose.Schema({
    maDonHang: {
        type: String,
    },
    tenKhachHang: {
        type: String,
    },
    soDienThoai: {
        type: String,
    },
    email: {
        type: String,
    },
    ngayDatHang: {
        type: String,
    },
    thoiGianGiaoHang: {
        type: String,
    },
    diaChiGiaoHang: {
        type: String,
    },
    ghiChuDiaChi: {
        type: String,
    },
    tamTinh: {
        type: Number,
    },
    giamGia: {
        type: Number,
    },
    tongTien: {
        type: Number,
    },
    phuongThucThanhToan: {
        type: String,
    },
    trangThai: {
        type: String,
    },
    danhSachSanPham: {
        type: [String],
    },

},{timestamps: true});

const donHangModel = mongoose.model('DonHang',DonHangSchema);
export default donHangModel;