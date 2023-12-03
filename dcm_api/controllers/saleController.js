const saleService = require('../Services/saleService')
const userService = require('../Services/userServices')
const productService = require('../Services/productService')
const historyService = require('../Services/historyService')
const clientService = require('../Services/clientServices')

const getSales = async (req, res) => {
   try {
      const sales = await saleService.getSale()
      res.status(200).json(sales)
   } catch (error) {
      res.status(500).json({message: "Internal server error"})
   }
}

const getSale = async (req, res) => {
   try {
      const sale = await saleService.getSale(req.params.saleId)
      if(sale) {
         res.status(200).json(sale)
      } else {
         res.status(400).json({message: "Sale not found"})
      }
   } catch (error) {
      res.status(500).json({message: "Internal server error"})
   }
}

const updateSale = async (req, res) => {
   try {
      const sale = await saleService.updateSale(req.params.saleId, req.body)
      if(sale) {
         res.status(201).json(sale)
      } else {
         res.status(400).json({message: "Sale not found"})
      }
   } catch (error) {
      res.status(500).json({message: "Internal server error"})
   }
}

const deleteSale = async (req, res) => {
   try {
      const sale = await saleService.deleteSale(req.params.saleId)
      if(sale) {
         res.status(200).json({message: "Sale has been deleted"})
      } else {
         res.status(400).json({message: "Sale doesn't exist"})
      }
   } catch (error) {
      res.status(500).json({message: "Internal server error"})
   }
}

const createSale = async (req, res) => {
   try {
      const {sales} = req.body
      const clientId = req.params.clientId;
      const comId = req.params.userId
      const cli = await clientService.getClient(clientId)
      const user = await userService.getUser(comId)
      const listErrorr = []
      const histories = []
      let sellingPrice = 0
      if(sales && cli && user) {
         const sale = await saleService.createSale({status: 'unsaved'})
         sales.forEach(async element => {
            const prod = await productService.getProduct(element.product)
            if(prod) {
               if(prod.quantity >= element.quantity){
                  sellingPrice += (element.quantity * prod.price)
                  const model = {
                     product: prod,
                     quantity: element.quantity,
                     sale: sale
                  }
                  const hist = await historyService.createHistory(model)
                  histories.push(hist)
               } else {
                  listErrorr.push(`La quantité du produit ${prod.name} est insuffisante.`)
               }
            } else {
               listErrorr.push("Product not found")
            }
         });
         if(listErrorr.length == 0) {
            sale.sellingPrice = sellingPrice;
            sale.status = 'saved';
            sale.histories = histories;
            sale.client = cli;
            sale.commercial = user;
            const newSale = await saleService.updateSale(sale._id, sale)
            cli.purchases.push(newSale)
            await clientService.updateCleint(cli._id, cli)
            productQuantityUpdate(sales)
            res.status(201).json(newSale)
         } else {
            await saleService.deleteSale(sale._id)
            histories.forEach(async element => {
               await historyService.deleteHistory(element._id)
            });
            res.status(400).json(listErrorr)
         }
      } else {
         res.status(400).json({message: "Client or Products not found"})
      }
   } catch (error) {
      res.status(400).json(error)
   }
}

const productQuantityUpdate= async (sales) => {
   sales.forEach(async element => {
      const prod = await productService.getProduct(element.product)
      prod.quantity = prod.quantity - element.quantity
      await productService.updateProd(prod._id, prod)
   });
}

module.exports = {
   getSales,
   getSale,
   deleteSale,
   updateSale,
   createSale
}