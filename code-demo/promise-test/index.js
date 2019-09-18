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

getFileContent('a.json').then(aData => {
    console.log('a Data', aData)
    return getFileContent(aData.next)
}).then(bData => {
    console.log('b Data', bData)
    return getFileContent(bData.next)
}).then(cData => {
    console.log('c Data', cData)
})


