const express = require('express')
const vehicleRouter = express.Router();
const vehicleController = require('../controller/vehicle.controller')

/*GET routes*/
vehicleRouter.get('/', vehicleController.getAllVehicles)
vehicleRouter.get('/status', vehicleController.getVehicleStatuses)
vehicleRouter.get('/typestatus/:type/:status', vehicleController.getVehicleByTypeStatus)
vehicleRouter.get('/type', vehicleController.getVehicleTypes)
vehicleRouter.get('/:id', vehicleController.getVehicle)

/*POST routes*/
vehicleRouter.post('/', vehicleController.createVehicle)

/*PUT routes*/
vehicleRouter.put('/', vehicleController.updateVehicle)

/*DELETE routes*/
vehicleRouter.delete('/:id', vehicleController.deleteVehicle)

module.exports = vehicleRouter;