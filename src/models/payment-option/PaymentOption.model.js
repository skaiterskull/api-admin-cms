import PaymentOptionSchema from './PaymentOption.Schema.js'

export const createPaymentOption = (obj) => {
  return PaymentOptionSchema(obj).save()
}

export const getPaymentOptions = () => {
  return PaymentOptionSchema.find()
}

export const getAPaymentOption = (_id) => {
  return PaymentOptionSchema.findById(_id)
}

export const deletePaymentOption = (_id) => {
  return PaymentOptionSchema.findByIdAndDelete(_id)
}
