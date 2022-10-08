exports.init = () => {
    const db = require('mysql2');

    const conn = db.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    });

    function query(sql) {
        return new Promise((resolve, reject) => {
            conn.connect(function(err) {
                if (err) reject(err);

                conn.query(sql, function(err, result, fields) {    
                    if (err) reject(err);
        
                    resolve(result);
                });
            });
        });
    }

    return { query };
};
