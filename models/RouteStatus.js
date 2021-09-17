const {Model, Sequelize} = require('sequelize');
const sequelize = require('../db/db');

class RouteStatus extends Model {
}

RouteStatus.init(
    {
        status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'route_statuses',
        tableName: 'route_statuses',
        createdAt: false,
        updatedAt: false
    }
);

module.exports = RouteStatus;