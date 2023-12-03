const mongoose =require('mongoose')

const historySchema = new mongoose.Schema({
   product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
   },
   quantity: {
      type: Number,
      require: true
   },
   sale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sale'
   }
})

module.exports = mongoose.model('History', historySchema)