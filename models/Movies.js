const { DataTypes } = require ('sequelize');
const sequelize = require('../config/connection');

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Movie;
