const Router = require('koa-router')
const prcsServices = require('../../services/v1/processServices')

const router = new Router ()

//Services Routes declaration's
router.post('/process', prcsServices.bestTravelTime)

module.exports = router.routes()