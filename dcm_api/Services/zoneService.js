const zoneModel = require('../models/Zone')

const getZones = async () => {
   const zones = await zoneModel.find();
   return zones;
}

const getZone = async (id) => {
   const zone = await zoneModel.findById(id);
   return zone
}

const createZone = async (zone) => {
   const zoneSave = new zoneModel(zone);
   return zoneSave.save()
}

module.exports = {
   getZone,
   getZones,
   createZone
}