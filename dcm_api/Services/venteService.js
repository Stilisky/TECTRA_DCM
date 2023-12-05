const venteModel = require('../models/Vente')

const getVentes = async () => {
   const prods = await venteModel.find().populate('commercial')
   return prods
}

const getVente = async (vente_id) => {
   const sale = await venteModel.findById(vente_id).populate('commercial')
   return sale
}

const createVente = async (Vente) => {
   const adVente = new venteModel(Vente)
   const sv = await adVente.save()
   return await getVente(sv._id)
}

const updateVente = async (Vente_id, Vente) => {
   await venteModel.findByIdAndUpdate(Vente_id, Vente)
   return await getVente(Vente_id)
}

const deleteVente = async (Vente_id) => {
   return await venteModel.findByIdAndDelete(Vente_id)
}

module.exports = {
   getVentes,
   getVente,
   createVente,
   updateVente,
   deleteVente
}