const productService = require('../Services/productService')
const categoryService = require('../Services/categoryService')

const getProducts = async (req, res) =>{
   try {
      const prods = await productService.getProducts()
      res.status(200).json(prods)
   } catch (error) {
      res.status(500).json({message: 'Internal server error'})
   }
}

const getProduct = async (req, res) => {
   try {
      const prod = await productService.getProduct(req.params.prodId)
      if(prod) {
         res.status(200).json(prod)
      } else {
         res.status(400).json({message: 'Product does not exist'})
      }
   } catch (error) {
      res.status(500).json({message: 'Internal server error'})
   }
}

const createProduct = async (req, res) => {
   try {
      const {name, price, quantity, availableQty} = req.body
      if(name && price && quantity && availableQty) {
         const prod = await productService.createProduct(req.body)
         const up = mapProdCategory(req.params.catId, prod)
         res.status(201).json(up)
      } else {
         res.status(400).json({message: "All fields are required"})
      }
   } catch (error) {
      res.status(400).json({error})
   }
}

const updateProduct = async (req, res) => {
   try {
      const prod = await productService.updateProd(req.params.prodId, req.body)
      if(prod) {
         res.status(201).json(prod)
      } else {
         res.status(400).json({message: "Product doesn't exist"})
      }
   } catch (error) {
      res.status(500).json(error)
   }
}

const deleteProduct = async (req, res) => {
   try {
      const prod = await productService.deleteProd(req.params.prodId)
      if(prod) {
         res.status(200).json({message: "Product deleted"})
      } else {
         res.status(400).json({message: "Product doesn't exist"})
      }
   } catch (error) {
      res.status(500).json(error)
   }
}

const mapProdCategory = async (catId, prod) => {
   const cat = await categoryService.getCategory(catId)
   cat.products.push(prod)
   await categoryService.updateCategory(catId, cat)
   prod.category = cat
   const up = await productService.updateProd(prod._id, prod)
   return up; 
}

module.exports = {
   getProducts,
   getProduct,
   updateProduct,
   createProduct,
   deleteProduct
}