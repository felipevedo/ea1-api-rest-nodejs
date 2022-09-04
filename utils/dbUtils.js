exports.init = () => {
    const db = require('mysql2');

    const conn = db.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'ea1'
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
