// Lib definition
const Koa = require('koa')
const app = new Koa()
const cors = require('@koa/cors')

// Local req
//const db = require('./models')

//Config definition's
const PORT = process.env.PORT | 3000


//App definition's

app.use(cors())

const router = require('./routes')


//app.use(db)
app.use(router.routes())


const server = app.listen(PORT).on("error", err => {
    console.error(err);
});
