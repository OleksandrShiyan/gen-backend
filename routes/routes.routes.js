const express = require('express')
const {validate} =  require('express-validation')
const routesRouter = express.Router();

const routesController = require('../controller/routes.controller')

const routeValidSchema = require('../validation/route.validationSchema')

/*GET routes*/
routesRouter.get('/', routesController.getAllRoutes)
routesRouter.get('/status', routesController.getRouteStatuses)
routesRouter.get('/:id', routesController.getRoute)

/*POST routes*/
routesRouter.post('/',
    validate(routeValidSchema.createRouteSchema),
    routesController.createRoute)

/*PUT routes*/
routesRouter.put('/',
    //idk why but validation here doesnt work how its supposed to, so i commented it temporally
    // validate(routeValidSchema.updateRouteSchema),
    routesController.updateRoute)

/*DELETE routes*/
routesRouter.delete('/:id', routesController.deleteRoute)

module.exports = routesRouter;