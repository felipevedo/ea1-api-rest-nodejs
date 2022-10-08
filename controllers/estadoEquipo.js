const { query } = require('../utils/dbUtils');

console.log('[estadoEquipo] query', query)

module.exports = {
    getEstados: async (req, res) => {
        console.log('[GET] /equipos/estados req.query: ', req.query);
        const { id } = req.query;

        let queryString = "SELECT * FROM estados";

        if (id) queryString = `SELECT * FROM estados WHERE id = ${id}`;

        const result = await query(queryString);

        res.json({ 
            message: 'OK',
            data: result
        });
    },
    createEstadoEquipo: async  (req, res) => {
        console.log('[POST] /equipos/estados req.body: ', req.body);
        
        const { name, status, createdDate, updateDate } = req.body;
        const intStatus = status ? 1 : 0;

        try {
            await query(`INSERT INTO estados (nombre, estado, fechaCreacion, fechaActualizacion)
                VALUES ('${name}', '${intStatus}', '${createdDate}', '${updateDate}')`);

            res.status(200).json({ message: 'estado de equipo creado' });

        } catch (e) {
            console.log('My server log error: ', e)
            res.status(400).json({ message: 'no se pudo crear el estado de equipo' });
        }       
    },
    updateEstadoEquipo: async (req, res) => {
        console.log('[PUT] /equipos/estados req.body: ', req.body);

        const { id, name, status, createdDate, updateDate } = req.body;
        const intStatus = status ? 1 : 0;

        try {
            await query(`
                UPDATE estados SET 
                nombre = '${name}',
                estado = ${intStatus},
                fechaCreacion = '${createdDate}',
                fechaActualizacion = '${updateDate}'
                WHERE id = ${id}
            `);

            res.status(200).json({ message: 'estado de equipo actualizado' });

        } catch (e) {
            console.log('My server log error: ', e)
            res.status(400).json({ message: 'no se pudo actualizar el estado de equipo' });
        }    
    },
    deleteEstadoEquipo: async (req, res) => {
        console.log('[DELETE] /equipos/estados req.body: ', req.body);

        const { id } = req.body;

        try {
            await query(`DELETE FROM estados WHERE id = ${id}`);

            res.status(200).json({ message: 'estado de equipo eliminado' });

        } catch (e) {
            console.log('My server log error: ', e)
            res.status(400).json({ message: 'no se pudo eliminar el estado de equipo' });
        } 
    },
};
