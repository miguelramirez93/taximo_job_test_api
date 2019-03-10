const responseTempl = require('../../lib/responseTemplate')
const processCtrl = require('../../controllers/processController')
module.exports = {
     async bestTravelTime(ctx) {
        try {
            let problemData = ctx.request.body //declare data for JSON request.
            if (problemData == null || problemData == undefined) {
                throw Error('No data found')
            }
            // let problemData = {}
            // problemData.n = 5 //Number of shopping centers
            // problemData.m = 5 //Number of roads
            // problemData.k = 5 //Number of types of fish solds.

            // problemData.shopsFishTypesInfo = [[1,'1'],[1,'2'],[1,'3'],[1,'4'],[1,'5']]
            // problemData.shopsConnInfo = [[1,2,10],[1,3,10],[2,4,10],[3,5,10],[4,5,10]]
            // // problemData.shopsFishTypesInfo = [[1,'1'],[2,'1 2'],[2,'2 3'],[1,'2'],[1,'2']]
            // // problemData.shopsConnInfo = [[1,2,10],[1,4,1],[1,3,15],[3,5,5],[2,3,10]]
            res = await processCtrl.bestTravelTimeCalc( problemData.shopsFishTypesInfo, problemData.shopsConnInfo, problemData.k)
            


            ctx.body = responseTempl.getresponseTemplate(res, 'success')
        } catch (error) {
            ctx.status = 500
            ctx.body = responseTempl.getresponseTemplate(error.message, 'error')
        }
    }
}