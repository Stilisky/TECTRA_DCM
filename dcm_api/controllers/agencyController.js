const agencyService = require('../Services/agenceService')

const getAgencies = async (req, res) => {
   try {
      const agencies = await agencyService.getAgencies()
      res.status(200).json(agencies)
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}

const getAgency = async (req, res) => {
   try {
      const ag = await agencyService.getAgency(req.params.agencyId)
      if(ag){
         res.status(200).json(ag)
      } else {
         res.status(400).json({message: 'Agency is not found'})
      }
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
} 

const createAgency = async (req, res) => {
   try {
      if(req.body.name) {
         const ag = await agencyService.createAgency(req.body)
         res.status(201).json(ag)
      } else {
         res.status(400).json({message: 'Agency name is required'})
      }
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}

const updateAgency = async (req, res) => {
   try {
      const ag = await agencyService.updateAgency(req.params.agencyId, req.body)
      if(ag){
         res.status(201).json(ag)
      } else {
         res.status(400).json({message: 'Agency not found'})
      }
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}

const deleteAgency = async (req, res) => {
   try {
      const ag = await agencyService.deleteAgency(req.params.agencyId)
      if(ag){
         res.status(200).json({message: 'Agency succesffully delete'})
      } else {
         res.status(400).json({message: 'Agency not found'})
      }
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}

module.exports = {
   getAgencies,
   getAgency,
   createAgency,
   updateAgency,
   deleteAgency
}