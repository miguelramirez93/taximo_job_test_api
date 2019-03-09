const Router = require('koa-router')
//Routes imports (V1)
const processRoutes = require('./v1/processRoutes')

//Router definition's
const router = new Router()
const api = new Router()

api.use(processRoutes)

router.use('/api/v1', api.routes())

module.exports = router