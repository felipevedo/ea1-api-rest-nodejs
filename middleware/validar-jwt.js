const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Error, no esta autorizado' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    next();

  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: 'Error, no esta autorizado' });
  }
};

module.exports = {
  validarJWT
}