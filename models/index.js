const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'

const config = {}
config.database = process.env.DB
config.username = process.env.USER_DB
config.password = process.env.PSS_DB
config.host = process.env.DB_URL
config.port = process.env.DB_PORT
config.dialect = 'postgres'
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0 && (file !== basename && file.slice(-3) === '.js'))
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = async (ctx, next) => {
  ctx.app.db = db
  await next()
}
