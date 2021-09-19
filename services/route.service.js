const Route = require('../models/Route');
const RouteStatus = require('../models/RouteStatus');
const VehicleType = require('../models/VehicleType');
const Vehicle = require('../models/Vehicle');

Route.belongsTo(RouteStatus, { foreignKey: 'status' });
RouteStatus.hasOne(Route, { foreignKey: 'status' });

Route.belongsTo(VehicleType, { foreignKey: 'requested_vehicle_type' });
VehicleType.hasOne(Route, { foreignKey: 'requested_vehicle_type' });

Route.belongsTo(Vehicle, { foreignKey: 'status' });
Vehicle.hasOne(Route, { foreignKey: 'status' });

module.exports = {
  getRoutes: async () => {
    const routes = await Route.findAll({
      include: [RouteStatus, Vehicle, VehicleType],
    });
    return routes;
  },
  getRoute: async (id) => {
    const route = await Route.findOne({ where: { id } });
    return route;
  },
  getRouteStatuses: async () => {
    const routeStatuses = await RouteStatus.findAll();
    console.log('route statuses: ', routeStatuses)
    return routeStatuses;
  },
  createRoute: async (routeObj) => {
    const newRoute = new Route(routeObj);
    const route = await newRoute.save();
    return route;
  },
  updateRoute: async (id, status, vehicle_id, routeObj) => {
    const updatedRoute = await Route.update(routeObj, { where: { id } });
    if (+status === 2) {
      await Vehicle.update({ status: 2 }, { where: { id: vehicle_id } });
    } else if (+status === 3 || +status === 1) {
      await Vehicle.update({ status: 1 }, { where: { id: vehicle_id } });
    }
    return updatedRoute;
  },
  deleteRoute: async (id) => {
    const deletedRoute = await Route.destroy({ where: { id } });
    return deletedRoute;
  },
};