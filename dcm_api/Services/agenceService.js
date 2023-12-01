const agencyModel = require('../models/Agency')

const getAgencies = async () => {
   const agencies = await agencyModel.find().populate('users')
   return agencies;
}

const getAgency = async (agencyId) => {
   const agency = await agencyModel.findById(agencyId).populate('users')
   return agency;
}

const createAgency = async (agency) => {
   const ag = new agencyModel(agency)
   const newag = await ag.save()
   return await getAgency(newag._id)
}

const updateAgency = async (agencyId, agency) => {
   const upAg = await agencyModel.findByIdAndUpdate(agencyId, agency);
   return await getAgency(agencyId)
}

const deleteAgency = async (agencyId) => {
   return await agencyModel.findByIdAndDelete(agencyId)
}

module.exports = {
   getAgencies,
   getAgency,
   createAgency,
   deleteAgency,
   updateAgency
}