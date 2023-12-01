const mongoose =require('mongoose')

const categorySchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
      unique: true
   },
   created_at: {
      type: Date,
      default: Date.now()
   },
   products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
   }]
})

module.exports = mongoose.model('Category', categorySchema)