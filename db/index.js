const mysql = require('mysql')
function connect(host = '127.0.0.1',user = 'root', password = 'root', database = 'my_db_01'){
    const db =  mysql.createPool({
        host,
        user,
        password,
        database
    })
    return db
}
module.exports = {
    connect
}