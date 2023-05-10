// 包含注册 登录 退出等公共功能
const express = require('express')
const router = express.Router()
const { connect } = require('../db/index')
const db = connect()
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { jwtSecretKey } = require('../config/jwtSecretKey')
const { SUCCESS_CODE, FAILURE_CODE } = require('../config/statusCode')
router.post('/register', (req, res) => {
    res.send('注册成功!')
})
router.post('/login', (req, res) => {
    const { username, password } = req.body
    let loginQuery = `select * from ev_user where username= ? `
    db.query(loginQuery, [username], (err, result) => {
        if (err) {
            return res.response(FAILURE_CODE, [], err)
        }
        // 注册判断
        if (result.length === 0) {
            return res.response(FAILURE_CODE, [], '暂未注册')
            // 身份判断
        } else {
            // 密码校验
            let confirmPassword = bcryptjs.compareSync(password, result[0].password)
            if (confirmPassword) {
                let userinfo = { ...result[0], password: '', user_pic: '' }
                let token = jwt.sign(userinfo, jwtSecretKey, { expiresIn: '10h' })
                res.response(SUCCESS_CODE, { token }, '登录成功')
            } else {
                res.response(FAILURE_CODE, [], '密码错误!')
            }
        }
    })
})

// JSONP接口 允许客户端跨域请求
router.get('/jsonp', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const fnName = req.query.callback;
    const result = fnName + '({name:"胡智尧"})';
    res.send(result);
})
module.exports = router