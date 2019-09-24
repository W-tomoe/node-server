const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } =  require('../model/resModel')
router.prefix('/api/user')

router.post('/login',async function (ctx, next) {
    const { username, password } = ctx.request.body

    const data = await login(username, password)

    if(data.username) {
        ctx.session.username = data.username
        ctx.session.password = data.password
        ctx.body = new SuccessModel()
        return
    }

    ctx.body = new ErrorModel('登录失败')
})

// router.get('/session-test',async function (ctx, next) {
//     if(ctx.session.viewCount == null) {
//         ctx.session.viewCount = 0
//     }
//     const viewCount = ctx.session.viewCount++
//     ctx.body = {
//         status: 0,
//         viewCount
//     }
// })

module.exports = router