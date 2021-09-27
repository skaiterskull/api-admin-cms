import express from 'express'
const Router = express.Router()
import slugify from 'slugify'
import {
  createCategory,
  deleteCategory,
} from '../models/category/Category.model.js'
import { newCategoryValidation } from '../middlewares/validation.middleware.js'

Router.all('/', newCategoryValidation, (req, res, next) => {
  console.log('You have reached category API')
  next()
})

//Create Category
Router.post('/', async (req, res) => {
  try {
    const { name, parentCat } = req.body
    // slugify
    const slug = slugify(name, { lower: true })
    const newCat = {
      name,
      slug,
      parentCat,
    }

    //insert into database
    const result = await createCategory(newCat)

    //response to frontend
    if (result?._id) {
      return res.json({
        status: 'Success',
        message: 'New category has been added',
      })
    }
    res.json({
      status: 'Error',
      message: 'Unable to add category, please try again later',
    })
  } catch (error) {
    console.log(error)
    let msg = 'Unable to process your request'
    if (error.message.includes('E11000')) {
      msg = 'Category is already exist'
    }
    res.status(500).json({
      status: 'Error',
      message: msg,
    })
  }
})

//Delete Category
Router.delete('/:_id?', async (req, res) => {
  try {
    const { _id } = req.params
    if (_id) {
      const result = await deleteCategory(_id)
      if (result?._id) {
        return res.json({
          status: 'Success',
          message: 'Category has been deleted',
        })
      }
    }
    res.json({
      status: 'Error',
      message: 'Unable to delete category, please try again later',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'Error',
      message: "Unable to process your request'",
    })
  }
})

export default Router
