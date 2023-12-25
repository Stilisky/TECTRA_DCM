const ZoneService = require('../Services/zoneService')

const createZone = async (req, res) => {
   try {
      const zone = await ZoneService.createZone(req.body)
      if(zone){
         res.status(201).json(zone)
      } else {
         res.status(400).send("Bad Params")
      }
   } catch (error) {
      res.status(500).send("Internal server error")
   }
}

const getZones = async (req, res) => {
   try {
      const zone = await ZoneService.getZones()
      res.status(202).json(zone)
   } catch (error) {
      res.status(500).send("Internal server error")
   }
}

module.exports = {
   createZone,
   getZones
}