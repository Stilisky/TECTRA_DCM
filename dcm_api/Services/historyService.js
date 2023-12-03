const historyModel = require('../models/History')

const createHistory = async (hist) => {
   const his = new historyModel(hist)
   const his1 = await his.save()
   return await getHistory(his1._id)
}

const getHistory = async (histId) => {
   const his = await historyModel.findById(histId)
   return his;
}

const deleteHistory = async (histId) => {
   return await historyModel.findByIdAndDelete(histId)
}

module.exports = {
   createHistory,
   getHistory,
   deleteHistory
}