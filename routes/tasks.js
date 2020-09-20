const router = require('koa-router')()
const Task = require('./../models/Task')


const API_V1 = '/api/v1/tasks'

router.get(API_V1, async (ctx, next) => {

    try {
        let tasks = await Task.find({})
        ctx.body = {
            data: tasks
        }
    } catch (error) {
        await next()
    }


})



router.post(API_V1, async (ctx, next) => {

    try {
        let task = await Task.create(ctx.request.body)
        ctx.status = 201
        ctx.body = {
            data: task
        }
    } catch (error) {
        await next();
    }

})


router.delete(API_V1, async (ctx, next) => {

    try {
        await Task.deleteMany({})
        // Request Prossesed Succesfull
        ctx.status = 204
    } catch (error) {
        await next();
    }

})


router.get(API_V1 + '/:id', async (ctx, next) => {

    try {
        let tasks = await Task.find({ _id: ctx.params.id })
        ctx.body = {
            data: tasks
        }
    } catch (error) {
        await next()
    }
})


router.put(API_V1 + '/:id', async (ctx, next) => {

    try {
        let task = await Task.findByIdAndUpdate(ctx.params.id, {
            $set: ctx.request.body
        }, { new: true })
        ctx.body = {
            data: task
        }
    } catch (error) {
        await next();
    }

})

router.delete(API_V1 + '/:id', async (ctx, next) => {

    try {
        await Task.deleteOne({ _id: ctx.params.id })
        ctx.status = 204
    } catch (error) {
        console.log(error.toString());
        await next();
    }

})


module.exports = router