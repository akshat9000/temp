const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile)

let username = "17bec1074"
let list = []

readFile(`./jsonData/student/${username}.json`,'utf8').then(data=>{
    return new Promise((resolve,reject)=>{
        data = JSON.parse(data);
        let crs = data.courses;
        // let list = [];
        // console.log("1 "+crs);
        resolve(crs);
    })
}).then(cr=>{
    // console.log(cr);
    readFile('./jsonData/courses.json','utf8').then((data)=>{
        data = JSON.parse(data)
        // console.log("2 "+data);
        return data;
    }).then((data)=>{
        // console.log("3 "+cr+data)
        data.forEach(element=>{
            if(cr.includes(element.cid)){
                list.push(element);
            }
        })
        // return list
    })
    // return {cr,data}
})

// console.log(list)