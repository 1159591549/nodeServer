const express = require('express')
const router = express.Router()
const { SUCCESS_CODE, FAILURE_CODE } = require('../config/statusCode')

// 获取菜单接口
router.get('/getRouters', (req, res) => {
    let menusList = [
        {
            path: '/',
            name: '',
            redirect:'/home',
            meta: {
                title: '首页',
                icon: ''
            },
            children: [
                {
                    path: 'home',
                    name: 'home',
                    meta:{
                        component: '/home/index.vue',
                    }
                    
                }
            ]
        },
        {
            path: '/permission',
            name: 'permission',
            meta: {
                title: '权限',
                icon: ''
            },
            redirect:'/permission/one',
            children: [
                {
                    path: 'one',
                    name: 'one',
                    meta:{
                        component: '/permission/index.vue',
                    }
                }
            ]
        },
    ]
    // 用户信息
    res.response(SUCCESS_CODE, { menusList })
})
module.exports = router