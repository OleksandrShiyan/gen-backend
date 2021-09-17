const Vehicle = require('../models/Vehicle');
const VehicleStatus = require('../models/VehicleStatus')
const VehicleType = require('../models/VehicleType')
const HttpStatus = require('http-status-codes');

Vehicle.belongsTo(VehicleStatus, {foreignKey: 'status'})
VehicleStatus.hasOne(Vehicle, {foreignKey: 'status'})

Vehicle.belongsTo(VehicleType, {foreignKey: 'type'})
VehicleType.hasOne(Vehicle, {foreignKey: 'type'})

class VehicleController {
  async getAllVehicles(req, res) {
    try {
      const vehicles = await Vehicle.findAll({
        include: [VehicleStatus, VehicleType]
      });
      res.status(HttpStatus.OK).json({ message: 'All vehicles:', vehicles });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async getVehicle(req, res) {
    try {
      const id = req.params.id;
      const vehicle = await Vehicle.findOne({ where: { id }, include: [VehicleStatus, VehicleType] });
      res.status(HttpStatus.OK).json({ message: `Vehicle with id:${id}`, vehicle });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async getVehicleTypes(req, res) {
    try {
      const vehicleTypes = await VehicleType.findAll();
      res.status(HttpStatus.OK).json({ message: `Vehicle types`, vehicleTypes });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async getVehicleStatuses(req, res) {
    try {
      const vehicleStatuses = await VehicleStatus.findAll();
      res.status(HttpStatus.OK).json({ message: `Vehicle statuses:`, vehicleStatuses });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async getVehicleByTypeStatus(req, res) {
    try {
      const {type, status} = req.params
      const vehicles = await Vehicle.findAll({where: {type, status}});
      res.status(HttpStatus.OK).json({ message: `Vehicles:`, vehicles });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async createVehicle(req, res) {
    try {
      const { plate_number, model, type, purchase_date, mileage, status } = req.body;
      const newVehicle = new Vehicle({
        plate_number,
        model,
        type,
        purchase_date,
        mileage,
        status,
      });
      console.log('new vehicle:', newVehicle)
      const vehicle = await newVehicle.save();
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Vehicle successfully created', vehicle });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async updateVehicle(req, res) {
    try {
      const { plate_number, model, type, purchase_date, mileage, status, id } = req.body;
      await Vehicle.update(
        {
          plate_number,
          model,
          type,
          purchase_date,
          mileage,
          status,
        },
        { where: { id } },
      );
      return res.status(HttpStatus.OK).json({ message: 'Vehicle successfully updated' });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async deleteVehicle(req, res) {
    try {
      const id = req.params.id;
      await Vehicle.destroy({ where: { id } });
      return res.status(HttpStatus.OK).json({ message: 'Vehicle successfully removed' });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }
}

module.exports = new VehicleController();
