const Vehicle = require('../models/Vehicle');
const VehicleStatus = require('../models/VehicleStatus');
const VehicleType = require('../models/VehicleType');

Vehicle.belongsTo(VehicleStatus, { foreignKey: 'status' });
VehicleStatus.hasOne(Vehicle, { foreignKey: 'status' });

Vehicle.belongsTo(VehicleType, { foreignKey: 'type' });
VehicleType.hasOne(Vehicle, { foreignKey: 'type' });

module.exports = {
  getVehicles: async () => {
    const vehicles = await Vehicle.findAll({
      include: [VehicleStatus, VehicleType],
    });
    return vehicles;
  },
  getVehicle: async (id) => {
    const vehicle = await Vehicle.findOne({
      where: { id },
      include: [VehicleStatus, VehicleType],
    });
    return vehicle;
  },
  getVehicleTypes: async () => {
    const vehicleTypes = await VehicleType.findAll();
    return vehicleTypes;
  },
  getVehicleStatuses: async () => {
    const vehicleStatuses = await VehicleStatus.findAll();
    return vehicleStatuses;
  },
  getVehiclesByTypeStatus: async (type, status) => {
    const vehicles = await Vehicle.findAll({ where: { type, status } });
    return vehicles;
  },
  createVehicle: async (vehicleObj) => {
    const newVehicle = new Vehicle(vehicleObj);
    const vehicle = await newVehicle.save();
    return vehicle;
  },
  updateVehicle: async (id, vehicleObj) => {
    const vehicle = await Vehicle.update(vehicleObj, { where: { id } });
    return vehicle;
  },
  deleteVehicle: async (id) => {
    const deletedVehicle = Vehicle.destroy({ where: { id } });
    return deletedVehicle;
  },
};
