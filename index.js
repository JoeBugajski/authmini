const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('morgan');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(logger('combined'));

const secret = '29ng764g734n97yfhh34u3hreuwofhb932bvb392hbf78hveuf9b30h0nfn08934ny09-094hg08729n';

function generateToken(user) {
  const payload = {
    username: user.username, // you can add other information to the payload, just no sensitive information
  };
  const options = {
    expiresIn: '1h',
    jwtid: '12345' // jti
  }
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
   // use jwts instead of sessions
   // read the token string from the Authorization header
    const token = req.headers.authorization;
    if(token) {
   // verify the token
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) {
        // token is invalid
        res
          .status(401)
          .json({
            message: 'Invalid Token'
          });
      } else {
        // token is valid
        console.log(decodedToken)
        req.username = decodedToken.username;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ 
        message: 'no token provided' 
      });
  }
}

server.post('/api/register', (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      //find the user using the id
      db('users')
        .where({id})
        .first()
        .then(user => {
          const token = generateToken(user);
          res
            .status(201)
            .json({ id: user.id, token });
          })
          .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

server.post('/api/login', (req, res) => {
  const creds = req.body;
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user); // generate a token
        // attach that token to the response
          res
            .status(200)
            .json({ 
              message: `Welcome ${user.username}`,
              token 
            });
      } else {
        res
          .status(401)
          .json({
            message: "You shall not pass!!"
          });
      }
    })
    .catch(err => res
                    .status(500)
                    .send(err));
});


server.get('/', (req, res) => {
  res.send('Its Alive!');
});

// protect this route, only authenticated users should see it
server.get('/api/users', protected, (req, res) => {
  db('users')
    .select('id', 'username')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

server.listen(3300, () => console.log('\nrunning on port 3300\n'));
