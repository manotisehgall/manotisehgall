const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: "pg",
    connection:
      "postgres://verrhjer:R7eZx_PwNoIdAA5xr18RusLLhb5amfC-@babar.db.elephantsql.com/verrhjer",
  });

const app = express();

let intialPath = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(express.static(intialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})

app.get('/contact-us', (req, res) => {
    res.sendFile(path.join(intialPath, "contactus.html"));
})

app.post('/send-contact-us', (req, res) => {
    const { name, email, message } = req.body;

    if (!name.length || !email.length || !message.length) {
        res.json('fill all the fields');
    } else {
        db("contact_us").insert({
            name: name,
            email: email,
            message: message
        })
            .returning(["name", "email", "message"])
            .then(data => {
                res.json(data[0])
                console.log("send data successfully");
            })
            .catch(err => {
                console.log(err)
                if (err.detail.includes('already exists')) {
                    res.json('email already exists');
                }
            })
    }
})

app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if (!name.length || !email.length || !password.length) {
        res.json('fill all the fields');
    } else {
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
            .returning(["name", "email"])
            .then(data => {
                res.json(data[0])
            })
            .catch(err => {
                console.log(err)
                if (err.detail.includes('already exists')) {
                    res.json('email already exists');
                }
            })
    }
})

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('name', 'email')
        .from('users')
        .where({
            email: email,
            password: password
        })
        .then(data => {
            if (data.length) {
                res.json(data[0]);
            } else {
                res.json('email or password is incorrect');
            }
        })
})

app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})