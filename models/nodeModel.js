module.exports = function (sequelize, DataTypes) {
    var nodeModel = sequelize.define('node', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fishtypes: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            timestamps: false,
            schema: 'fish',
            tableName: 'node'
        });
    return nodeModel
};

