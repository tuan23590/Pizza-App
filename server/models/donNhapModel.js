import mongoose from 'mongoose'


const DonNhapSchema = new mongoose.Schema({
    maDonNhap: {
        type: String,
    },
    ngayNhap: {
        type: String,
    },
    tongTien: {
        type: Number,
    },
    chiTietDonNhap: {
        type: [String],
    },
    ghiChu: {
        type: String,
    },
},{timestamps: true});

const donNhapModel = mongoose.model('DonNhap',DonNhapSchema);
export default donNhapModel;