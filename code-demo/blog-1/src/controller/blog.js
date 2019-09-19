const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select id, title, content, author from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id=${id}`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // blogData是一个博客对象，包含title content属性
    const { title, content, author } = blogData
    const createtime = new Date().getTime()
    const sql = `
        insert into blogs(title, content, createtime, author) 
        values('${title}', '${content}', ${createtime}, '${author}');
    `

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    //id就是要更新博客的id
    // blogData是一个博客对象，包含title content属性
    const { title, content } = blogData
    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `
    return exec(sql).then(updateData => {
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    // id 就是要删除博客的 id
    const sql = `delete from blogs where id=${id} and author='${author}'`

    console.log(sql,'delData')
    return exec(sql).then(delData => {
        
        if(delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}