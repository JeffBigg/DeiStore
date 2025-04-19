import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const container = document.getElementById('product-container');

async function mostrarProductos() {
  try {
    const productosCol = collection(db, "product");
    const productosSnapshot = await getDocs(productosCol);

    if (productosSnapshot.empty) {
      container.innerHTML = "<p>No hay productos disponibles.</p>";
      return;
    }

    productosSnapshot.forEach((doc) => {
      const producto = doc.data();

      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4'; // Bootstrap responsive column

      card.innerHTML = `
        <div class="card h-100">
          <a href="shop-single.html?id=${doc.id}"> 
            <img src="${producto.imagePath}" class="card-img-top" alt="${producto.name}" style="height: 300px; object-fit: cover;" >
          </a>
          <div class="card-body">
            <a href="shop-single.html?id=${doc.id}" class="h3 text-decoration-none">${producto.name}</a>
            <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
              <li>${producto.category}</li>
              <li class="pt-2">
                <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
              </li>
            </ul>
            <ul class="list-unstyled d-flex justify-content-center mb-1">
              <li>
                <i class="text-warning fa fa-star"></i>
                <i class="text-warning fa fa-star"></i>
                <i class="text-warning fa fa-star"></i>
                <i class="text-muted fa fa-star"></i>
                <i class="text-muted fa fa-star"></i>
              </li>
            </ul>
            <p class="text-center mb-0">S/.${producto.price}</p>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    container.innerHTML = "<p>Error al cargar los productos. Verifica la consola.</p>";
  }
}

mostrarProductos();
