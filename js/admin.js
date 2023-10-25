const productosPrimerInicio = [
    {
        id:'9baab3-9ddb-4367-aabd-0f7fa85bbae9',
        descripcion: 'Mates de Ceramica distintos colores',
        titulo: 'Mates de ceramica',
        fechaDeCreacion: '2023-08-29',
        precio: 4500,
        imagen:'/assets/Imagen/Mate-Amarillo-Limon.jpg',
        categoria: 'Mates y Bombillas',
    },
    {
        id: 'f99e7d24-4cd7-41fb-b18b-1060120e0ee6',
        descripcion: 'Bombillas chatas grabadas a pedido',
        titulo: 'Bombillas grabadas',
        fechaDeCreacion: '2023-08-25',
        precio: 2500,
        imagen: '/assets/Imagen/Bombilla-corazon.jpeg',
        categoria: 'Mates y Bombillas'
    },
    {
        id: 'b471dd47-c395-421c-9d73-392447a9b14b',
        descripcion: 'Toppings naturales para yerba DoyPack',
        titulo: 'Toppings para yerba',
        fechaDeCreacion: '2023-07-20',
        precio: 2100,
        imagen: '/assets/Imagen/mate-topping-3.jpg',
        categoria: 'Yerbas y Toppings'
    },
    {
        id:'757470fd-771b-4c32-9076-27f1124f7681',
        descripcion: 'Yerba Organica con bolsa compostable x 500 gr.',
        titulo: 'Yerba Organica',
        fechaDeCreacion: '2023-05-17',
        precio: 3500,
        imagen: '/assets/Imagen/Yerba-organica-1.jpg',
        categoria: 'Yerbas y toppings'
    },
    {
        id:'a6c645ed-d63f-44bc-a89d-63fe78bb9f5b',
        descripcion: 'Saquitos de Té patagonicos caja x 20un.',
        titulo: 'Saquitos de Té Patagonia',
        fechaDeCreacion: '2023-04-20',
        precio: 1000,
        imagen: '/assets/Imagen/te-saquitos-1.png',
        categoria: 'Te e Infusiones'
    },
    {
        id:'c5b9a540-c153-468b-a4a6-ad6eb6690089',
        descripcion: 'Té en hebras Doy Pack x 50 gr.',
        titulo: 'Té en hebras Doy Pack',
        fechaDeCreacion: '2022-04-29',
        precio: 2800,
        imagen: '/assets/Imagen/te-hebras-1.png',
        categoria: 'Te e Infusiones'
    },
    {
        id: 'e3c18dc8-c10a-4462-bf22-2da8fde2f6f5',
        descripcion: 'Té en hebras, lata premium x 80 gr.',
        titulo: 'Té en hebras premium',
        fechaDeCreacion: '2023-01-12',
        precio: 3500,
        imagen: '/assets/Imagen/te-hebras-lata-2.png',
        categoria: 'Te e Infusiones'
    },
    {
        id:'f9a8c625-1d0d-4e3a-a220-0d810d8e6f26',
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


const formularioProductoHTML = document.getElementById("Product-form")



formularioProductoHTML.addEventListener('submit', (evt) => {

    evt.preventDefault()

    const el = formularioProductoHTML.elements;

    
    let id;

    if(idEditar) {
        id = idEditar
    } else {
        id = crypto.randomUUID()
    }
    
    const nuevoProducto = {
            id: id,
            titulo: el.TituloProducto.value,
            descripcion: el.DescripcionDelProducto.value,
            precio: el.PrecioProducto.valueAsNumber,
            imagen: el.ImagenProducto.value,
            categoria: el.categoriaProductos.value,
        fechaDeCreacion: obtenerFecha(),
    }


    if(idEditar) {

        const index = productosSaborSur.findIndex(product => {
            return product.id === idEditar
        })



        productosSaborSur[index] = nuevoProducto;

        idEditar = undefined;

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



function pintarProductos(arrayAPintar) {

    tableBodyHTML.innerHTML = "";

    arrayAPintar.forEach(function(prod, index) {

        console.log(`Llamando a editarProducto con id: ${prod.id}`);

        tableBodyHTML.innerHTML += 
            `<tr>
                <td class="table-image">
                    <img src="${prod.imagen}" alt="${prod.titulo}" style= "width: 70px; height: 70px; object-fit: cover; border-radius: 50%;">
                </td>
                <td class="table-title">${prod.titulo}</td>
                <td class="table-description">${prod.descripcion}</td>
                <td class="table-price">${prod.precio}</td>
                <td class="table-category">${prod.categoria}</td>
                <td >
                    <div class="d-flex gap-1">
                        <button class="btn-delete btn btn-danger btn-sm" onclick="borrarProducto('${prod.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <button class="btn btn-success btn-sm" onclick="editarProducto('${prod.id}')" data-bs-toggle="modal" data-bs-target="#formModal">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                </td>
            </tr>`
    })
}


inputFiltrarHTML.addEventListener('keyup', (evt) => {

    const busqueda = evt.target.value.toLowerCase();
    const resultado = productosSaborSur.filter((producto) =>  {
        const titulo = producto.titulo.toLowerCase()
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
        if(prod.id === idRecibido) {
            return true
        }
    })


    if(!productoEditar) return;

    idEditar = productoEditar.id
    console.log(`valor productoEditar ${productoEditar.id}`)

    const elements = formularioProductoHTML.elements;

    elements.TituloProducto.value = productoEditar.titulo;
    elements.PrecioProducto.value = productoEditar.precio;
    elements.DescripcionDelProducto.value = productoEditar.descripcion;
    elements.ImagenProducto.value = productoEditar.imagen;
    elements.categoriaProductos.value = productoEditar.categoria;

    btn.innerText = "Editar Producto"
    btn.classList.add("btn-success")
}





