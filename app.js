const express = require('express');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

let clientes = [
    { nombre: "JazzTel", cif: "A12345678", direccion: "Gran Vía, 22", localidad: "Barcelona" },
    { nombre: "Orange", cif: "A87654321", direccion: "Príncipe Pío, 40", localidad: "Bilbao" },
    { nombre: "Movistar", cif: "A44445555", direccion: "Castellana, 100", localidad: "Madrid" },
]

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send(clientes);
})

app.get('/:cif', (req, res) => {
    let cliente = clientes.find(elem => {
        return elem.cif === req.params.cif;
    })
    if (cliente === undefined) {
        return res.status(404).json({
            mensaje: 'No se encontró ningún cliente con ese CIF'
        })
    }
    res.status(200).json({
        cliente: cliente
    })
})


app.post('/', (req, res) => {
    if (req.body === undefined) {
        return res.status(400).json({
            mensaje: 'Datos de cliente obligatorios'
        })
    }
    clientes.push(req.body);
    res.status(201).json({
        mensaje: 'El cliente ha sido registrado correctamente'
    })
    // console.log(clientes);
})

app.put('/:cif', (req, res) => {
    if (req.body === undefined) {
        return res.status(400).json({
            mensaje: 'Datos de cliente a actualizar obligatorios'
        })
    }
    if (req.params.cif === undefined) {
        return res.status(400).json({
            mensaje: 'CIF del cliente a actualizar obligatorio'
        })
    }
    const posicion = clientes.findIndex(elem => {
        return elem.cif === req.params.cif;
    })
    if (posicion < 0) {
        return res.status(404).json({
            mensaje: 'Cliente no encontrado'
        })
    }
    if (req.body.nombre !== undefined) {
        clientes[posicion].nombre = req.body.nombre;
    }
    if (req.body.direccion !== undefined) {
        clientes[posicion].direccion = req.body.direccion;
    }
    if (req.body.localidad !== undefined) {
        clientes[posicion].localidad = req.body.localidad;
    }
    res.status(201).json({
        mensaje: 'El cliente ha sido actualizado correctamente'
    })
    // console.log(clientes)
})

app.delete('/:cif', (req, res) => {
    if (req.params.cif === undefined) {
        return res.status(400).json({
            mensaje: 'CIF del cliente a actualizar obligatorio'
        })
    }
    const posicion = clientes.findIndex(elem => {
        return elem.cif === req.params.cif;
    })
    if (posicion < 0) {
        return res.status(404).json({
            mensaje: 'Cliente no encontrado'
        })
    }
    clientes.splice(posicion, 1);
    res.status(200).json({
        mensaje: 'El cliente ha sido eliminado correctamente'
    })
    console.log(clientes)
})


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})