const {Model, Sequelize} = require('sequelize');
const sequelize = require('../db/db');

class VehicleType extends Model {
}

VehicleType.init(
    {
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'vehicle_types',
        tableName: 'vehicle_types',
        createdAt: false,
        updatedAt: false
    }
);

module.exports = VehicleType;