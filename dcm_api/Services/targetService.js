const targetModel = require('../models/Target')

const getTargets = async () => {
   const agencies = await targetModel.find().populate('user')
   return agencies;
}

const getTarget = async (targid) => {
   const agency = await targetModel.findById(targid).populate('user')
   return agency;
}

const createTarget = async (target) => {
   const ag = new targetModel(target)
   const newag = await ag.save()
   return await getTarget(newag._id)
}

const updateTarget = async (targetId, target) => {
   await targetModel.findByIdAndUpdate(targetId, target);
   return await getTarget(targetId)
}

const deleteTarget = async (targetId) => {
   return await targetModel.findByIdAndDelete(targetId)
}

module.exports = {
  getTargets,
  getTarget,
  createTarget,
  updateTarget,
  deleteTarget
}