const fs = require('fs');

let obj = {
    "cid":"req.body.cid",
        "name":"req.body.name",
        "desc":"req.body.desc",
        "faculty":["req.body.username"]
}

fs.readFile('./jsonData/courses.json','utf8',(err,data)=>{
    data = JSON.parse(data);
    // console.log(data);
    data.push(obj);
    console.log(data);
    fs.writeFile('./jsonData/courses.json',JSON.stringify(data),(err)=>{
        if(err) throw err;
    })
})