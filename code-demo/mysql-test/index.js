const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'myblog'
})

// 开始链接
con.connect()

// 执行 sql 语句
const sql = 'select id, username from users';
con.query(sql, (err, result) => {
    if(err) {
        console.error(err)
    }
})

//关闭链接
con.end()
