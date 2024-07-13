import mongoose from 'mongoose'


const DanhMucSchema = new mongoose.Schema({
    maDanhMuc: {
        type: String,
    },
    tenDanhMuc: {
        type: String,
    }
},{timestamps: true});

const danhMucModel = mongoose.model('DanhMuc',DanhMucSchema);
export default danhMucModel;