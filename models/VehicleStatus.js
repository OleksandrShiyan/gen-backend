const {Model, Sequelize} = require('sequelize');
const sequelize = require('../db/db');

class VehicleStatus extends Model {
}

VehicleStatus.init(
    {
        status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'vehicle_statuses',
        tableName: 'vehicle_statuses',
        createdAt: false,
        updatedAt: false
    }
);

module.exports = VehicleStatus;