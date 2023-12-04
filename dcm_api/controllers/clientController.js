const clientService = require('../Services/clientServices')
const userService = require('../Services/userServices')

const getClients = async (req, res) => {
   try {
      const clients = await clientService.getClients()
      res.status(200).json(clients)
   } catch (error) {
      res.status(500).json({message: 'Internal server error'})
   }
}

const getClient = async (req, res) => {
   try {
      const client = await clientService.getClient(req.params.clientId)
      if(client) {
         res.status(200).json(client)
      } else {
         res.status(400).json({message: "Client not found"})
      }
   } catch (error) {
      res.status(500).json({message: 'Internal server error'})
   }
}

const createClient = async (req, res) => {
   try {
      const {clientName, entrepriseName, email, phone, adresse} = req.body
      if(clientName && entrepriseName && email && phone && adresse) {
         const exist = await clientService.getClientByName(entrepriseName)
         if(exist) {
            res.status(400).json({message: "Client already exist"})
         } else {
            const user = await userService.getUser(req.params.userId)
            const model = {
               clientName: clientName,
               entrepriseName: entrepriseName,
               email: email,
               phone: phone,
               adresse: adresse,
               commercial: user
            }
            const cli = await clientService.register(model)
            await mapClientUser(req.params.userId, cli)
            res.status(201).json(cli)
         }
      } else {
         res.status(400).json({message: "All fields required"})
      }
   } catch (error) {
      res.status(500).json({message: "Internal server error"})
   }
}

const updateClient = async (req, res) => {
   try {
      const cli = await clientService.updateCleint(req.params.clientId, req.body)
      if(cli) {
         res.status(200).json(cli)
      } else {
         res.status(400).json({message: "Client not found"})
      }
   } catch (error) {
      res.status(500).json({message: "Internal server error"})
   }
}

const deleteClient = async (req, res) => {
   try {
      const cli = await clientService.deleteClient(req.params.clientId)
      if(cli) {
         res.status(200).json({message: "Client successfully deleted"})
      } else {
         res.status(400).json({message: "Client doesn't exist"})
      }
   } catch (error) {
      res.status(500).json({message: "Internal server error"})
   }
}

const mapClientUser = async (userId, client) => {
   try {
      const user = await userService.getUser(userId)
      user.clients.push(client);
      await userService.updateUser(userId, user)
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
   getClients,
   getClient,
   updateClient,
   deleteClient,
   createClient
}