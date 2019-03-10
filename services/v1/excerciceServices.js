const responseTempl = require('../../lib/responseTemplate')
module.exports = {
    async saveExcercice(ctx) {
        try {
            let excerciceData = ctx.request.body

            if (excerciceData == null || excerciceData == undefined) {
                throw Error('No data found')
            }
            resul = await ctx.app.db.sequelize.transaction().then(async t => {
                try {
                    //save exercice data
                    const excerciceCreated = await ctx.app.db.excercice.create(excerciceData.excercice, { transaction: t })
                    //save nodes whit out relations
                    for (let i = 0; i < excerciceData.shopsFishTypesInfo.length; i++) {
                        const nodeInfo = excerciceData.shopsFishTypesInfo[i];

                        const nodeObj = {
                            n_shop: i + 1,
                            fishtypes: nodeInfo[1],
                            excercice_id: excerciceCreated.id
                        }
                        const nodeCreated = await ctx.app.db.node.create(nodeObj, { transaction: t })
                        nodeInfo.push(nodeCreated.id)

                    }

                    //save relation between nodes
                    for (let i = 0; i < excerciceData.shopsConnInfo.length; i++) {
                        const connInfo = excerciceData.shopsConnInfo[i];
                        const nodeNodeObj = {
                            origin_node: excerciceData.shopsFishTypesInfo[connInfo[0] - 1][2],
                            target_node: excerciceData.shopsFishTypesInfo[connInfo[1] - 1][2],
                            weigth: connInfo[2],
                        }
                        const nodenodeCreated = await ctx.app.db.nodeNode.create(nodeNodeObj, { transaction: t })

                    }

                    t.commit()
                    ctx.body = responseTempl.getresponseTemplate('Registrado Correctamente', 'success')

                } catch (error) {
                    t.rollback()
                    throw new Error("Error al registrar los datos")
                }

            })

        } catch (error) {
            ctx.status = 500
            ctx.body = responseTempl.getresponseTemplate(error.message, 'error')
        }
    },
    async getExcerciceInfo(ctx) {
        try {
            let excerciceId = ctx.params.id
            const excercice = await ctx.app.db.excercice.findById(excerciceId)
            const nodeInfo = await ctx.app.db.node.findAll({
                where: {
                    excercice_id: excercice.id
                }
            })
            let shopsInfo = []
            for (let i = 0; i < nodeInfo.length; i++) {
                const node = nodeInfo[i];
                const numFishTypes = node.fishtypes.split(' ').length
                let value = [numFishTypes, node.fishtypes]
                shopsInfo.push(value)
            }
            const nodenodeInfo = await ctx.app.db.nodeNode.findAll({
                include: [{
                    model: ctx.app.db.node,
                    as: 'target',
                    where: {
                        excercice_id: excercice.id
                    }
                }, {
                    model: ctx.app.db.node,
                    as: 'origin',
                    where: {
                        excercice_id: excercice.id
                    }
                }]
            })
            let connInfo = []
            for (let i = 0; i < nodenodeInfo.length; i++) {
                const relation = nodenodeInfo[i];
                let value = [relation.origin[0].n_shop,relation.target[0].n_shop,relation.weigth]
                connInfo.push(value)
            }
            ctx.body = { excercice: excercice, shopsFishTypesInfo: shopsInfo, shopsConnInfo: connInfo }
        } catch (error) {
            ctx.status = 500
            ctx.body = responseTempl.getresponseTemplate(error.message, 'error')
        }
    }
}