const db = require('mysql2');

exports.query = (sql) => {    
    const conn = db.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    });

    return new Promise((resolve, reject) => {
        conn.connect(function(err) {
            if (err) {
                console.log('connection error', err)
                reject(err);
            }

            conn.query(sql, function(err, result, fields) {    
                if (err) {
                    console.log('query error', err)
                    reject(err);
                } 
    
                conn.end((err) => {
                    if (err) {
                        console.log('connection end error', err)
                        reject(err);
                    }
                })

                console.log('DB success')
                resolve(result);
            });
        });
    });
};
