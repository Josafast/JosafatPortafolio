import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import { Buffer } from 'node:buffer';

// let users = JSON.parse(fs.readFileSync('./src/data/users.json'));

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.set('views',join(__dirname,'/src/views'))
app.set("view engine","ejs");
app.use('/',express.static(__dirname + '/src/css/normalize.css'));
app.use(express.static(__dirname + '/src'));

app.get('/',(req,res)=>{
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/users',(req, res)=>{
  let users = JSON.parse(fs.readFileSync('./src/data/users.json'));
  res.send(users.users);
});

app.delete('/users',(req, res)=>{
  let users = JSON.parse(fs.readFileSync('./src/data/users.json'));
  users = users.users;
  users = users.filter(arr=> arr.email != req.body.email);
  fs.writeFileSync('./src/data/users.json',JSON.stringify({users}));
  res.send('Cuenta eliminada');
});

app.post('/users',(req, res)=>{
  let users = JSON.parse(fs.readFileSync('./src/data/users.json'));
  users.users.push(req.body);
  fs.writeFileSync('./src/data/users.json',JSON.stringify(users));
  res.send('Tu nueva cuenta ha sido creada');
});

app.put('/users/password',(req, res)=>{
  let users = JSON.parse(fs.readFileSync('./src/data/users.json'));
  users = users.users;
  users[users.findIndex(element=> element.email == req.body.email)] = req.body;
  fs.writeFileSync('./src/data/users.json',JSON.stringify({"users":users}));
  res.send({"user": req.body,"msg":'La contraseña ha sido cambiada correctamente'});
});

app.get('/users/password',(req, res)=>{
  let users = JSON.parse(fs.readFileSync('./src/data/users.json'));
  users = users.users;
  users = users[users.findIndex(element=> element.email == 'demouser@email.com')];
  res.send({"password":users.password});
});

app.get('/login',(req, res)=>{
  res.render('login');
});

app.listen(3000,()=>console.log('Server on port: 3000'));