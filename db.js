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
            if (errQuery) return cb(errQuery);
            cb(undefined, result);
        });
    });
}

