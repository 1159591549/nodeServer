const getPost = require('./router/getPost')
const dbApi = require('./router/dbApi')
const menuApi = require('./router/menu')

// 内置中间件
const express = require('express')
const cors = require('cors')
const app = express()

// 该中间件使得post请求传过来的参数可以通过req.body获得
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 测试的JSONP接口
app.get('/jsonp', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const fnName = req.query.callback;
    const result = fnName + '({name:"胡智尧"})';
    res.send(result);
})

// 接口支持跨域
app.use(cors())

// 托管静态文件，并添加资源访问前缀
app.use('/images', express.static('./images'))

// 定义全局中间件
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

// 路由抽离
app.use(getPost)
app.use(dbApi)
app.use(menuApi)


// 项目启动
app.listen(80, () => {
    console.log('server is running on http://127.0.0.1');
})