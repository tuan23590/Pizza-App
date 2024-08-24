import mongoose from 'mongoose'


const DonNhapSchema = new mongoose.Schema({
    maDonNhap: {
        type: String,
    },
    ngayNhap: {
        type: Date,
    },
    nhaCungCap: {
        type: String,
    },
    tongTien: {
        type: Number,
    },
    trangThai: {
        type: String,
    },
    danhSachSanPham: {
        type: String,
    },
    ghiChu: {
        type: String,
    },
},{timestamps: true});

const donNhapModel = mongoose.model('DonNhap',DonNhapSchema);
export default donNhapModel;