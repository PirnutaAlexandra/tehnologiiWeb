const sequelize = require('../sqlite/sequelize');
const { DataTypes } = require('sequelize');
const University = sequelize.define('university', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    universityName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 20]
        }
    }
});

module.exports = University;