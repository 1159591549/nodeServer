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
// 添加数据
router.get('/addTeacher', (req, res) => {
    let { TId, Tname } = req.query
    db.query('insert into teacher (TId, Tname) values (?, ?)', [TId, Tname], (err, result) => {
        if (err) {
            return res.response('10001', result, err)
        }
        if (result.affectedRows === 1) {
            res.response('10000')
        } else {
            res.response('10001', [], result)
        }
    })
})
// 通过对象添加
router.get('/addTeacherObj', (req, res) => {
    let { TId, Tname } = req.query
    db.query('insert into teacher set ?', { TId, Tname }, (err, result) => {
        if (err) {
            return res.response('10001', result, err)
        }
        if (result.affectedRows === 1) {
            res.response('10000')
        } else {
            res.response('10001', [], result)
        }
    })
})
// 更新数据
router.get('/updateTeacher', (req, res) => {
    let { TId, Tname } = req.query
    db.query('update teacher set Tname = ? where TId = ?', [Tname, TId], (err, result) => {
        if (err) {
            return res.response('10001', result, err)
        }
        if (result.affectedRows === 1) {
            res.response('10000')
        } else {
            res.response('10001', [], result)
        }
    })
})
// 通过对象更新
router.get('/updateTeacherObj', (req, res) => {
    let { TId, Tname } = req.query
    db.query('update teacher set ? where Tname = ?', [{ TId, Tname: '苏应梅1' }, Tname], (err, result) => {
        if (err) {
            return res.response('10001', result, err)
        }
        if (result.affectedRows > 0) {
            res.response('10000')
        } else {
            res.response('10001', [], result)
        }
    })
})
// 删除数据
router.get('/deleteTeacher', (req, res) => {
    let { Tname } = req.query
    db.query('delete from teacher where Tname = ?', [Tname], (err, result) => {
        if (err) {
            return res.response('10001', result, err)
        }
        if (result.affectedRows > 0) {
            res.response('10000', result)
        } else {
            res.response('10001', [], result)
        }
    })
})
module.exports = router