const fs = require('fs')
const path = require('path')





/* function getFileContent(fileName, callback) { 
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
        if(err) {
            console.error(err)
            return
        }

        callback(
            JSON.parse(data.toString())
        )
    })
} 


// 测试
getFileContent('a.json', aData => {
    console.log('a data', aData)
    getFileContent(aData.next, bData => {
        console.log('b Data', bData)
        getFileContent(bData.next, cData => {
            console.log('c Data',cData)
        })
    })
})


*/


function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName)
        fs.readFile(fullFileName, (err, data) => {
            if(err) {
                reject(err)
                return
            }

            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}


// promise 语法
/* getFileContent('a.json').then(aData => {
    console.log('a Data', aData)
    return getFileContent(aData.next)
}).then(bData => {
    console.log('b Data', bData)
    return getFileContent(bData.next)
}).then(cData => {
    console.log('c Data', cData)
}) */


// async await语法
async function readFileData() {
    // 同步写法
    try{
        const aData = await getFileContent('a.json')
        console.log(aData,'a Data')
        const bData = await getFileContent(aData.next)
        console.log(bData,'b Data')
        const cData = await getFileContent(bData.next)
        console.log(cData,'c Data')
    } catch(err) {
        console.log(err)
    }
}

readFileData()

/* async function readAData() {
    const aData = await getFileContent('a.json')
    return aData
}

async function test() {
    const aData = await readAData()
    console.log(aData)
}
test() */


// async await要点
// 1. await 后面可以追加 promise 对象
// 2. await 必须宝贵在 async 函数里面
// 3. async 函数执行返回的也是一个 promise 对象
// 4. try-catch 截获 promise 中 reject 的值
