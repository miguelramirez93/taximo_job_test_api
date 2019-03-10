module.exports = function (sequelize, DataTypes) {
    var excerciceModel = sequelize.define('excercice', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        n_shops: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        n_paths: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        n_fishtypes: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            timestamps: false,
            schema: 'fish',
            tableName: 'excercice'
        });
    
    return excerciceModel
};

