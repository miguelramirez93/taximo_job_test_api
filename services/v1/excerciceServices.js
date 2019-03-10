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
                    //save nodes whit out relations
                    for (let i = 0; i < excerciceData.shopsFishTypesInfo.length; i++) {
                        const nodeInfo = excerciceData.shopsFishTypesInfo[i];

                        const nodeObj = {
                            fishtypes: nodeInfo[1]
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
                    //save exercice data
                    excerciceData.excercice.node_id = excerciceData.shopsFishTypesInfo[0][2]
                    const excerciceCreated = await ctx.app.db.excercice.create(excerciceData.excercice, { transaction: t })
                    t.commit()
                    ctx.body = responseTempl.getresponseTemplate('Registrado Correctamente', 'success')

                } catch (error) {
                    t.rollback()
                    console.log('error ', error.message);

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
            
        } catch (error) {
            ctx.status = 500
            ctx.body = responseTempl.getresponseTemplate(error.message, 'error')
        }
    }
}