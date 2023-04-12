// 内置中间件
const express = require('express')
const cors = require('cors')
const app = express()
// 声明使用的中间件为express.json()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.get('/user', (req, res) => {
    let { name, age } = req.query
    res.send({
        name,
        age
    })
})
// 局部注册中间件
app.post('/middleWare', (req, res) => {
    // post请求的JSON请求数据放在req.body中
    let { name, age } = req.body
    // console.log(name, age);
    res.send({
        name, age
    })
})
// 获得路由参数
app.post('/getRouters', (req, res) => {
    res.send({
        router: [
            {
                path: '/exchange',
                name: 'exchange',
                component: 'components/exchange',
            },
            {
                path: '/daySum',
                name: 'daySum',
                component: 'components/daySum'
            },
        ]
    })
})
app.listen(80, () => {
    console.log('server is running on http://127.0.0.1');
})