import mongoose from 'mongoose'

const ChiTietSchema = new mongoose.Schema({
    tenChiTiet: {
        type: String,
    },
    loaiChiTiet: {
        type: String,
    },
},{timestamps: true});

const chiTietModel = mongoose.model('ChiTiet',ChiTietSchema);
export default chiTietModel;