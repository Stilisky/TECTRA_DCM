const venteService = require('../Services/venteService')
const userService = require('../Services/userServices')

const getVentes = async (req, res) => {
   try {
      const sales = await venteService.getVentes()
      res.status(200).json(sales)
   } catch (error) {
      res.status(500).json({message: "Internal server error"})
   }
}

const getVente = async (req, res) => {
   try {
      const sale = await venteService.getVente(req.params.venteId)
      if(sale) {
         res.status(200).json(sale)
      } else {
         res.status(400).json({message: "Vente not found"})
      }
   } catch (error) {
      res.status(500).json({message: "Internal server error"})
   }
}

const updateVente = async (req, res) => {
   try {
      const sale = await venteService.updateVente(req.params.venteId, req.body)
      if(sale) {
         res.status(201).json(sale)
      } else {
         res.status(400).json({message: "Vente not found"})
      }
   } catch (error) {
      res.status(500).json({message: "Internal server error"})
   }
}

const deleteVente = async (req, res) => {
   try {
      const sale = await venteService.deleteVente(req.params.venteId)
      if(sale) {
         res.status(200).json({message: "Vente has been deleted"})
      } else {
         res.status(400).json({message: "Vente doesn't exist"})
      }
   } catch (error) {
      res.status(500).json({message: "Internal server error"})
   }
}

const createVente = async (req, res) => {
   try {
      const {client, produit, quantity, price } = req.body
      const comId = req.params.userId
      const user = await userService.getUser(comId)
      let sellingPrice = 0
      if(client && produit && quantity && price) {
         sellingPrice = price * quantity
         const model = {
            client: client,
            produit: produit,
            quantity: quantity,
            price: price,
            sellingPrice: sellingPrice,
            commercial: user
         }
         const vente = await venteService.createVente(model)
         await mapVenteToUSer(comId, vente)
         res.status(201).json(vente)
      } else {
         res.status(400).json({message: "All fields are required"})
      }
   } catch (error) {
      res.status(400).json(error)
   }
}

const mapVenteToUSer = async (comId, vente) => {
   try {
      const user = await userService.getUser(comId)
      user.ventes.push(vente)
      await userService.updateUser(comId, user)
   } catch (error) {
      console.log(error);
   }
}


module.exports = {
   getVente,
   getVentes,
   createVente,
   updateVente,
   deleteVente
}