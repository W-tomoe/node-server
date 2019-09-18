const env = process.env.NODE_ENV // 环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF
// 开发环境
if( env == 'dev' ) {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: 3306,
        database: 'myblog'
    }

    REDIS_CONF = {
        prot: 6379,
        host: '127.0.0.1'
    }
}

// 线上环境
if( env == 'production' ) {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: 3306,
        database: 'myblog'
    }

    REDIS_CONF = {
        prot: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}