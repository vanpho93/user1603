const pg = require('pg');
const bcrypt = require('bcrypt');

const config = {
    host: 'localhost',
    port: 5432,
    database: 'NODE1603',
    user: 'postgres',
    password: 'khoapham'
};

const pool = new pg.Pool(config);

function query(sql, cb) {
    pool.connect((err, client, done) => {
        if (err) return cb(err);
        client.query(sql, (errQuery, result) => {
            done(errQuery);
            if (errQuery) return cb(errQuery);
            cb(undefined, result);
        });
    });
}

//function insert new user

const insertUser = (username, password, email, name, cb) => {
    const sql = `INSERT INTO public."User"(username, password, email, name)
	VALUES ('${username}','${password}','${email}','${name}');`;
    query(sql, err => {
        if (err) return cb(err);
        cb(undefined);
    });
};

//fucntion check login
const checkSignIn = (username, password, cb) => {
    const sql = `SELECT password FROM public."User" WHERE username = '${username}'`;// eslint-disable-line
    query(sql, (err, result) => {
        if (err) return cb(err);
        const hashPassword = result.rows[0].password;
        bcrypt.compare(password, hashPassword, (errHash, same) => {
            if (!same) return cb('DANG_NHAP_KHONG_THANH_CONG');
            cb(undefined);
        });
    });
};

module.exports = { insertUser, checkSignIn };
