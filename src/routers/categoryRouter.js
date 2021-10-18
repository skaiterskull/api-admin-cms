import express from 'express'
const Router = express.Router()
import slugify from 'slugify'
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from '../models/category/Category.model.js'
import {
  newCategoryValidation,
  updateCategoryValidation,
} from '../middlewares/validation.middleware.js'

Router.all('/', (req, res, next) => {
  next()
})

//Create Category
Router.post('/', newCategoryValidation, async (req, res) => {
  try {
    console.log(req.body)
    const { name, parentCat } = req.body
    // slugify
    const slug = slugify(name, { lower: true })
    const newCat = {
      name,
      slug,
      parentCat: parentCat ? parentCat : null,
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
    res.json({
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

Router.patch('/', updateCategoryValidation, async (req, res) => {
  try {
    const { parentCat } = req.body
    req.body.parentCat = parentCat ? parentCat : null
    const result = await updateCategory(req.body)
    if (result?._id) {
      return res.json({
        status: 'Success',
        message: 'Category has been updated',
      })
    }
    res.json({
      status: 'Error',
      message: 'Unable to update category, please try again later',
    })
  } catch (error) {
    console.log(error)
    res.json({
      status: 'Error',
      message: "Unable to process your request'",
    })
  }
})

//Fetch Category
Router.get('/', async (req, res) => {
  try {
    const result = await getCategory()
    res.json({
      status: 'Success',
      message: 'Request success',
      result,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'Error',
      message: 'Unable to process your request',
    })
  }
})
export default Router
