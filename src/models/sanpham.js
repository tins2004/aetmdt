import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const SanPhamSchema = new Schema({
    idDT: Number,
    TenDT: String,
    MoTa: String,
    Gia: Number,
    urlHinh: String,
    idLoai: Number
  });
  

SanPhamSchema.plugin(mongoosePaginate)

export default mongoose.model('sanpham', SanPhamSchema, 'sanpham_55')
  