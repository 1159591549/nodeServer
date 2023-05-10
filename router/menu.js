const express = require('express')
const router = express.Router()
const { SUCCESS_CODE, FAILURE_CODE } = require('../config/statusCode')

// 获取菜单接口
router.get('/getRouters', (req, res) => {
    let menusList = [
        {
            path: '/',
            name: '',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            file: '/home/index.vue',
        },
    ]
    // 用户信息
    res.response(SUCCESS_CODE, { menusList })
})
module.exports = router