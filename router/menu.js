const express = require('express')
const router = express.Router()
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
    res.response('10000', router)
})
module.exports = router