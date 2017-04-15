const pg = require('pg');

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

insertUser('vanpho1', '123', 'vanpho02@gmail.com', 'Pho Nguyen', err => {
    if (err) return console.log(err);
    console.log('Dang ky thanh cong');
});
