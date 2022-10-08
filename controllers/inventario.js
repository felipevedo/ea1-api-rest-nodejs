const { query } = require('../utils/dbUtils');

module.exports = {
    getInventario: async (req, res) => {
        console.log('[GET] /inventario/ req.query: ', req.query);
        const { serial } = req.query;

        let queryString = "SELECT * FROM inventario";

        if (serial) queryString = `SELECT * FROM inventario WHERE serial = ${serial}`;

        const result = await query(queryString);

        res.json({ 
            message: 'OK',
            data: result
        });
    },
    createInventario: async  (req, res) => {
        console.log('[POST] /inventario req.body: ', req.body);
        
        const { model, description, photoUrl, color, buyDate, price, userId, brandId, stateId, typeId  } = req.body;

        try {
            await query(`INSERT INTO inventario (modelo, descripcion, urlFoto, color, fechaCompra, precio, idUsuarioACargo, idMarca, idEstado, idTipo)
              VALUES ('${model}', '${description}', '${photoUrl}', '${color}', '${buyDate}', '${price}', '${userId}', '${brandId}', '${stateId}', '${typeId}')`);

            res.status(200).json({ message: 'inventario creado' });

        } catch (e) {
            console.log('My server log error: ', e)
            res.status(400).json({ message: 'no se pudo crear el inventario' });
        }       
    },
    updateInventario: async (req, res) => {
        console.log('[PUT] /inventario req.body: ', req.body);

        const { serial, model, description, photoUrl, color, buyDate, price, userId, brandId, stateId, typeId  } = req.body;

        try {
            await query(`
                UPDATE inventario SET 
                modelo='${model}', descripcion='${description}', urlFoto='${photoUrl}', color='${color}', fechaCompra='${buyDate}', precio=${price}, idUsuarioACargo=${userId}, idMarca=${brandId}, idEstado=${stateId}, idTipo=${typeId}
                WHERE serial=${serial}
            `);

            res.status(200).json({ message: 'inventario actualizado' });

        } catch (e) {
            console.log('My server log error: ', e)
            res.status(400).json({ message: 'no se pudo actualizar el inventario' });
        }    
    },
    deleteInventario: async (req, res) => {
        console.log('[DELETE] /inventario req.body: ', req.body);

        const { serial } = req.body;

        try {
            await query(`DELETE FROM inventario WHERE serial = ${serial}`);

            res.status(200).json({ message: 'inventario eliminado' });

        } catch (e) {
            console.log('My server log error: ', e)
            res.status(400).json({ message: 'no se pudo eliminar el inventario' });
        } 
    },
};
