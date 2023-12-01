const mongoose =require('mongoose')

const saleSchema = new mongoose.Schema({
   soldQty: {
      type: Number,
      require: true
   },
   sellingPrice: {
      type: Number,
      require: true
   },
   created_at: {
      type: Date,
      default: Date.now()
   },
   product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
   },
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