const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { query } = require('../utils/dbUtils');
const { ROLES, findRoleNameById } = require('../utils/misc');

module.exports = {
    getUsuarios: async (req, res) => {
        console.log('[GET] /usuarios req.query: ', req.query);
        const { id } = req.query;

        let queryString = "SELECT * FROM usuarios";

        if (id) queryString = `SELECT * FROM usuarios WHERE id = ${id}`;

        try {
            const result = await query(queryString);
  
            const data = result.map((user) => {
                return {
                    id: user.id,
                    nombre: user.nombre,
                    email: user.email,
                    estado: user.estado,
                    fechaCreacion: user.fechaCreacion,
                    fechaActualizacion: user.fechaActualizacion,
                    contrasena: user.contrasena,
                    rol: findRoleNameById(user.idRol)
                }
            });

            res.json({ 
                message: 'OK',
                data
            });
        } catch (e) {
            console.log('My server log error: ', e)
            res.status(500).json({ message: 'no se pudo obetener usuarios' });
        }

    },
    createUsuario: async  (req, res) => {
        console.log('[POST] /usuarios req.body: ', req.body);
        
        const { name, email, status, createdDate, updateDate, contrasena, rol } = req.body;
        const intStatus = status ? 1 : 0;
        const idRol = ROLES[rol];

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }

            const existeEmail = await query(`SELECT id FROM usuarios WHERE email = '${email}'`);
            if (existeEmail.length > 0) {
                return res.status(400).json({ message: `El usuario con email: ${email} ya existe` });
            }

            const salt = bcrypt.genSaltSync();
            const contrasenaEncriptada = bcrypt.hashSync(contrasena, salt);

            await query(`INSERT INTO usuarios (nombre, email, estado, fechaCreacion, fechaActualizacion, contrasena, idRol)
                VALUES ('${name}', '${email}', '${intStatus}', '${createdDate}', '${updateDate}', '${contrasenaEncriptada}', '${idRol}')`);

            res.status(200).json({ message: 'usuario creado' });

        } catch (e) {
            console.log('My server log error: ', e)
            res.status(400).json({ message: 'no se pudo crear el usuario' });
        }       
    },
    updateUsuario: async (req, res) => {
        console.log('[PUT] /usuarios req.body: ', req.body);

        const { id, name, email, status, createdDate, updateDate, contrasena, rol } = req.body;
        const intStatus = status ? 1 : 0;
        const idRol = ROLES[rol];

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }

            const salt = bcrypt.genSaltSync();
            const contrasenaEncriptada = bcrypt.hashSync(contrasena, salt);

            await query(`
                UPDATE usuarios SET 
                nombre = '${name}',
                email = '${email}',
                estado = ${intStatus},
                fechaCreacion = '${createdDate}',
                fechaActualizacion = '${updateDate}',
                contrasena = '${contrasenaEncriptada}',
                idRol = '${idRol}'
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }

            await query(`DELETE FROM usuarios WHERE id = ${id}`);

            res.status(200).json({ message: 'usuario eliminado' });

        } catch (e) {
            console.log('My server log error: ', e)
            res.status(400).json({ message: 'no se pudo eliminar el usuario' });
        } 
    },
};
