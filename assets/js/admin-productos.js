import { db } from './firebase-config.js';
import {
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    deleteDoc,
    collection
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
const form = document.getElementById('form-producto');
const tabla = document.getElementById('tabla-productos');
const btnAgregar = document.getElementById('btn-agregar');
const tituloFormulario = document.getElementById('titulo-formulario');
const productoIdInput = document.getElementById('productoId');

// Cargar productos
async function cargarProductos() {
    tabla.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "product"));
    querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const tr = document.createElement("tr");

        tr.innerHTML = `
      <td class="align-middle">${data.name}</td>
      <td class="align-middle">$${data.price.toFixed(2)}</td>
      <td class="align-middle">${data.category}</td>
      <td class="align-middle text-center"><span class="badge bg-success">${data.stock}</span></td>
      <td class="align-middle text-end">
        <div class="btn-group">
          <button class="btn btn-sm btn-outline-primary btn-editar" data-id="${docSnap.id}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${docSnap.id}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </td>
    `;

        tabla.appendChild(tr);
    });
}

// Mostrar modal para nuevo producto
btnAgregar.addEventListener("click", () => {
    tituloFormulario.textContent = "Agregar Producto";
    form.reset();
    productoIdInput.value = "";
    modal.show();
});

// Evento para editar
tabla.addEventListener("click", async (e) => {
    if (e.target.closest(".btn-editar")) {
        const id = e.target.closest(".btn-editar").dataset.id;
        const ref = doc(db, "product", id);
        const docSnap = await getDoc(ref);

        if (docSnap.exists()) {
            const data = docSnap.data();
            tituloFormulario.textContent = "Editar Producto";
            productoIdInput.value = id;
            document.getElementById("name").value = data.name;
            document.getElementById("description").value = data.description;
            document.getElementById("category").value = data.category;
            document.getElementById("stock").value = data.stock;
            document.getElementById("price").value = data.price;
            document.getElementById("imagePath").value = data.imagePath;
            modal.show();
        }
    }

    // Eliminar producto
    if (e.target.closest(".btn-eliminar")) {
        const id = e.target.closest(".btn-eliminar").dataset.id;
        if (confirm("¿Seguro que deseas eliminar este producto?")) {
            await deleteDoc(doc(db, "product", id));
            alert("Producto eliminado");
            cargarProductos();
        }
    }
});

// Guardar producto (nuevo o editar)
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const producto = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        stock: parseInt(document.getElementById("stock").value),
        price: parseFloat(document.getElementById("price").value),
        imagePath: document.getElementById("imagePath").value,
    };

    const id = productoIdInput.value;
    if (id) {
        await setDoc(doc(db, "product", id), producto);
        alert("Producto actualizado");
    } else {
        await addDoc(collection(db, "product"), producto);
        alert("Producto agregado");
    }

    modal.hide();
    form.reset();
    cargarProductos();
});

// Inicializar
cargarProductos();
