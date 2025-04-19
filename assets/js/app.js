// Importaciones Firebase Modular (v9+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD7ah_gSiea8qmtO68sIDxiCi5wdGMkXnk",
    authDomain: "deistore.firebaseapp.com",
    projectId: "deistore",
    storageBucket: "deistore.firebasestorage.app",
    messagingSenderId: "250424304046",
    appId: "1:250424304046:web:bacee681b0250a0fd5e83f",
    measurementId: "G-XMFVGWQC2X"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Función para renderizar productos
async function renderProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    const carousel = document.getElementById('carousel-related-product');

    querySnapshot.forEach(doc => {
        const product = doc.data();
        carousel.innerHTML += createProductCard(product);
    });

    // Re-inicializa el carrusel después de cargar productos
    $('#carousel-related-product').slick({
        // ... (mantén tu configuración original del slick)
    });
}

// Función para crear tarjetas de producto
function createProductCard(product) {
    return `
    <div class="p-2 pb-3">
      <div class="product-wap card rounded-0">
        <div class="card rounded-0">
          <img class="card-img rounded-0 img-fluid" src="${product.imagepath}">
          <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
            <ul class="list-unstyled">
              <li><a class="btn btn-success text-white"><i class="far fa-heart"></i></a></li>
              <li><a class="btn btn-success text-white mt-2"><i class="far fa-eye"></i></a></li>
              <li><a class="btn btn-success text-white mt-2"><i class="fas fa-cart-plus"></i></a></li>
            </ul>
          </div>
        </div>
        <div class="card-body">
          <a class="h3 text-decoration-none">${product.name}</a>
          <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
            <li>Stock: ${product.stock}</li>
            <li class="pt-2">
              ${getCategoryBadge(product.category)}
            </li>
          </ul>
          <p class="text-center mb-0">$${product.price}</p>
        </div>
      </div>
    </div>
  `;
}

// Función para mostrar categoría
function getCategoryBadge(category) {
    const categories = {
        electronics: 'primary',
        clothing: 'success',
        books: 'warning'
    };
    return `<span class="badge bg-${categories[category] || 'secondary'}">${category}</span>`;
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});


async function loadMainProduct() {
    // Cambia este ID por el de tu producto destacado
    const docRef = doc(db, "products", "ID_DEL_PRODUCTO");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const product = docSnap.data();
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price}`;
        document.getElementById('product-description').innerHTML = product.description;
    }
}

// Actualiza el event listener
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    loadMainProduct();
});