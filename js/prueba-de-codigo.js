const productosPrimerInicio = [
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

let productosSaborSur = JSON.parse(localStorage.getItem("productos")) || productosPrimerInicio


if(  JSON.parse(localStorage.getItem("productos")) === null  ) {

    localStorage.setItem("productos", JSON.stringify(productosSaborSur))
}

let idEditar;
const btn = document.querySelector('button.btn[type="submit"]')
const tableBodyHTML = document.querySelector("#table-body")

pintarProductos(productosSaborSur)


const inputFiltrarHTML = document.getElementById("filtrar")

const formularioProductoHTML = document.getElementById("Product-form")
formularioProductoHTML.addEventListener('submit', (evt) => {

    evt.preventDefault()

    const el = formularioProductoHTML.elements;

    // let id = idEditar === undefined ? crypto.randomUUID() : idEditar
    let id;

    //Definimos si el producto lo estamos editando la propiedad id no la modificamos sin embargo si NO estamos editando le genero un Id con crypto
    if(idEditar) {
        id = idEditar
    } else {
        id = crypto.randomUUID()
    }
    const nuevoProducto = {
            id: id,
            titulo: formularioProductoHTML.elements.TituloProducto.value,
            descripcion: formularioProductoHTML.elements.DescripcionDelProducto.value,
            precio: formularioProductoHTML.elements.PrecioProducto.value,
            imagen: formularioProductoHTML.elements.ImagenProducto.value,
            categoria: formularioProductoHTML.elements.categoriaProductos.value,
        fechaDeCreacion: obtenerFecha(),
    }

    if(idEditar) {
        //Busco el indice del elemento que quiero editar
        const index = productosSaborSur.findIndex(product => {
            return product.id === idEditar
        })
        //Remplazo el producto encontrado directamente en el array
        productosSaborSur[index] = nuevoProducto;
        //Reseteo la variable editar
        idEditar = undefined;
        //Vuelvo el botón a su estado normal
        btn.innerText = "Agregar producto"
        btn.classList.remove("btn-success")
    } else {
        productosSaborSur.push(nuevoProducto)
    }


    Swal.fire({
        icon: 'success',
        title: 'Producto agregado/modificado correctamente',
        text: 'El producto se actualizo o modifico correctamente!',
      })


      pintarProductos(productosSaborSur)

      localStorage.setItem("productos", JSON.stringify(productosSaborSur))
      
      formularioProductoHTML.reset()
      el.TituloProducto.focus()
  })


// - PINTAR PRODUCTOS
function pintarProductos(arrayAPintar) {

    tableBodyHTML.innerHTML = "";

    arrayAPintar.forEach(function(prodSabor, index) {
        tableBodyHTML.innerHTML += 
            `<tr>
                <td class="table-image">
                    <img src="${prodSabor.imagen}" alt="${prodSabor.titulo}" style= "width: 70px; height: 70px; object-fit: cover; border-radius: 50%;">
                </td>
                <td class="table-title">${prodSabor.titulo}</td>
                <td class="table-description">${prodSabor.descripcion}</td>
                <td class="table-price">${prodSabor.precio}</td>
                <td class="table-category">${prodSabor.categoria}</td>
                <td >
                    <div class="d-flex gap-1">
                        <button class="btn-delete btn btn-danger btn-sm" onclick="borrarProducto('${prodSabor.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <button class="btn btn-success btn-sm" onclick="editarProducto('${prodSabor.id}')" data-bs-toggle="modal" data-bs-target="#formModal">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                    
                </td>
            </tr>`
    })
}


//Funcion para filtrar productos
inputFiltrarHTML.addEventListener('keyup', (evt) => {

    const busqueda = evt.target.value.toLowerCase();
    
    const resultado = productosSaborSur.filter((producto) =>  {
        //Iterar cada producto
        const titulo = producto.titulo.toLowerCase()
        //Vamor a mirar si la busqueda coincide con el titulo
        if( titulo.includes(busqueda)  ) {
            return true
        } 
        return false
    } )
    pintarProductos(resultado)

})

const borrarProducto = (idABuscar) => {
    Swal.fire({
        title: 'Desea borrar producto',
        icon: 'error',
        text: 'Realmente desea elminar el producto?',
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar' ,
        confirmButtonText: 'Borrar',
      }).then((result) => {

        if(result.isConfirmed) {
            const indiceEncontrado = productosSaborSur.findIndex((productoFindIndex) => {
                if(productoFindIndex.id === idABuscar) {
                    return true
                }
                return false
            })
            productosSaborSur.splice(indiceEncontrado, 1);

            pintarProductos(productosSaborSur)

            localStorage.setItem("productos", JSON.stringify(productosSaborSur)   )


            Swal.fire('Borrado!', 'Producto borrado correctamente', 'success')
        }
    })
}

const editarProducto = function(idRecibido) {
    console.log(`Editar elemento ${idRecibido}`)

    const productoEditar = productosSaborSur.find((prod) => {
        return prod.id === idRecibido;
    });

    // Verifica si se encontró un producto para editar
    if (!productoEditar) return;

    idEditar = productoEditar.id;

    // Deberías rellenar el formulario en el modal con los datos del producto a editar
    const elements = formularioProductoHTML.elements;
    elements.TituloProducto.value = productoEditar.titulo;
    elements.PrecioProducto.value = productoEditar.precio;
    elements.DescripcionDelProducto.value = productoEditar.descripcion;
    elements.ImagenProducto.value = productoEditar.imagen;
    elements.categoriaProductos.value = productoEditar.categoria;


    btn.innerText = "Editar Producto";
    btn.classList.add("btn-success");

    console.log(editarProducto);
}


function obtenerFecha() {
    const fecha = new Date()
    let mes = fecha.getMonth() + 1;
    if(mes < 10) {
        mes = '0'+ mes
    }
    let dia = fecha.getDate()
    if(dia < 10) {
        dia = '0' + dia
    }
    const year = fecha.getFullYear()

    const fechaFormateada = `${year}-${mes}-${dia}`
    return fechaFormateada
}
































// document.addEventListener("DOMContentLoaded", function() {
//     const tableBodyElement = document.querySelector("#tablaDeProductos tbody");

//     function actualizarTabla() {
//         let tableHTML = "";

//         Productos.forEach(function(Product, index) {
//             tableHTML += `
//                 <tr>
//                     <th class="Table-image"><img src=${Product.imagen}></th>
//                     <td class="Table-Title">${Product.titulo}</td>
//                     <td class="Table-description">${Product.descripcion}</td>
//                     <td class="Table-Price">${Product.precio}</td>
//                     <td class="Table-category">${Product.categoria}</td>
//                     <td>
//                         <button onclick="editarProducto(${index})">Editar</button>
//                         <button onclick="eliminarProducto(${index})">Eliminar</button>
//                     </td>
//                 </tr>
//             `;
//         });
//         if (tableBodyElement) {
//             tableBodyElement.innerHTML = tableHTML;
//         }
//     }

//     const fecha = new Date();
//     const year = fecha.getFullYear();
//     const mes = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
//     const dia = fecha.getDate();

//     const formularioProductoHTML = document.getElementById("Product-form");

//     formularioProductoHTML.addEventListener('submit', (eventoEjecutado) => {
//         eventoEjecutado.preventDefault();

//         const nuevoProducto = {
//             titulo: formularioProductoHTML.elements.TituloProducto.value,
//             imagen: formularioProductoHTML.elements.ImagenProducto.value,
//             descripcion: formularioProductoHTML.elements.DescripcionDelProducto.value,
//             precio: formularioProductoHTML.elements.PrecioProducto.value,
//             categoria: formularioProductoHTML.elements.categoriaProductos.value,
//             fechaDeCreacion: `${year} - ${mes} - ${dia}`,
//         };

//         Productos.push(nuevoProducto);

//         actualizarTabla(); // Actualiza la tabla después de agregar un producto
//     });

//     function editarProducto(index) {
//         // Implementa la lógica para editar un producto en el arreglo
//         // ...
//     }

//     function eliminarProducto(index) {
//             if (index >= 0 && index < Productos.length) {
//                 // Verifica si el índice es válido antes de eliminar el producto
//                 Productos.splice(index, 1); // Elimina el producto en el índice dado
//                 actualizarTabla(); // Actualiza la tabla después de eliminar el producto
//             } else {
//                 console.log("Índice de producto no válido");
//             }
//     }

//     actualizarTabla(); // Llama a la función para inicializar la tabla al cargar la página
// });