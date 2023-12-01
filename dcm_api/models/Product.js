const mongoose =require('mongoose')

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
      unique: true
   },
   price: {
      type: Number,
      require: true
   },
   quantity : {
      type: Number,
      require: true
   },
   availableQty: {
      type: Number,
      require: true
   },
   competitivePrice: {
      type: Number
   },
   users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   created_at: {
      type: Date,
      default: Date.now()
   },
   sales : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sale'
   }],
   category : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
   }
})

module.exports = mongoose.model('Product', productSchema)