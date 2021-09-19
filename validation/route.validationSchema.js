const {Joi} = require('express-validation');
const validSchema = require('./index.validationSchema')

module.exports = {
    updateRouteSchema: {
        body: Joi.object({
            id: validSchema.numberGreaterZeroSchema,
            start_city: validSchema.stringRequiredSchema,
            end_city: validSchema.stringRequiredSchema,
            distance: validSchema.numberGreaterZeroSchema,
            departure_date: validSchema.dateRequiredSchema,
            requested_vehicle_type: validSchema.vehicleTypeSchema,
            expected_revenue: validSchema.numberGreaterZeroSchema,
            vehicle_id: validSchema.numberGreaterZeroSchema,
            status: validSchema.routeStatusSchema,
            completion_date: validSchema.dateOptionalSchema
        })
    },
    createRouteSchema: {
        body: Joi.object({
            start_city: validSchema.stringRequiredSchema,
            end_city: validSchema.stringRequiredSchema,
            distance: validSchema.numberGreaterZeroSchema,
            departure_date: validSchema.dateRequiredSchema,
            requested_vehicle_type: validSchema.vehicleTypeSchema,
            expected_revenue: validSchema.numberGreaterZeroSchema,
            vehicle_id: validSchema.numberGreaterZeroSchema,
            status: validSchema.routeStatusSchema,
            completion_date: validSchema.dateOptionalSchema
        })
    }
}