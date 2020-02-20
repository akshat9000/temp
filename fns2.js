const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile)

module.exports.listCourse = username =>{
    console.log("username: "+username)
    const promise = new Promise((resolve, reject)=>{
        readFile(`./jsonData/student/${username}.json`).then(data=>{
            data = JSON.parse(data)
            if(data.courses && data.courses.length>0){
                let coursesData = []
                readFile('./jsonData/courses.json').then(courseDb=>{
                    courseDb = JSON.parse(courseDb)
                    // console.log("courseDB:",courseDb)
                    // console.log("Data.courses : ", data.courses)
                    coursesData = courseDb.filter((x)=>{return data.courses.includes(x.cid)})
                    // console.log(coursesData)
                    resolve(coursesData)
                }).catch(err => console.log(err))
            }
            else{
                console.log('courses not found')
                resolve([])
            }
        }).catch(err=>{reject(err)})
    })
        return promise
   
}

module.exports.studentCourses = function(username){
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
            let list = []
            // console.log("3 "+cr+data)
            data.forEach(element=>{
                if(cr.includes(element.cid)){
                    list.push(element);
                }
            })
            return list
        }).then((li)=>{
            return JSON.stringify(li)
            // console.log("4 "+obj.data)
        })
        // return {cr,data}
    })
}

module.exports.courses = function(){
    readFile('./jsonData','utf8')
        .then(data=>{
            return data;
        })
}