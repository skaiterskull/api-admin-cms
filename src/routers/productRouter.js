import express from 'express'
import slugify from 'slugify'
const Router = express.Router()
import {
  createProduct,
  getProduct,
  getSingleProduct,
  getSingleProductById,
  updateProduct,
  updateProductById,
  deleteProductById,
} from '../models/product/Product.model.js'
import {
  newProductFormValidaton,
  updateProductFormValidaton,
} from '../middlewares/productValidation.middleware.js'

//Get all or single products
Router.get('/:slug?', async (req, res) => {
  try {
    const { slug } = req.params

    let result = null
    if (slug) {
      result = await getSingleProduct({ slug })
    } else {
      result = await getProduct()
    }

    res.json({
      status: 'Success',
      message: 'Product is found',
      result,
    })
  } catch (error) {
    res.json({
      status: 'Error',
      message: error.message,
    })
  }
})

//Create new product
Router.post('/', newProductFormValidaton, async (req, res) => {
  try {
    //create slug

    const { title } = req.body
    const slug = slugify(title, { lower: true })

    const result = await createProduct({ ...req.body, slug })
    if (result._id) {
      return res.json({
        status: 'Success',
        message: 'Product has been created.',
      })
    }

    res.json({
      status: 'Error',
      message: 'Unable to create product. Please try again later.',
    })
  } catch (error) {
    if (error.message.includes('E11000')) {
      return res.json({
        status: 'Error',
        message: 'Product is already exist.',
      })
    }
    res.json({
      status: 'Error',
      message: error.message,
    })
  }
})

//Update product
Router.put('/', updateProductFormValidaton, async (req, res) => {
  try {
    const { _id, ...product } = req.body
    const result = await updateProductById(_id, product)
    if (result?._id) {
      return res.json({
        status: 'Success',
        message: 'The product has been updated.',
      })
    }

    res.json({
      status: 'Error',
      message: 'Unable to update the product.',
    })
  } catch (error) {
    res.json({
      status: 'Error',
      message: error.message,
    })
  }
})

//Delete product
Router.delete('/:_id?', async (req, res) => {
  try {
    const { _id } = req.params
    const product = await deleteProductById(_id)
    if (product?._id) {
      return res.json({
        status: 'Success',
        message: 'Product has been deleted',
      })
    }

    //1. server side validation
    //2. store product in the db

    res.json({
      status: 'Error',
      message: 'Unable to delete the product, please try again later.',
    })
  } catch (error) {
    res.json({
      status: 'Error',
      message: error.message,
    })
  }
})

export default Router
