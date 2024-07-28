import mongoose from 'mongoose'


const LoaiDeSchema = new mongoose.Schema({
    tenLoaiDe: {
        type: String,
    },
    giaLoaiDe: {
        type: Number,
    }
},{timestamps: true});

const loaiDeModel = mongoose.model('LoaiDe',LoaiDeSchema);
export default loaiDeModel;