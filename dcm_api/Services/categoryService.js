const categoryModel = require('../models/Category');

const getCategories = async () => {
   const cats = await categoryModel.find().populate('products')
   return cats;
}

const getCategory = async (catId) => {
   const cat = await categoryModel.findById(catId).populate('products')
   return cat;
}

const createCategory = async (cat) => {
   const catn = new categoryModel(cat)
   const newcat = await catn.save()
   return await getCategory(newcat._id)
}

const updateCategory = async (catId, cat) => {
   await categoryModel.findByIdAndUpdate(catId, cat);
   return await getCategory(catId)
}

const deleteCategory = async (catId) => {
   return await categoryModel.findByIdAndDelete(catId)
}

module.exports = {
   getCategories,
   getCategory,
   createCategory,
   updateCategory,
   deleteCategory
}