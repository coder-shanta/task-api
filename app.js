require('dotenv').config()

const Koa = require('koa')
const KoaBody = require('koa-body')
const mongoose = require('mongoose')
const json = require('koa-json')
const Task = require('./models/Task')

const port = process.env.PORT || 3000

//Create Db Connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database connection succesfull.');
}).catch(error => {
    console.log('Database connection failed. /n Error : ' + error.message);
})




//Load Routes
const tasks = require('./routes/tasks')
const koaBody = require('koa-body')

const app = new Koa()

app.use(json({
    pretty: false,
    param: 'pretty'
})).use(KoaBody())



app.use(tasks.routes())

app.use(ctx => {
    if (ctx.status === 404) {
        ctx.status = 404
        ctx.body = {
            error: {
                code: 404,
                message: 'Resource not found (:-'
            }
        }
    }
})

app.listen(port)