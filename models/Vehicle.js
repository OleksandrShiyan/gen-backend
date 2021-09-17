const {Model, Sequelize} = require('sequelize');
const sequelize = require('../db/db');

class Vehicle extends Model {
}

Vehicle.init(
    {
        plate_number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        model: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        purchase_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        mileage: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'vehicles',
        tableName: 'vehicles',
        createdAt: false,
        updatedAt: false
    }
);

module.exports = Vehicle;