import mongoose from 'mongoose'


const KichThuocSchema = new mongoose.Schema({
    tenKichThuoc: {
        type: String,
    },
    giaKichThuoc: {
        type: Number,
    }
},{timestamps: true});

const kichThuocModel = mongoose.model('KichThuoc',KichThuocSchema);
export default kichThuocModel;