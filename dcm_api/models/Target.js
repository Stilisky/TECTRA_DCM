const mongoose =require('mongoose')

const targetSchema = new mongoose.Schema({
   targetProspect: {
      type: Number,
   },
   scheduledApointment: {
      type: String,
   },
   apointmentMade : {
      type: String
   },
   numberVisit : {
      type: Number
   },
   created_at: {
      type: Date,
      default: Date.now()
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }
})

module.exports = mongoose.model('Target', targetSchema)