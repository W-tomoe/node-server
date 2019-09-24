const xss = require('xss')
const { exec, escape } = require('../db/mysql')

const getList = async (author, keyword) => {
    let sql = `select id, title, content, author from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    return await exec(sql)
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id=${id}`
    const rows =await exec(sql)
    return rows[0]
}

const newBlog = async (blogData = {}) => {
    // blogData是一个博客对象，包含title content属性
    let { title, content, author } = blogData

    title = escape(xss(title))
    content = escape(xss(content))
    author = escape(xss(author))


    const createtime = new Date().getTime()
    const sql = `
        insert into blogs(title, content, createtime, author) 
        values(${title}, ${content}, ${createtime}, ${author});
    `
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

const updateBlog = async (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性

    const title = xss(blogData.title)
    const content = xss(blogData.content)

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `

    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
}

const delBlog = async (id, author) => {
    // id 就是要删除博客的 id
    const sql = `delete from blogs where id=${id} and author='${author}'`
    const delData = await exec(sql)
    if(delData.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}