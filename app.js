// 引入路由
const getPost = require('./router/getPost')
const dbApi = require('./router/dbApi')
const menuApi = require('./router/menu')
const commonApi = require('./router/common')

// 内置中间件
const express = require('express')
const expressJwt = require('express-jwt')
const { jwtSecretKey } = require('./config/jwtSecretKey')
const { SUCCESS_CODE, FAILURE_CODE, LOGINEXPIRED } = require('./config/statusCode')
const app = express()

// 定义全局中间件 这个中间件要放在第一个，最起码也要在app.use(expressJwt())中间件之前使用，否则可能因为注册顺序问题报错
app.use((req, res, next) => {
    // code 返回状态码 data 返回数据 msg  返回信息 err  返回错误
    res.response = (code, data = [], err) => {
        res.send({
            code,
            data,
            msg: err ? (err instanceof Error ? err.message : err) : 'success',
        })
    }
    next()
})
// 除了以common开头的接口之外，其余的接口都应该在请求头中携带token来判断用户是否登录
app.use(expressJwt({ secret: jwtSecretKey }).unless({ path: [/^\/common\//] }))

const cors = require('cors')
// 接口支持跨域
app.use(cors())

// 该中间件使得post请求传过来的参数可以通过req.body获得
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 托管静态文件，并添加资源访问前缀
app.use('/images', express.static('./images'))

// 路由抽离
app.use('/api', getPost)
app.use('/api', dbApi)
app.use('/api', menuApi)
app.use('/common', commonApi)

// 错误中间件
app.use(function (err, req, res, next) {
    if (err.inner.message === 'No authorization token was found') {
        return res.response(FAILURE_CODE, [], "未登录!")
    }
    if (err.inner.message === 'jwt expired') {
        return res.response(LOGINEXPIRED, [], "登录过期,请重新登录!")
    }
    // 未知错误
    res.response(FAILURE_CODE, [], err)
})

// 项目启动
app.listen(8020, () => {
    console.log('server is running on http://127.0.0.1');
})