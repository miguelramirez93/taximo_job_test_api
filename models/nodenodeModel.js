module.exports = function (sequelize, DataTypes) {
    var nodenodeModel = sequelize.define('nodeNode', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        origin_node: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        target_node: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weigth: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            timestamps: false,
            schema: 'fish',
            tableName: 'node_node'
        });
    nodenodeModel.associate = models => {
        nodenodeModel.hasMany(models.node, { as: 'target', foreignKey: 'id', sourceKey: 'target_node' })
        nodenodeModel.hasMany(models.node, { as: 'origin', foreignKey: 'id', sourceKey: 'origin_node' })

    }
    return nodenodeModel
};

