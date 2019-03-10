const Router = require('koa-router')
//Routes imports (V1)
const processRoutes = require('./v1/processRoutes')
const excerciseRoutes = require('./v1/excerciceRoutes')

//Router definition's
const router = new Router()
const v1 = new Router()

v1.use(processRoutes)
v1.use(excerciseRoutes)

router.use('/api/v1', v1.routes())

module.exports = router