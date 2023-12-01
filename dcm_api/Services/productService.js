const productModel = require('../models/Product')

const getProducts = async () => {
   const prods = await productModel.find().populate('category').populate('sales')
   return prods
}

const getProduct = async (prod_id) => {
   const prod = await productModel.findById(prod_id).populate('category').populate('sales')
   return prod
}

const createProduct = async (prod) => {
   const adprod = new productModel(prod)
   const sv = await adprod.save()
   return await getProduct(sv._id)
}

const updateProd = async (prod_id, prod) => {
   await productModel.findByIdAndUpdate(prod_id, prod)
   return await getProduct(prod_id)
}

const deleteProd = async (prod_id) => {
   return await productModel.findByIdAndDelete(prod_id)
}

module.exports = {
   getProducts,
   getProduct,
   createProduct,
   updateProd,
   deleteProd
}