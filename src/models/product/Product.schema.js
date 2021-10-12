import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema({
  status: {
    type: Boolean,
    default: false,
    require: true,
  },
  title: {
    type: String,
    maxLength: 100,
    require: true,
  },
  slug: {
    type: String,
    maxLength: 120,
    default: '',
    require: true,
    unique: true,
    index: 1,
  },
  price: {
    type: Number,
    maxLength: 120,
    require: true,
  },
  qty: {
    type: Number,
    max: 10000,
    require: true,
  },
  brand: {
    type: String,
    maxLength: 30,
    default: '',
  },
  description: {
    type: String,
    maxLength: 3000,
    require: true,
  },
  categories: {
    type: Array,
    default: null,
  },
  salePrice: {
    type: Number,
    max: 10000,
    default: 0,
  },
  saleStartDate: {
    type: Date,
  },
  saleEndDate: {
    type: Date,
  },
  images: {
    type: Array,
    default: null,
  },
})

export default mongoose.model('Product', ProductSchema)
