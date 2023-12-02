const categoryService = require('../Services/categoryService')

const getCategories = async (req, res) => {
   try {
      const agencies = await categoryService.getCategories()
      res.status(200).json(agencies)
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}

const getCategory = async (req, res) => {
   try {
      const ag = await categoryService.getCategory(req.params.catId)
      if(ag){
         res.status(200).json(ag)
      } else {
         res.status(400).json({message: 'Category is not found'})
      }
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
} 

const createCategory = async (req, res) => {
   try {
      if(req.body.name) {
         const ag = await categoryService.createCategory(req.body)
         res.status(201).json(ag)
      } else {
         res.status(400).json({message: 'Category name is required'})
      }
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}

const updateCategory = async (req, res) => {
   try {
      const ag = await categoryService.updateCategory(req.params.catId, req.body)
      if(ag){
         res.status(201).json(ag)
      } else {
         res.status(400).json({message: 'Category not found'})
      }
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}

const deleteCategory = async (req, res) => {
   try {
      const ag = await categoryService.deleteCategory(req.params.catId)
      if(ag){
         res.status(200).json({message: 'Category succesffully delete'})
      } else {
         res.status(400).json({message: 'Category not found'})
      }
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}

module.exports = {
   getCategories,
   getCategory,
   createCategory,
   updateCategory,
   deleteCategory
}