const {Joi} = require('express-validation');
const validSchema = require('./index.validationSchema')

module.exports = {
    createVehicleSchema: {
        body: Joi.object({
            plate_number: validSchema.stringRequiredSchema,
            model: validSchema.stringRequiredSchema,
            type: validSchema.vehicleTypeSchema,
            purchase_date: validSchema.dateRequiredSchema,
            mileage: validSchema.numberGreaterZeroSchema,
            status: validSchema.vehicleTypeSchema
        })
    },
    updateVehicleSchema: {
        body: Joi.object({
            id: validSchema.numberGreaterZeroSchema,
            plate_number: validSchema.stringRequiredSchema,
            model: validSchema.stringRequiredSchema,
            type: validSchema.vehicleTypeSchema,
            purchase_date: validSchema.dateRequiredSchema,
            mileage: validSchema.numberGreaterZeroSchema,
            status: validSchema.vehicleTypeSchema
        })
    }
}