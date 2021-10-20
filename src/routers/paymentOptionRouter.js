import express from 'express'
const Router = express.Router()
import {
  createPaymentOption,
  getPaymentOptions,
  getAPaymentOption,
  deletePaymentOption,
} from '../models/payment-option/PaymentOption.model.js'

Router.get('/', async (req, res) => {
  try {
    const result = await getPaymentOptions()
    res.json({
      status: 'Success',
      message: 'Feching data',
      result,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

Router.post('/', async (req, res) => {
  try {
    const result = await createPaymentOption(req.body)
    res.json({
      status: 'Success',
      message: 'Payment option has been added',
      result,
    })
  } catch (error) {
    console.log(error.message)

    res.json({
      status: 'error',
      message:
        'Error, unable to create new payment option, Please contact administration.',
    })
  }
})

Router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params
    const result = _id ? await deletePaymentOption(_id) : null
    if (result) {
      return res.json({
        status: 'Success',
        message: 'Payment option has been deleted',
      })
    }
    res.json({
      status: 'Success',
      message: 'Payment option not found',
    })
  } catch (error) {
    console.log(error.message)

    res.json({
      status: 'error',
      message:
        'Error, unable to delete the payment option, Please contact administration.',
    })
  }
})

export default Router
