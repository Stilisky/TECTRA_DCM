const clientModel = require('../models/Client')

const getClients = async () => {
   const clients = await clientModel.find().populate('commercial')
   return clients;
}

const getClient = async (ClientId) => {
   const client = await clientModel.findById(ClientId).populate('commercial')
   return client;
}

const getClientByName = async (name) => {
   const client = await clientModel.findOne({entrepriseName: name})
   return client;
}

const register = async (client) => {
   try {
      const newClient = new clientModel(client);
      const addClient = await newClient.save()
      const utilisateur = await getClient(addClient._id)
      return utilisateur;
   } catch (error) {
      console.log(error);
   }
}

const updateCleint = async (id, client) => {
   const upclient = await clientModel.findByIdAndUpdate(id, client)
   const utilisateur = await getUser(upclient._id)
   return utilisateur;
}

const deleteClient = async (id) => {
   const delUser = await clientModel.findByIdAndDelete(id)
   return delUser;
}

module.exports= {
   getClients,
   getClient,
   getClientByName,
   register,
   updateCleint,
   deleteClient
}