const express =require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Bela',
      email: 'bela@gmail.com',
      password: 'dog',
      entries: 0,
      joined: new Date()
    }
  ],
  login:[
    {
      id: '987',
      hash: '',
      email:''
    }
  ]
}

app.get('/', (req, res)=>{
  res.send(database.users);
})
app.listen(3000, ()=>{
  console.log("working wellL!!");
})


app.post('/signin', (req, res)=>{
  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    res.json(database.users[0]);
  } else{
    res.status(400).json('invalid email or password');
  }
})

app.post('/register', (req, res)=>{
  const { email, name, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found =  false;
  database.users.forEach(user => {
    if(user.id === id){
      found = true;
      return res.json(user);
    }
  })
  if(!found){
    res.status(400).json('not found');
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found =  false;
  database.users.forEach(user => {
    if(user.id === id){
      found = true;
      user.entries++
      return res.json(user.entries);
    }
  })
  if(!found){
    res.status(400).json('not found');
  }
})
