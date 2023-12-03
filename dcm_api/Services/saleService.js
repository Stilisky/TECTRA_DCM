const saleModel = require('../models/Sale')

const getSales = async () => {
   const prods = await saleModel.find().populate('client').populate('commercial').populate('products')
   return prods
}

const getSale = async (sale_id) => {
   const sale = await saleModel.findById(sale_id).populate('client').populate('commercial').populate('products')
   return sale
}

const createSale = async (sale) => {
   const adsale = new saleModel(sale)
   const sv = await adsale.save()
   return await getSale(sv._id)
}

const updateSale = async (sale_id, sale) => {
   await saleModel.findByIdAndUpdate(sale_id, sale)
   return await getSale(sale_id)
}

const deleteSale = async (sale_id) => {
   return await saleModel.findByIdAndDelete(sale_id)
}

module.exports = {
   getSales,
   getSale,
   createSale,
   updateSale,
   deleteSale
}