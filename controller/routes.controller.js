const HttpStatus = require('http-status-codes');

const routeService = require('../services/route.service');

class RoutesController {
  async getAllRoutes(req, res) {
    try {
      const routes = await routeService.getRoutes();

      return res.status(HttpStatus.OK).json({ message: 'All routes:', routes });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error has occurred: ', error });
    }
  }

  async getRoute(req, res) {
    try {
      const id = req.params.id;
      const route = await routeService.getRoute(id);

      return res.status(HttpStatus.OK).json({ message: `Route with id:${id}`, route });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async getRouteStatuses(req, res) {
    try {
      const routeStatuses = await routeService.getRouteStatuses();

      return res.status(HttpStatus.OK).json({ message: `Route statuses:`, routeStatuses });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
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
        status,
      } = req.body;
      const routeObj = {
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
        status,
      };
      const route = await routeService.createRoute(routeObj);

      return res.status(HttpStatus.CREATED).json({ message: 'Route successfully created', route });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
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
      const routeObj = {
        start_city,
        end_city,
        distance,
        departure_date,
        requested_vehicle_type,
        expected_revenue,
        vehicle_id,
        status,
        completion_date,
      };
      const updatedRoute = await routeService.updateRoute(id, status, vehicle_id, routeObj);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Route successfully updated', updatedRoute });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }

  async deleteRoute(req, res) {
    try {
      const id = req.params.id;
      const deletedRoute = await routeService.deleteRoute(id);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Route successfully removed', deletedRoute });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error has occurred: ', error });
    }
  }
}

module.exports = new RoutesController();
