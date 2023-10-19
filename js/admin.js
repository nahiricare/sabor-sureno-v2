const formularioProductoHTML = document.getElementById("Product-form");

formularioProductoHTML.addEventListener('submit', () => {
    alert('Evento Submit')
})


const Productos = [
    {
        descripcion: 'Mates de Ceramica distintos colores',
        titulo: 'Mates de ceramica',
        fechaDeCreacion: '2023-08-29',
        precio: 4500,
        imagen:'/assets/Imagen/Mate-Amarillo-Limon.jpg',
        categoria: 'Mates y Bombillas',
    },
    {
        descripcion: 'Bombillas chatas grabadas a pedido',
        titulo: 'Bombillas grabadas',
        fechaDeCreacion: '2023-08-25',
        precio: 2500,
        imagen: '/assets/Imagen/Bombilla-corazon.jpeg',
        categoria: 'Mates y Bombillas'
    },
    {
        descripcion: 'Toppings naturales para yerba DoyPack',
        titulo: 'Toppings para yerba',
        fechaDeCreacion: '2023-07-20',
        precio: 2100,
        imagen: '/assets/Imagen/mate-topping-3.jpg',
        categoria: 'Yerbas y Toppings'
    },
    {
        descripcion: 'Yerba Organica con bolsa compostable x 500 gr.',
        titulo: 'Yerba Organica',
        fechaDeCreacion: '2023-05-17',
        precio: 3500,
        imagen: '/assets/Imagen/Yerba-organica-1.jpg',
        categoria: 'Yerbas y toppings'
    },
    {
        descripcion: 'Saquitos de Té patagonicos caja x 20un.',
        titulo: 'Saquitos de Té Patagonia',
        fechaDeCreacion: '2023-04-20',
        precio: 1000,
        imagen: '/assets/Imagen/te-saquitos-1.png',
        categoria: 'Te e Infusiones'
    },
    {
        descripcion: 'Té en hebras Doy Pack x 50 gr.',
        titulo: 'Té en hebras Doy Pack',
        fechaDeCreacion: '2022-04-29',
        precio: 2800,
        imagen: '/assets/Imagen/te-hebras-1.png',
        categoria: 'Te e Infusiones'
    },
    {
        descripcion: 'Té en hebras, lata premium x 80 gr.',
        titulo: 'Té en hebras premium',
        fechaDeCreacion: '2023-01-12',
        precio: 3500,
        imagen: '/assets/Imagen/te-hebras-lata-2.png',
        categoria: 'Te e Infusiones'
    },
    {
        descripcion: 'Yerba Mate premium de la patagonia con topping naturales x 250 gr.',
        titulo: 'Yerba Mate Patagonia',
        fechaDeCreacion: '2023-02-03',
        precio: 3000,
        imagen: '/assets/Imagen/yerba-mate-premium-2.png',
        categoria: 'Yerbas y toppings'
    }
];

document.addEventListener("DOMContentLoaded", function() {
    const tableBodyElements = document.querySelectorAll(".main-table-admin");
    let tableHTML = ""; 

    tableHTML += `
        <thead>
            <tr>
                <th scope="col" class="Table-Title">Imagen</th>
                <th scope="col" class="Table-Title">Titulo</th>
                <th scope="col" class="Table-Title">Descripción</th>
                <th scope="col">Precio</th>
                <th scope="col" class="Table-Title">Categoria</th>
                <th scope="col" class="Table-Title">Acciones</th>
            </tr>
        </thead>
        <tbody>
    `;

    tableBodyElements.forEach(function(tableBodyElement) {
        Productos.forEach(function(Product) {
            tableHTML += `
                <tr>
                    <th class="Table-image"><img src=${Product.imagen}></th>
                    <td class="Table-Title">${Product.titulo}</td>
                    <td class="Table-description">${Product.descripcion}</td>
                    <td class="Table-Price">${Product.precio}</td>
                    <td class="Table-category">${Product.categoria}</td>
                    <td>BOTON EDITAR<br>OTRO BOTON</td>
                </tr>
            `;
        });
    });

    tableHTML += `</tbody>`;

    tableBodyElements.forEach(function(tableBodyElement) {
        tableBodyElement.innerHTML = tableHTML;
    });
});




