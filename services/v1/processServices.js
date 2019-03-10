const responseTempl = require('../../lib/responseTemplate')
const processCtrl = require('../../controllers/processController')
module.exports = {
     async bestTravelTime(ctx) {
        try {
            let problemData = ctx.request.body //declare data for JSON request.
            if (problemData == null || problemData == undefined) {
                throw Error('No data found')
            }
            
            res = await processCtrl.bestTravelTimeCalc( problemData.shopsFishTypesInfo, problemData.shopsConnInfo, problemData.excercice.n_fishtypes)
            
            ctx.body = responseTempl.getresponseTemplate(res, 'success')
        } catch (error) {
            ctx.status = 500
            ctx.body = responseTempl.getresponseTemplate(error.message, 'error')
        }
    }
}