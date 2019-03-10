// Lib definition
const Koa = require('koa')
const app = new Koa()
const cors = require('@koa/cors')
const koaBody = require('koa-body')
// Local req
const db = require('./models')
const router = require('./routes')


//Config definition's
const PORT = process.env.PORT || 3000


//App definition's
app.use(cors())
app.use(db)
app.use(koaBody())




//app.use(db)
app.use(router.routes())


const server = app.listen(PORT).on("error", err => {
    console.error(err);
});
