import { db } from './firebase-config.js';
import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const tabla = document.getElementById('tabla-productos');

async function cargarProductos() {
    const querySnapshot = await getDocs(collection(db, "product"));
    tabla.innerHTML = ""; // Limpiar antes de cargar

    querySnapshot.forEach((documento) => {
        const data = documento.data();
        const id = documento.id;

        const fila = document.createElement('tr');
        fila.innerHTML = `
      <td>${data.name}</td>
      <td>$${data.price}</td>
      <td>${data.category}</td>
      <td>${data.stock}</td>
      <td>
        <a href="agregar-producto.html?id=${id}" class="btn btn-sm btn-primary me-2">Editar</a>
        <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${id}')">Eliminar</button>
      </td>
    `;

        tabla.appendChild(fila);
    });
}

window.eliminarProducto = async function (id) {
    const confirmar = confirm("¿Estás seguro de eliminar este producto?");
    if (confirmar) {
        await deleteDoc(doc(db, "product", id));
        alert("Producto eliminado correctamente");
        cargarProductos(); // Recargar la tabla
    }
}

cargarProductos();
