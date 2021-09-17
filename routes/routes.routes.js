const express = require('express')
const routesRouter = express.Router();

const routesController = require('../controller/routes.controller')

/*GET routes*/
routesRouter.get('/', routesController.getAllRoutes)
routesRouter.get('/status', routesController.getRouteStatuses)
routesRouter.get('/:id', routesController.getRoute)

/*POST routes*/
routesRouter.post('/', routesController.createRoute)

/*PUT routes*/
routesRouter.put('/', routesController.updateRoute)

/*DELETE routes*/
routesRouter.delete('/:id', routesController.deleteRoute)

module.exports = routesRouter;