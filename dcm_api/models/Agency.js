const mongoose =require('mongoose')

const agencySchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
      unique: true
   },
   created_at: {
      type: Date,
      default: Date.now()
   },
   users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }]
})

module.exports = mongoose.model('Agency', agencySchema)