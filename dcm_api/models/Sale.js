const mongoose =require('mongoose')

const saleSchema = new mongoose.Schema({
   status: {
      type: String,
      enum: ['saved', 'unsaved'],
      default: 'unsaved'
   },
   sellingPrice: {
      type: Number
   },
   created_at: {
      type: Date,
      default: Date.now()
   },
   histories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'History'
   }],
   client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
   },
   commercial: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }]
})

module.exports = mongoose.model('Sale', saleSchema)