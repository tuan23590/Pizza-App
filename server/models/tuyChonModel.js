import mongoose from 'mongoose'


const TuyChonSchema = new mongoose.Schema({
    tenTuyChon: {
        type: String,
    },
    giaTuyChon: {
        type: Number,
    }
},{timestamps: true});

const tuyChonModel = mongoose.model('TuyChon',TuyChonSchema);
export default tuyChonModel;