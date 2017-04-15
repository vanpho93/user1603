const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const { insertUser } = require('./db');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(3000, () => console.log('Server started'));

app.get('/', (req, res) => res.render('home'));

app.get('/signup', (req, res) => res.render('signup'));

app.get('/signin', (req, res) => res.render('signin'));

app.post('/signup', parser, (req, res) => {
    const { name, username, password, email } = req.body;
    insertUser(username, password, email, name, err => {
        if (err) return res.send('LOI DANG KY!!!');
        res.send('DANG KY THANH CONG');
    });
});

