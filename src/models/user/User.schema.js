import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: 'inactive',
    },
    fname: {
      type: String,
      required: true,
      default: '',
      maxLength: 30,
    },
    lname: {
      type: String,
      required: true,
      default: '',
      maxLength: 30,
    },
    dob: {
      type: Date,
      default: null,
    },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      unique: true,
      index: 1,
    },
    isEmailConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
      default: '',
      minLength: 6,
    },
    phone: {
      type: String,
      default: '',
      maxLength: 15,
    },
    address: {
      type: String,
      default: '',
      maxLength: 50,
    },
    gender: {
      type: String,
      default: '',
      maxLength: 6,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', userSchema)
