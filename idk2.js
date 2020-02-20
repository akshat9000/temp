const fs = require('fs');

fs.readFile('./jsonData/students.json','utf8',(err,data)=>{
    data = JSON.parse(data);
    data.push("aaa");
    console.log(data);

    fs.writeFile('./jsonData/students.json',JSON.stringify(data),'utf8',err=>{
        if(err) throw err;
    })

    let data2 = {
        "username":"aaa",
        "name":"aaa",
        "surname":"aaa",
        "password":"aaa",
        "courses":[]
    }

    fs.appendFile(`./jsonData/student/aaa.json`,JSON.stringify(data2),'utf8',err=>{
        if(err) throw err;
    })
})