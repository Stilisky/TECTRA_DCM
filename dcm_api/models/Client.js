const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
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
      require: true
   },
   zone : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Zone'
   },
   adresse: {
      type: Object,
      require: true
   },
   created_at: {
      type: Date,
      default: Date.now()
   },
   distributions : [{
      type: Object
   }],
   commercial : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   purchases : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vente'
   }]
})

module.exports = mongoose.model('Client', clientSchema)