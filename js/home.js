
const productos = JSON.parse(localStorage.getItem("productos"));

if (productos && Array.isArray(productos) && productos.length > 0) {

  console.log("Productos encontrados en localStorage:", productos);
} else {

  console.log("No se encontraron productos en localStorage.");
}

const cardContainer = document.getElementById("card-container");
productos.forEach((prod) => {
    cardContainer.innerHTML += `
    <article class="card">
    <div class="card-header">
        <figure>
            <img src="${prod.imagen}" alt="${prod.titulo}" >
      </figure>
  </div>
  <div class="card-main">
      <h2>${prod.titulo}</h2>
      <div class="card-description">
          <p>${prod.descripcion}</p>
      </div>
  <div class="card-prices">
      <div class="card-dates">
          <h3>Nuevo Ingreso!</h3>
          <p>${prod.fechaDeCreacion}</p>
      </div>
      <div class="card-price">$${prod.precio}</div>
  </div>
</div>
  <div class="card-footer">
      <button class="card-ditails">Ver mas</button>
      <button class="card-buy">Comprar</button>
  </div>
  </article>`
})

