const { query } = require('../utils/dbUtils');

module.exports = {
    getUsuarios: async (req, res) => {
        console.log('[GET] /usuarios req.query: ', req.query);
        const { id } = req.query;

        let queryString = "SELECT * FROM usuarios";

        if (id) queryString = `SELECT * FROM usuarios WHERE id = ${id}`;

        const result = await query(queryString);

        res.json({ 
            message: 'OK',
            data: result
        });
    },
    createUsuario: async  (req, res) => {
        console.log('[POST] /usuarios req.body: ', req.body);
        
        const { name, email, status, createdDate, updateDate } = req.body;
        const intStatus = status ? 1 : 0;

        try {
            await query(`INSERT INTO usuarios (nombre, email, estado, fechaCreacion, fechaActualizacion)
                VALUES ('${name}', '${email}', '${intStatus}', '${createdDate}', '${updateDate}')`);

            res.status(200).json({ message: 'usuario creado' });

        } catch (e) {
            console.log('My server log error: ', e)
            res.status(400).json({ message: 'no se pudo crear el usuario' });
        }       
    },
    updateUsuario: async (req, res) => {
        console.log('[PUT] /usuarios req.body: ', req.body);

        const { id, name, email, status, createdDate, updateDate } = req.body;
        const intStatus = status ? 1 : 0;

        try {
            await query(`
                UPDATE usuarios SET 
                nombre = '${name}',
                email = '${email}',
                estado = ${intStatus},
                fechaCreacion = '${createdDate}',
                fechaActualizacion = '${updateDate}'
                WHERE id = ${id}
            `);

            res.status(200).json({ message: 'usuario actualizado' });

        } catch (e) {
            console.log('My server log error: ', e)
            res.status(400).json({ message: 'no se pudo actualizar el usuario' });
        }    
    },
    deleteUsuario: async (req, res) => {
        console.log('[DELETE] /usuarios req.body: ', req.body);

        const { id } = req.body;

        try {
            await query(`DELETE FROM usuarios WHERE id = ${id}`);

            res.status(200).json({ message: 'usuario eliminado' });

        } catch (e) {
            console.log('My server log error: ', e)
            res.status(400).json({ message: 'no se pudo eliminar el usuario' });
        } 
    },
};
