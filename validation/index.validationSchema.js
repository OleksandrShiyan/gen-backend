const {Joi} = require('express-validation');

module.exports = {
    stringRequiredSchema: Joi.string().required().max(14),
    dateRequiredSchema: Joi.date().required(),
    dateOptionalSchema: Joi.date().optional(),
    numberGreaterZeroSchema: Joi.number().greater(0).required(),
    vehicleTypeSchema: Joi.number().greater(0).less(3).required(),
    routeStatusSchema: Joi.number().greater(0).less(4).required(),
}