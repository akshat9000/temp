const fs = require("fs")
const util = require('util')
const readFile = util.promisify(fs.readFile)

module.exports.checkUsername = (username)=>{
    return new Promise((resolve, reject)=>{
        readFile('./jsonData/faculties.json').then(data=>{
            resolve(data.includes(username));
        })
    })
}

module.exports.checkPassword = (username,password)=>{
    return new Promise((resolve, reject)=>{
        readFile(`./jsonData/faculty/${username}.json`).then(data=>{
            data = JSON.parse(data)
            // console.log(data.password===password);
            resolve(data.password === password)
        })
    })
}