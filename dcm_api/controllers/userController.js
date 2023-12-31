const userService = require('../Services/userServices')
const agencyService = require('../Services/agenceService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { model } = require('mongoose')
require('dotenv').config()
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9\-']+$/;

const getUsers = async (req, res) => {
   try {
      const users = await userService.getUsers()
      res.status(200).json(users)
   } catch (error) {
      res.status(500).json({message: "Internal Server Error"})
   }
}

const getUser = async (req, res) => {
   try {
      const user = await userService.getUser(req.params.userId)
      res.status(200).json(user)
   } catch (error) {
      res.status(500).json({message: "Internal Server Error"})
   }
}

const register = async (req, res) => {
   try {
      const {name, lastName, phone, adress, email, password} = req.body
      if (name && lastName && email && password && phone && adress){
         if(emailRegex.test(email)){
            if(usernameRegex.test(name)){
               const newPassword = await bcrypt.hash(password, 13)
               const users = await userService.getUsers()
               var model;
               if(users.length != 0){
                  model = {
                     name: name,
                     lastName: lastName,
                     email: email,
                     password: newPassword,
                     phone: phone,
                     adress: adress,
                     etatCompte: 'activé'
                  }
               } else {
                  model = {
                     name: name,
                     lastName: lastName,
                     email: email,
                     password: newPassword,
                     phone: phone,
                     adress: adress,
                     etatCompte: 'activé',
                     role: 'ADMIN'
                  }
               }
               const exist = await userService.getUserByEmail(email)
               if(exist){
                  res.status(400).json({"message": "Email already exist"})
               } else {
                  const user = await userService.register(model)
                  res.status(201).json(user)
                  // if(agency){
                     //    await mapUserAgency(agency, user)
                  // }
               }
            } else {
               res.status(400).json({'message': 'Invalid Username format'})
            }
         } else {
            res.status(400).json({'message': 'Invalid Email format'})
         }
      } else {
         res.status(400).json({'message': 'All fields are required'})
      }
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}

const login = async (req, res) => {
   try {
      const {email, password} = req.body
      if(email && password) {
         const user = await userService.getUserByEmail(email)
         if(user) {
            const match = await bcrypt.compare(password, user.password)
            if(match){
               const token = jwt.sign(
                  {
                     id: user._id,
                     email: user.username,
                     role: user.role
                  },
                  process.env.SECRET_KEY,
                  {expiresIn: '8h'}
               )
               res.status(200).json({'email': user.email, 'name': user.name, 'lastName': user.lastName, adresse: user.adress, 'acces_token': token})
            } else {
               res.status(400).json({'message': 'Incorrect Email or Password'})
            }
         } else {
            res.status(401).json({'message': 'Incorrect Email or Password'})
         }
      } else {
         res.status(400).json({'message': 'All fields are required'})
      }
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}

const updateUser = async (req, res) => {
   try {
      const id = req.params.userId
      if(req.body.password) {
         req.body.password = bcrypt.hash(password, 13)
      }
      const user = await userService.updateUser(id, req.body)
      res.status(201).json(user)
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}
const compteStatusUpdate = async (req, res) => {
   try {
      const id = req.params.commercialId
      const com = await userService.getUser(id)
      if(com) {
         let model
         if(com.etatCompte == 'activé') {
            model = {
               etatCompte: 'desactivé'
            }
         } else {
            model = {
               etatCompte: 'activé'
            }
         }
         const user = await userService.updateUser(id, model)
         res.status(201).json(user)
      } else {
         res.status(400).json({message: "Bad Params"})
      }
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}

const deleteUser = async (req, res) => {
   try {
      const id = req.params.userId
      const user = await userService.deleteUser(id)
      if(user) {
         res.status(200).json({'message': 'User successfully deleted'})
      } else {
         res.status(400).json({'message': "User Doesn't exist"})
      }
   } catch (error) {
      res.status(500).json({'message': 'Internal Server Error'})
   }
}

const mapUserAgency = async (agencyId, user) => {
   try {
      const agency = await agencyService.getAgency(agencyId)
      agency.users.push(user)
      await agencyService.updateAgency(agency._id, agency)
      user.agency = agency
      await userService.updateUser(user._id, user)
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
   getUsers,
   getUser,
   register,
   login,
   deleteUser,
   updateUser,
   compteStatusUpdate
}