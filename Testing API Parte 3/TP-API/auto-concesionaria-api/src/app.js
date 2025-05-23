/*
	Agregar dependencia: npm i mysql2
	Ejecucion: node src/app

*/
const express = require('express');
const mysql = require('mysql2');
const util = require('util');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'auto_concesionaria'
});

conexion.connect((error) => {
    if (error) {
        throw error;
    }
    console.log('Conexión con la base de datos MySQL establecida');
});

const qy = util.promisify(conexion.query).bind(conexion);

/**
 * AUTO ENDPOINTS
 */

app.get('/auto', async (req, res) => {
    try {
        const query = 'SELECT * FROM auto';
        const respuesta = await qy(query);
        res.send({"respuesta": respuesta});
    } catch (e) {
        console.error(e.message);
        res.status(500).send({"Error": e.message});
    }
});

app.get('/auto/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM auto WHERE id = ?';
        const respuesta = await qy(query, [req.params.id]);
        if (respuesta.length === 0) {
            return res.status(404).send({"Error": "Auto no encontrado"});
        }
        res.send({"respuesta": respuesta});
    } catch (e) {
        console.error(e.message);
        res.status(500).send({"Error": e.message});
    }
});

// ...código existente...


// POST auto
app.post('/auto', async (req, res) => {
    try {
        const { marca, modelo, anio, concesionaria_id, precio } = req.body;
        if (!marca || !modelo || !anio || !concesionaria_id || !precio) {
            return res.status(400).send({"Error": "Faltan datos"});
        }
        const query = 'INSERT INTO auto (marca, modelo, anio, concesionaria_id, precio) VALUES (?, ?, ?, ?, ?)';
        const respuesta = await qy(query, [marca, modelo, anio, concesionaria_id, precio]);
        res.send({'respuesta': {"id": respuesta.insertId, ...req.body}});
    } catch (e) {
        console.error(e.message);
        res.status(500).send({"Error": e.message});
    }
});

// PUT auto
app.put('/auto/:id', async (req, res) => {
    try {
        const { marca, modelo, anio, concesionaria_id, precio } = req.body;
        if (!marca || !modelo || !anio || !concesionaria_id || !precio) {
            return res.status(400).send({"Error": "Faltan datos"});
        }
        const query = 'UPDATE auto SET marca = ?, modelo = ?, anio = ?, concesionaria_id = ?, precio = ? WHERE id = ?';
        const respuesta = await qy(query, [marca, modelo, anio, concesionaria_id, precio, req.params.id]);
        if (respuesta.affectedRows === 0) {
            return res.status(404).send({"Error": "Auto no encontrado"});
        }
        res.send({'respuesta': {"id": req.params.id, ...req.body}});
    } catch (e) {
        console.error(e.message);
        res.status(500).send({"Error": e.message});
    }
});

app.delete('/auto/:id', async (req, res) => {
    try {
        const query = 'DELETE FROM auto WHERE id = ?';
        const respuesta = await qy(query, [req.params.id]);
        if (respuesta.affectedRows === 0) {
            return res.status(404).send({"Error": "Auto no encontrado"});
        }
        res.send('Auto eliminado correctamente');
    } catch (e) {
        console.error(e.message);
        res.status(500).send({"Error": e.message});
    }
});

/**
 * CONCESIONARIA ENDPOINTS
 */

app.get('/concesionaria', async (req, res) => {
    try {
        const query = 'SELECT * FROM concesionaria';
        const respuesta = await qy(query);
        res.send({"respuesta": respuesta});
    } catch (e) {
        console.error(e.message);
        res.status(500).send({"Error": e.message});
    }
});

app.get('/concesionaria/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM concesionaria WHERE id = ?';
        const respuesta = await qy(query, [req.params.id]);
        if (respuesta.length === 0) {
            return res.status(404).send({"Error": "Concesionaria no encontrada"});
        }
        res.send({"respuesta": respuesta});
    } catch (e) {
        console.error(e.message);
        res.status(500).send({"Error": e.message});
    }
});

app.post('/concesionaria', async (req, res) => {
    try {
        const { nombre, direccion, telefono } = req.body;
        if (!nombre || !direccion || !telefono) {
            return res.status(400).send({ "Error": "Faltan datos" });
        }
        const query = 'INSERT INTO concesionaria (nombre, direccion, telefono) VALUES (?, ?, ?)';
        const respuesta = await qy(query, [nombre, direccion, telefono]);
        res.send({ 'respuesta': { "id": respuesta.insertId, nombre, direccion, telefono } });
    } catch (e) {
        console.error(e.message);
        res.status(500).send({ "Error": e.message });
    }
});

app.put('/concesionaria/:id', async (req, res) => {
    try {
        const { nombre, direccion } = req.body;
        const query = 'UPDATE concesionaria SET nombre = ?, direccion = ? WHERE id = ?';
        const respuesta = await qy(query, [nombre, direccion, req.params.id]);
        if (respuesta.affectedRows === 0) {
            return res.status(404).send({"Error": "Concesionaria no encontrada"});
        }
        res.send({'respuesta': {"id": req.params.id, ...req.body}});
    } catch (e) {
        console.error(e.message);
        res.status(500).send({"Error": e.message});
    }
});

app.delete('/concesionaria/:id', async (req, res) => {
    try {
        const query = 'DELETE FROM concesionaria WHERE id = ?';
        const respuesta = await qy(query, [req.params.id]);
        if (respuesta.affectedRows === 0) {
            return res.status(404).send({"Error": "Concesionaria no encontrada"});
        }
        res.send('Concesionaria eliminada correctamente');
    } catch (e) {
        console.error(e.message);
        res.status(500).send({"Error": e.message});
    }
});

// Servidor
app.listen(port, () => {
    console.log('Servidor escuchando en el puerto', port);
});