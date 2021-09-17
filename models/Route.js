const {Model, Sequelize} = require('sequelize');
const sequelize = require('../db/db');

class Route extends Model {
}

Route.init(
    {
        start_city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        end_city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        distance: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        departure_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        requested_vehicle_type: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        expected_revenue: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        vehicle_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        completion_date: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'routes',
        tableName: 'routes',
        createdAt: false,
        updatedAt: false
    }
);

module.exports = Route;