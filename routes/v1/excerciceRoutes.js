const Router = require('koa-router')
const excsServices = require('../../services/v1/excerciceServices')

const router = new Router ()

//Services Routes declaration's 
router.post('/excercice', excsServices.saveExcercice)
router.get('/excercice/:id', excsServices.getExcerciceInfo)
router.get('/excercice', excsServices.getAllExcerciceInfo)

module.exports = router.routes()