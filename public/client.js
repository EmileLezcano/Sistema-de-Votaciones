// public/client.js
document.getElementById('temasForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const tema = document.getElementById('tema').value;
    const url = document.getElementById('url').value;

    // Envía los datos al servidor utilizando fetch
    await fetch('/temas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema, url })
    });

    // Restablece el formulario después de agregar el tema
    document.getElementById('temasForm').reset();

    // Recarga la página para ver el nuevo tema
    window.location.reload();
    // se recarga la página usando window.location.reload() para actualizar la lista de temas en la interfaz.
});

// Función para votar por un tema
async function votarTema(id) {
    await fetch(`/temas/${id}/votar`, { method: 'PATCH' });
    window.location.reload();
}

// Función para eliminar un tema
async function eliminarTema(id) {
    await fetch(`/temas/${id}`, { method: 'DELETE' });
    window.location.reload();
}

// Función para iniciar la edición de un tema
function editarTema(id, temaActual, urlActual) {
    document.getElementById('editForm').style.display = 'block'; //  Cambia el estilo del formulario de edición editForm para que sea visible (display = 'block').
    document.getElementById('editTema').value = temaActual;
    document.getElementById('editUrl').value = urlActual;
    document.getElementById('editForm').onsubmit = async (e) => { // Define un onsubmit para que, al enviar este formulario, ejecute el bloque siguiente:
        e.preventDefault(); // e.preventDefault(): Evita que el formulario se envíe de forma predeterminada.
        const tema = document.getElementById('editTema').value;
        const url = document.getElementById('editUrl').value;
        
        await fetch(`/temas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tema, url })
        });
        window.location.reload();
    };
}

// Función para cancelar la edición
function cancelarEdicion() {
    document.getElementById('editForm').style.display = 'none';
    //  Oculta el formulario de edición (display = 'none') sin realizar ninguna acción en el servidor.
}
