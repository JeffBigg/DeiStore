import { db } from './firebase-config.js';
import {
    doc,
    getDoc,
    setDoc,
    addDoc,
    collection
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const form = document.getElementById('form-producto');
const titulo = document.getElementById('titulo-formulario');

if (id) {
    cargarProducto();
    titulo.textContent = "Editar Producto";
} else {
    titulo.textContent = "Agregar Producto";
}

async function cargarProducto() {
    const ref = doc(db, "product", id);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById("name").value = data.name;
        document.getElementById("description").value = data.description;
        document.getElementById("category").value = data.category;
        document.getElementById("stock").value = data.stock;
        document.getElementById("price").value = data.price;
        document.getElementById("imagePath").value = data.imagePath;
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const producto = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        stock: parseInt(document.getElementById("stock").value),
        price: parseFloat(document.getElementById("price").value),
        imagePath: document.getElementById("imagePath").value
    };

    if (id) {
        await setDoc(doc(db, "product", id), producto);
        alert("Producto actualizado");
    } else {
        await addDoc(collection(db, "product"), producto);
        alert("Producto agregado");
    }

    window.location.href = "admin-productos.html";
});
