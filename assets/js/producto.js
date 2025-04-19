import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Obtener ID del producto desde la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Función principal
async function cargarProducto() {
    if (!productId) return;

    const ref = doc(db, "product", productId);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        const data = docSnap.data();

        // Plantilla HTML con diseño: imagen al lado izquierdo, detalles a la derecha
        const contenedor = document.getElementById("detalle-producto");
        contenedor.innerHTML = `
            <div class="row align-items-start">
                <div class="col-md-5 text-center">
                    <img src="${data.imagePath}" alt="${data.name}" 
                    class="img-fluid product-image-zoom w-100">
                </div>
                <div class="col-md-7">
                    <h1 class="h2" id="nombre-producto">${data.name}</h1>
                    <p class="h3 py-2 text-success" id="precio-producto">$${data.price}</p>
                    <p id="descripcion-producto" >${data.description}</p>

                    <div class="d-grid gap-2 d-md-flex">
                                            <a href="https://wa.me/+51981183416?text=${encodeURIComponent(
            `¡Hola! Estoy interesado en este producto:\n\n*${data.name}*\n\nPrecio: $${data.price}\n\n¿Podrías darme más información?`
        )}" 
            class="btn btn-success me-md-2" 
            target="_blank">
                <i class="fab fa-whatsapp me-2"></i> Comprar por WhatsApp
            </a>
                    </div>
                </div>
            </div>
        `;
    } else {
        alert("Producto no encontrado");
    }
}

cargarProducto();
