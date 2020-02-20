const fs = require("fs")
const util = require('util')
const readFile = util.promisify(fs.readFile)

// module.exports.checkUsername = (username)=>{
//     return new Promise((resolve, reject)=>{
//         readFile('./jsonData/faculties.json').then(data=>{
//             for(var i=0;i<data.length;i++){
//                 if(data[i].username===username){ resolve(data[i].id); break;}
//                 else{console.log('Username not found'); resolve(false);}
//             }
//             // resolve(data.includes(username))
//         })
//     })
// }

// readFile('./jsonData/faculties.json').then(data=>{
//     return new Promise((resolve,reject)=>{
//         data = JSON.parse(data);
//         for(var i=0;i<data.length;i++){
//             if(data[i].username==='3c3'){resolve(data[i].id)}
//         }
//         console.log('User not found');
//         resolve(false);
//     })
// })



// module.exports.checkPassword = (id,password)=>{
//     return new Promise((resolve, reject)=>{
//         readFile(`./jsonData/faculty/${id}.json`).then(data=>{
//             data = JSON.parse(data)
//             resolve(data.password === password)
//         })
//     })
// }