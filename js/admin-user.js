const listUsers = JSON.parse(localStorage.getItem("users"))

const tableUsersHtml = document.getElementById("table-users")

pintarUsuarios(listUsers)

function pintarUsuarios(usuarios) {
    tableUsersHtml.innerHTML = ''
    usuarios.forEach(user => {
        
        tableUsersHtml.innerHTML += `
            <tr class="tbody-fila tbody-users">
                <td class="table-name">${user.nombreCompleto}</td>
                <td class="table-mail">${user.email}</td>
                <td class="table-date">${user.fechaDeNacimiento}</td>
                <td class="table-province">${user.provincia}</td>
                <td class="table-observations">${user.Observaciones}</td>
                <td class="table-role">${user.role}</td>
                <td class="acciones">
                    <div class="div-btn-acciones">
                        <button class="btn-users-delete btn btn-danger btn-sm" onclick="borrarUsuario('${user.id}')">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>`
    });
}


function borrarUsuario(idUser) {

    Swal.fire({
        title: 'Borrar usuario?',
        icon: 'error',
        text:`Realmente desea eliminar este usuario y todos sus Datos?`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText:'Borrar',
        cancelButtonText:'Cancelar'
    }).then(result => {
        if(result.isConfirmed) {
            
            const indiceEncontrado = listUsers.findIndex((usuario) => {
                if(usuario.id === idUser) {
                    return true
                }
                return false
            })
            
            listUsers.splice(indiceEncontrado, 1)
            pintarUsuarios(listUsers)
            
            localStorage.setItem("users", JSON.stringify(listUsers))
            Swal.fire('Borrado!','Usuario borrado con exito','success')
        }
    })
}