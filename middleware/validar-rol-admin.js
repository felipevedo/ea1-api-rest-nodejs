const validarRolAdmin = (req, res, next) => {
  if (req.payload.rol !== 'ADMINISTRADOR') {
    return res.status(401).json({ message: 'Error, no esta autorizado' });
  }
  
  next();
};

module.exports = {
  validarRolAdmin
}