const Route = require('../models/Route');
const RouteStatus = require('../models/RouteStatus')
const VehicleType = require('../models/VehicleType')
const Vehicle = require('../models/Vehicle');
const HttpStatus = require('http-status-codes');

Route.belongsTo(RouteStatus, {foreignKey: 'status'})
RouteStatus.hasOne(Route, {foreignKey: 'status'})

Route.belongsTo(VehicleType, {foreignKey: 'requested_vehicle_type'})
VehicleType.hasOne(Route, {foreignKey: 'requested_vehicle_type'})

Route.belongsTo(Vehicle, {foreignKey: 'status'})
Vehicle.hasOne(Route, {foreignKey: 'status'})


class RoutesController {
  async getAllRoutes(req, res) {
    try {
      const routes = await Route.findAll({
        include: [RouteStatus, Vehicle, VehicleType]
      });
      res.status(HttpStatus.OK).json({ message: 'All routes:', routes });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error has occurred: ', error });
    }
  }

  async getRoute(req, res) {
    try {
      const id = req.params.id;
      const route = await Route.findOne({ where: { id } });
      res.status(HttpStatus.OK).json({ message: `Route with id:${id}`, route });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async getRouteStatuses(req, res) {
    try {
      const routeStatuses = await RouteStatus.findAll();
      res.status(HttpStatus.OK).json({ message: `Route statuses:`, routeStatuses });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async createRoute(req, res) {
    try {
      const {
        start_city,
        end_city,
        distance,
        departure_date,
        vehicle_type,
        expected_revenue,
        vehicle_id,
        route_status,
        completion_date,
        requested_vehicle_type,
        status

      } = req.body;
      const newRoute = new Route({
        start_city,
        end_city,
        distance,
        departure_date,
        vehicle_type,
        expected_revenue,
        vehicle_id,
        route_status,
        completion_date,
        requested_vehicle_type,
        status
      });
      console.log('new route: ', newRoute)
      const route = await newRoute.save();
      return res.status(HttpStatus.CREATED).json({ message: 'Route successfully created', route });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async updateRoute(req, res) {
    try {
      const {
        start_city,
        end_city,
        distance,
        departure_date,
        requested_vehicle_type,
        expected_revenue,
        vehicle_id,
        status,
        completion_date,
        id,
      } = req.body;
      console.log('route obj: ', {start_city,
        end_city,
        distance,
        departure_date,
        requested_vehicle_type,
        expected_revenue,
        vehicle_id,
        status,
        completion_date,
        id,})
      const result = await Route.update(
        {
          start_city,
          end_city,
          distance,
          departure_date,
          requested_vehicle_type,
          expected_revenue,
          vehicle_id,
          status,
          completion_date,
        },
        { where: { id } },
      );
      if (+status === 2){
        const result = await Vehicle.update({status: 2}, {where: {id: vehicle_id}})
      } else if (+status === 3 || +status === 1) {
        const result = await Vehicle.update({status: 1}, {where: {id: vehicle_id}})
      }
      return res.status(HttpStatus.OK).json({ message: 'Route successfully updated' });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async deleteRoute(req, res) {
    try {
      const id = req.params.id;
      await Route.destroy({ where: { id } });
      return res.status(HttpStatus.OK).json({ message: 'Route successfully removed' });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }
}

module.exports = new RoutesController();
