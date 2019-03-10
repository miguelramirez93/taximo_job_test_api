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
        },
        excercice_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        n_shop: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            timestamps: false,
            schema: 'fish',
            tableName: 'node'
        });
    nodeModel.associate = models => {
        nodeModel.hasMany(models.excercice, { as: 'excercice', foreignKey: 'id', sourceKey: 'excercice_id' })

    }
    return nodeModel
};

