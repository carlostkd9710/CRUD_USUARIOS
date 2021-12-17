import {
    url as endpoint
} from '../scripts/url.js';

document.getElementById('inputId').style.display = 'none';
const ul = document.querySelector('.list-group');

const getUser = async () => {
    const respuesta = await fetch(endpoint);
    const data = await respuesta.json()
    data.forEach(element => {
        const {
            id,
            nombre,
            url
        } = element;
        ul.innerHTML += `
            <li class="list-group-item">
                <img src=${url} width="50px"><img/>
                <span class="lead">${nombre}</span>
                <button id=${id} class="btn btn-danger btm-sm float-end">Borrar</button>
            </li>
        `
    });
}

window.addEventListener('DOMContentLoaded', getUser)

/* PETICIÓN PARA ELIMINAR */
ul.addEventListener('click', async (e) => {
    const btnEliminar = e.target.classList.contains('btn-danger');

    if (btnEliminar === true) {
        const id = e.target.id;
        await fetch(endpoint + id, {
            method: 'DELETE'
        })
    }

})
/* CAPTURAR DATOS DEL FORMULARIO */

const capturarDatos = () => {
    const url = document.getElementById('inputUrl').value;
    const nombre = document.getElementById('inputNombre').value;
    const correo = document.getElementById('inputCorreo').value;
    const descripcion = document.getElementById('inputDescripcion').value;

    const user = {
        url,
        nombre,
        correo,
        descripcion
    }
    return user;
}
/* PETICIÓN PARA POST */

const form = document.querySelector('.form-group');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const objeto = capturarDatos();
    await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
})

/* FUNCIÓN BUSCAR POR CORREO */

const btnCorreo = document.getElementById('btnCorreo');

btnCorreo.addEventListener('click', async () => {
    const input = document.getElementById('inputCorreo').value;
    const resp = await fetch(endpoint);
    const lista = await resp.json()
    const buscado = lista.find(u => u.correo.toLowerCase() === input.toLowerCase())

    if (buscado !== undefined) {
        const {
            id,
            nombre,
            descripcion
        } = buscado;
        document.getElementById('inputUrl').value = buscado.url;
        document.getElementById('inputNombre').value = nombre;
        document.getElementById('inputDescripcion').value = descripcion;
        document.getElementById('inputId').value = id;
    } else {
        alert('No se encontro el correo')
    }
})

/* MODIFICAR LA BUSQUEDA */

const btnModificar = document.getElementById('btnModificar');
btnModificar.addEventListener('click', async () => {
    const dataMod = capturarDatos();
    const {
        url,
        nombre,
        correo,
        descripcion
    } = dataMod;

    if (url === "", nombre === "", correo === "", descripcion === "") {
        alert('Por favor llenar todos los campos');
    } else {
        const id = document.getElementById('inputId').value;
        console.log(dataMod)
       alert('modificando')
        await fetch(endpoint + id, {
            method: 'PUT',
            body: JSON.stringify(dataMod),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
    }
})