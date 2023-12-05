const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   name : {
      type: String,
      required: true
   },
   lastName : {
      type: String,
      required: true
   },
   email : {
      type: String,
      required: true,
      unique: true
   },
   password : {
      type: String,
      required: true
   },
   phone: {
      type: String,
      require: true
   },
   adress: {
      type: String,
      require: true
   },
   etatCompte: {
     type: String,
     enum:['activé', 'desactivé'],
     default: 'desactivé'      
   },
   created_at: {
      type: Date,
      default: Date.now()
   },
   role: {
      type: String,
      enum: ['ADMIN', 'COMMERCIAL'],
      default: 'COMMERCIAL'
   },
   agency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agency'
   },
   target: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Target'
   },
   clients : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
   }],
   ventes : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vente'
   }]
})

module.exports = mongoose.model('User', UserSchema)