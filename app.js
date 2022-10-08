const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const rutasTipoEquipo = require('./routes/tipoEquipo');
const rutasEstadoEquipo = require('./routes/estadoEquipo');
const rutasMarca = require('./routes/marca');
const rutasUsuario = require('./routes/usuario');
const rutasInventario = require('./routes/inventario');

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"))
app.listen(port, () => console.log(`server running at ${port}`));

app.get('/', (req, res) => {
    res.json({ message: 'api working' });
});

app.use('/equipos/tipos', rutasTipoEquipo);
app.use('/equipos/estados', rutasEstadoEquipo);
app.use('/marcas', rutasMarca);
app.use('/usuarios', rutasUsuario);
app.use('/inventarios', rutasInventario);
