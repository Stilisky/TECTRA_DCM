const mongoose =require('mongoose')

const venteSchema = new mongoose.Schema({
   produit: {
      type: String,
      require: true
   },
   quantity: {
      type: Number,
      require: true
   },
   price: {
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
   client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
   },
   commercial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }
})

module.exports = mongoose.model('Vente', venteSchema)