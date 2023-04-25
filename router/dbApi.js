const express = require('express')
// 数据库连接
const { connect } = require('../db/index')
const db = connect()
const router = express.Router()

router.get('/dbQuery', (req, res) => {
    db.query('select * from teacher', (err, result) => {
        if (err) {
            return res.response('10001', result, err)
        }
        res.response('10000', result)
    })
})

module.exports = router