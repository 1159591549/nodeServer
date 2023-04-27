const express = require('express')
const router = express.Router()
const { SUCCESS_CODE, FAILURE_CODE } = require('../config/statusCode')

router.get('/getRequest', (req, res) => {
    let { name, age } = req.query
    res.response(SUCCESS_CODE, { name, age })
})
// 局部注册中间件
router.post('/postRequest', (req, res) => {
    // post请求的JSON请求数据放在req.body中
    let { name, age } = req.body
    res.response(SUCCESS_CODE, { name, age })
})
module.exports = router