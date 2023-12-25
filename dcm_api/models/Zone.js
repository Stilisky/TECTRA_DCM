const mongoose = require('mongoose')

const zoneSchema = new mongoose.Schema({
   name : {
      type: String,
      required: true
   },   
   détaillents : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
   }]
})

module.exports = mongoose.model('Zone', zoneSchema)