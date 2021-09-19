const HttpStatus = require('http-status-codes');
const vehicleService = require('../services/vehicle.service')

class VehicleController {
  async getAllVehicles(req, res) {
    try {
      const vehicles = await vehicleService.getVehicles();

      return res.status(HttpStatus.OK).json({ message: 'All vehicles:', vehicles });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async getVehicle(req, res) {
    try {
      const id = req.params.id;
      const vehicle = await vehicleService.getVehicle(id);

      return res.status(HttpStatus.OK).json({ message: `Vehicle with id:${id}`, vehicle });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async getVehicleTypes(req, res) {
    try {
      const vehicleTypes = await vehicleService.getVehicleTypes();

      return res.status(HttpStatus.OK).json({ message: `Vehicle types`, vehicleTypes });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async getVehicleStatuses(req, res) {
    try {
      const vehicleStatuses = await vehicleService.getVehicleStatuses();

      return res.status(HttpStatus.OK).json({ message: `Vehicle statuses:`, vehicleStatuses });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async getVehicleByTypeStatus(req, res) {
    try {
      const {type, status} = req.params
      const vehicles = await vehicleService.getVehiclesByTypeStatus(type, status);

      return res.status(HttpStatus.OK).json({ message: `Vehicles:`, vehicles });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async createVehicle(req, res) {
    try {
      const { plate_number, model, type, purchase_date, mileage, status } = req.body;
      const vehicleObj = {
        plate_number,
        model,
        type,
        purchase_date,
        mileage,
        status,
      };
      const vehicle = await vehicleService.createVehicle(vehicleObj);

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Vehicle successfully created', vehicle });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async updateVehicle(req, res) {
    try {
      const { plate_number, model, type, purchase_date, mileage, status, id } = req.body;
      const vehicleObj = {
        plate_number,
        model,
        type,
        purchase_date,
        mileage,
        status,
      };
      const updatedVehicle = vehicleService.updateVehicle(id, vehicleObj)

      return res.status(HttpStatus.OK).json({ message: 'Vehicle successfully updated', updatedVehicle });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async deleteVehicle(req, res) {
    try {
      const id = req.params.id;
      const deletedVehicle = await vehicleService.deleteVehicle(id);

      return res.status(HttpStatus.OK).json({ message: 'Vehicle successfully removed', deletedVehicle });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }
}

module.exports = new VehicleController();
