const { query } = require('./db');
const bcrypt = require('bcrypt');

class User {
    constructor(username, password, email, name, hashPassword, id) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.hashPassword = hashPassword;
    }

    insertUser(cb) {
        bcrypt.hash(this.password, 10, (err, encypted) => {
            if (err) return cb(err);
            const sql = `INSERT INTO public."User"(username, password, email, name)
	            VALUES ($1, $2, $3, $4);`;
            const { username, email, name } = this;
            query(sql, [username, encypted, email, name], errInsert => {
                if (errInsert) return cb(errInsert);
                cb(undefined);
            });
        });
    }

    checkSignIn(cb) {
        const sql = `SELECT password FROM public."User" WHERE username = $1`;// eslint-disable-line
        query(sql, [this.username], (err, result) => {
            if (err) return cb(err);
            const hashPassword = result.rows[0].password;
            bcrypt.compare(this.password, hashPassword, (errHash, same) => {
                if (!same) return cb('DANG_NHAP_KHONG_THANH_CONG');
                cb(undefined);
            });
        });
    }
}

module.exports = User;
