const express = require('express');
const app = express();

const temas = [
    {id: 1, nombre: "tema1", link: "http:/"},
    {id: 2, nombre: "tema2", link: "http:/"},
    {id: 3, nombre: "tema3", link: "http:/"},
];

app.use(express.json()); // para enviar los datos en formato json
// Ruta para obtener todos los temas
app.get('/temas', (req, res) => {
    try{
        res.json(temas);
    } catch {
        res.status(500).json({mensaje: 'Error al obtener los datos'});
    }
});

// Ruta para obtener los datos por id
app.get('/temas/:id', (req, res) =>{
    const id = parseInt(req.params.id); // obtener el id de la ruta y convertilo a un numero
    const tema = temas.find(t => t.id === id); // Busca el tema por id

    if (tema){
        res.json(tema);
    }else{
        res.status(404).json({mensaje: 'Tema no encontrado'});
    }
});

// ruta para agregar datos a temas
app.post('/temas', (req, res) => {
    const { id, nombre, link } = req.body; // Extraer id, nombre, y link del cuerpo de la solicitud

    // condicional para que todos los campos se completen
    if (!id || !nombre || !link){
        return res.status(400).json({error:'Se deben completar todos los campos'});
    }

    // Condicional para que el id no se repita
    const verifarId = temas.find(t => t.id === id);
    if (verifarId){
        return res.status(400).json({error: 'El id ya existe'});
    }

    const nuevoTema = { id, nombre, link };
    temas.push(nuevoTema); // Agregar el nuevo tema al array
    res.status(201).json(nuevoTema); // Enviar el nuevo tema como respuesta con estado 201
});

// ruta para actualizar un tema
app.put('/temas/:id', (req, res) => {
    const id = parseInt(req.params.id); // Corrección aquí
    const { nombre, link } = req.body;

    // Encontrar el índice del tema a actualizar
    const indice = temas.findIndex(t => t.id === id);

    if (indice !== -1) {
        // Si el tema existe, actualízalo
        temas[indice] = { id, nombre, link }; // Mantener el mismo id y actualizar nombre y link
        res.status(200).json(temas[indice]); // Responder con el tema actualizado
    } else {
        // Si no se encuentra el tema, devolver un error 404
        res.status(404).json({ mensaje: 'Tema no encontrado' });
    }
})

// ruta para actualizar un parametro 
app.patch('/temas/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const {nombre} = req.body

    const indice = temas.findIndex(t => t.id === id);

    if (indice === -1){
        return res.status(404).json({error: 'Tema no encontrado'});
    }

    temas[indice].nombre = nombre; // se actualiza solo el nombre
    res.status(200).json(temas[indice].nombre);

});

// Eliminar un tema
app.delete('/temas/:id', (req, res) =>{
    const id = parseInt(req.params.id);

    // obtener el indice
    const indice = temas.findIndex(t => t.id === id);
    
    if(indice !== -1){
        const eliminarTema = temas.splice(indice,1); // el número 1 es el segundo argumento del método splice. Este argumento indica la cantidad de elementos que deseas eliminar del array a partir de la posición especificada por el primer argumento (indice).
        res.status(200).json({mensaje: 'Tema eliminado', tema:eliminarTema });
    } else {
        res.status(404).json({mensaje: 'Tema no encontrado'});
    }
});

app.listen(3001, ()=>{
    console.log('servidor corriendo en http://localhost:3001')
});


// console.log(persona);
// console.log(persona[0].nombre);
// console.log(persona[1].edad);