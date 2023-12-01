const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
   name : {
      type: String,
      required: true
   },
   email : {
      type: String,
      required: true
   },
   phone: {
      type: String,
      require: true
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