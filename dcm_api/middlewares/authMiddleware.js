const jwt = require('jsonwebtoken')
require('dotenv').config()

const authAdmin = async (req, res, next) => {
   try {
      let token = req.headers.authorization
      if (token) {
         token = token.slice(7, token.length)
         jwt.verify(token,process.env.SECRET_KEY, (err, decodedToken) => {
         if(err) {
            return res.status(401).json({message: 'Invalid token'})
         }
         else{
            if(decodedToken.role == "ADMIN") {
               req.params.userId = decodedToken.id
               next()
            }else {
               res.status(403).json({message: "You are not authorize to access"})
            }
         }
         })
      } else {
         res.status(401).json("Invalid token")
      }
   } catch (error) {
      res.status(401).json({message: "You are not authorize to access"})
   }
}

const authCommercial = async (req, res, next) => {
   try {
      let token = req.headers.authorization
      if (token) {
         token = token.slice(7, token.length)
         jwt.verify(token,process.env.SECRET_KEY, (err, decodedToken) => {
         if(err) {
            return res.status(401).json({message: 'Invalid token'})
         }
         else{
            if(decodedToken.role == "COMMERCIAL" && decodedToken.etatCompte == 'activé') {
               req.params.userId = decodedToken.id
               next()
            }else {
               res.status(403).json({message: "You are not authorize to access"})
            }
         }
         })
      } else {
         res.status(401).json("Invalid token")
      }
   } catch (error) {
      res.status(401).json({message: "You are not authorize to access"})
   }
}

const auth = async (req, res, next) => {
   try {
      let token = req.headers.authorization
      if (token) {
         token = token.slice(7, token.length)
         jwt.verify(token,process.env.SECRET_KEY, (err, decodedToken) => {
         if(err) {
            return res.status(401).json({message: 'Invalid token'})
         }
         else{
            if(decodedToken.role == "ADMIN" || decodedToken.role == "COMMERCIAL") {
               req.params.userId = decodedToken.id
               next()
            }else {
               res.status(403).json({message: "You are not authorize to access"})
            }
         }
         })
      } else {
         res.status(401).json("Invalid token")
      }
   } catch (error) {
      res.status(401).json({message: "You are not authorize to access"})
   }
}

module.exports = {
   authAdmin,
   authCommercial,
   auth
}