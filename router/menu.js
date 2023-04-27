const express = require('express')
const router = express.Router()
const { SUCCESS_CODE, FAILURE_CODE } = require('../config/statusCode')

// 获取菜单接口
router.get('/getRouters', (req, res) => {
    let router = [
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
    // 用户信息
    res.response(SUCCESS_CODE, { router, tokenInfo: req.user })
})
module.exports = router