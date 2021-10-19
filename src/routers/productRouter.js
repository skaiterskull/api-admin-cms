import express from 'express'
import slugify from 'slugify'
import multer from 'multer'

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

//multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let error = null
    //validation
    cb(error, 'public/img/products')
  },
  filename: function (req, file, cb) {
    const fileNameArg = file.originalname.split('.')
    const name = fileNameArg[0]
    const extension = fileNameArg[fileNameArg.length - 1]
    const uniqueVal = Date.now()

    const fileName = slugify(name) + uniqueVal + '.' + extension
    cb(null, fileName)
  },
})

const upload = multer({ storage: storage })

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
Router.post(
  '/',
  upload.array('images', 5),
  newProductFormValidaton,
  async (req, res) => {
    try {
      //handle images path
      const basePath = `${req.protocol}://${req.get('host')}/img/products/`
      let images = []
      const files = req.files
      files.length &&
        files.map((img) => {
          const fullPath = basePath + img.filename
          images.push(fullPath)
        })

      //create slug
      const { title } = req.body
      const slug = slugify(title, { lower: true })

      const result = await createProduct({ ...req.body, slug, images })
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
  }
)

//Update product
Router.put(
  '/',
  upload.array('images', 5),
  updateProductFormValidaton,
  async (req, res) => {
    try {
      //filtering image to delete
      const { imgToDelete, oldImages, _id, ...product } = req.body
      const filteredImgList = oldImages.filter(
        (row) => !imgToDelete.includes(row)
      )

      //handle images path
      const basePath = `${req.protocol}://${req.get('host')}/img/products/`
      let images = [...filteredImgList]
      const files = req.files
      console.log(files, 'fasdfadsfasd')
      files.length &&
        files.map((img) => {
          const fullPath = basePath + img.filename
          images.push(fullPath)
        })

      product.images = images
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
  }
)

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
