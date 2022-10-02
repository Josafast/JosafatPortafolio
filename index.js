import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';

// let users = JSON.parse(fs.readFileSync('./src/data/users.json'));

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + '/src'));

app.get('/',(req,res)=>{
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/words',(req, res)=>{
  fs.readFile('./src/data/words.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let word = data.split(',');
    do {
      word = word[Math.round(Math.random()*word.length)];
    } while (word == undefined)
    res.send(word);
  });
});

app.listen(process.env.PORT || 3000,()=>console.log('Server on port: ' + process.env.PORT || 3000));