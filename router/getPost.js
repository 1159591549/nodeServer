const express = require('express')
const router = express.Router()

router.get('/getRequest', (req, res) => {
    let { name, age } = req.query
    res.response('10000', { name, age })
})
// 局部注册中间件
router.post('/postRequest', (req, res) => {
    // post请求的JSON请求数据放在req.body中
    let { name, age } = req.body
    res.response('10000', { name, age })
})
module.exports = router