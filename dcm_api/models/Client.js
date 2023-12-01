const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
   clientName : {
      type: String,
      required: true
   },
   entrepriseName : {
      type: String,
      required: true,
      unique: true
   },
   email : {
      type: String,
      unique: true
   },
   phone: {
      type: String,
      require: true,
      unique: true
   },
   adresse: {
      type: String,
      require: true
   },
   created_at: {
      type: Date,
      default: Date.now()
   },
   commercial : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   purchases : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sale'
   }]
})

module.exports = mongoose.model('Client', clientSchema)