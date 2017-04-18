const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const { hash } = require('bcrypt');
const User = require('./User');
const { insertUser, checkSignIn } = require('./db');


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
    const user = new User(username, password, email, name);
    user.insertUser(err => {
        if (err) return res.send(err);
        res.send('DANG_KY_THANH_CONG');
    });
});

app.post('/signin', parser, (req, res) => {
    const { username, password } = req.body;
    const user = new User(username, password);
    user.checkSignIn(err => {
        if (err) res.send(err);
        res.send('DANG_NHAP_THANH_CONG');
    });
});
