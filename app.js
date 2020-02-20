const express = require('express');
const app = express();
app.use(express.json());
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
const stuLog = require('./fns.js');
const facLog = require('./fns.js');
const stuCrs = require('./fns2.js');
const util = require('util')
const readFile = util.promisify(fs.readFile);

app.get('/',(req,res)=>{
    res.render('home');
})

app.post('/',(req,res)=>{
    let type = req.body.type;
    if(type==='login') res.redirect('/login');
    else if(type==='signUp') res.redirect('/signUp');
    else res.redirect('/courses')
})

app.post('/success',(req,res)=>{
    let obj = {
        "cid":req.body.cid,
        "name":req.body.name,
        "desc":req.body.desc,
        "faculty":[req.body.username]
    }

    fs.readFile('./jsonData/courses.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        data.push(obj);
        fs.writeFile('./jsonData/courses.json',JSON.stringify(data),(err)=>{
            if(err) res.send('Server Error, please Re-Try')
            res.redirect('/facultyCourses')
        })
    })
})

app.get('/facultyCourses',(req,res)=>{
    res.render('create');
})

app.get('/create',(req,res)=>{
    res.render('createCourses');
})

app.get('/courses',(req,res)=>{
    fs.readFile('./jsonData/courses.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        res.render('courses',{data:data})
    })
    // res.render('courses',{data:data});
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/login',(req,res)=>{
    if(req.body.type==='student') res.redirect('/studentLogin');
    else res.redirect('/facultyLogin');
})

app.get('/signUp',(req,res)=>{
    res.render('signUp')
})

app.post('/signUp',(req,res)=>{
    if(req.body.type==='student') res.redirect('/signUpStudent');
    else res.redirect('/signUpFaculty');
})

app.get('/signUpStudent',(req,res)=>{
    res.render('signUpStudent');
})

app.get('/signUpFaculty',(req,res)=>{
    res.render('signUpFaculty')
})

app.post('/signUpFaculty',(req,res)=>{
    facLog.signUpUserCheckFaculty(req.body.username).then(exists=>{
        if(exists){
            console.log('Username already exists');
            res.render('userExists',{data:"faculty"});
        }
        else if(req.body.password!==req.body.confpassword){
            console.log('Passwords do not match');
            res.render('wrongPass',{data:"faculty"})
        }
        else{
            console.log('Account Created...');
            // console.log(req.body);
            facLog.addFaculty(req.body);
            res.redirect('/facultyCourses');
        }
    })
})

app.post('/signUpStudent',(req,res)=>{
    stuLog.signUpUserCheckStudent(req.body.username).then(exists=>{
        if(exists){
            console.log('Username already exists');
            res.render('userExists',{data:"student"});
        }
        else if(req.body.password!==req.body.confpassword){
            console.log('Passwords do not match');
            res.render('wrongPass',{data:"student"});
        }
        else{
            console.log('Account Created...');
            stuLog.addStudent(req.body);
            res.redirect(`/studentCourses/${req.body.username}`);
        }
    })
})

app.get('/studentLogin',(req,res)=>{
    res.render('studentLogin');
})

app.post('/studentLogin',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;  
    console.log(username, password) 
    stuLog.checkAuthStudent(username,password).then(auth=>{
        if(auth) res.redirect(`/studentCourses/${username}`);
        else res.redirect('/studentLogin');
    })
})

app.get('/facultyLogin',(req,res)=>{
    res.render('facultyLogin');
})

app.post('/facultyLogin',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    facLog.checkAuthFaculty(username,password).then(auth=>{
        if(auth) res.redirect('/facultyCourses');
        else res.redirect('/facultyLogin');
    })
})

app.get('/studentCourses/:username',(req,res)=>{
    stuCrs.listCourse(req.params.username).then(courses=>{
        res.render("courses", {data : courses})        
    }).catch(err => console.log(err));
    
})

app.listen(8000,()=>{
    console.log('Server Started at port 8000...')
})