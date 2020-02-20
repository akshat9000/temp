const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile)

const st = require('./userPassStudent.js');
const fc = require('./userPassFaculty.js');

module.exports.checkAuthStudent = (username, pass)=>{
    return new Promise((resolve, reject)=>{
        st.checkUsername(username).then(isUsername=>{
            if(!isUsername){
                console.log("Username is incorrect")
                resolve(false)
            }
            else{
                st.checkPassword(username, pass).then(auth=>{
                    if(auth){
                        console.log("Logging In...")
                        resolve(true)
                    }
                    else{
                        console.log("Incorrect Password...")
                        resolve(false)
                    }
                })
            }
        })
    })
    
}

module.exports.checkAuthFaculty = (username,password)=>{
    return new Promise((resolve,reject)=>{
        fc.checkUsername(username).then(isUser=>{
            if(!isUser){
                console.log('Username Incorrect');
                resolve(false);
            }
            else{
                fc.checkPassword(username,password).then(auth=>{
                    if(auth){
                        console.log('Logging in...');
                        resolve(true);
                    }
                    else{
                        console.log('Incorrect Password');
                        resolve(false);
                    }
                })
            }
        })
    })
}

module.exports.signUpUserCheckStudent = function(username){
    return new Promise((resolve,reject)=>{
        readFile('./jsonData/students.json').then(data=>{
            data = JSON.parse(data);
            resolve(data.includes(username));
        })
    })
}

module.exports.signUpUserCheckFaculty = function(username){
    return new Promise((resolve,reject)=>{
        readFile('./jsonData/faculties.json').then(data=>{
            data = JSON.parse(data);
            resolve(data.includes(username));
        })
    })
}

module.exports.addFaculty = function(body){
        fs.readFile('./jsonData/faculties.json','utf8',(err,data)=>{
            data = JSON.parse(data);
            // console.log(body)
            // data = Array(data);
            data.push(body.username)
            console.log(data)

            fs.writeFile('./jsonData/faculties.json',JSON.stringify(data),'utf8',(err)=>{
                if(err) throw err;
            })

            let data2 = {
                "username":body.username,
                "password":body.password,
                "name":body.name,
                "surname":body.surname,
                "courses":[],
                "cabin":body.cabin,
                "phno":body.phone,
                "email":body.email
            }

            fs.appendFile(`./jsonData/faculty/${body.username}.json`,JSON.stringify(data2),'utf8',(err)=>{
                if(err) throw err;
            })
        })
}

module.exports.addStudent = function(body){
    fs.readFile('./jsonData/students.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        data.push(body.username);
        console.log(data);

        fs.writeFile('./jsonData/students.json',JSON.stringify(data),'utf8',(err)=>{
            if(err) throw err;
        })

        let data2 = {
            "username":body.username,
            "name":body.name,
            "surname":body.surname,
            "password":body.password,
            "courses":[]
        }

        fs.appendFile(`./jsonData/student/${body.username}.json`,JSON.stringify(data2),'utf8',(err)=>{
            if(err) throw err;
        })
    })
}