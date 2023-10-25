


const usuariosJSON = localStorage.getItem("users");



const formularioRegisterHTML = document.getElementById("form-register");


formularioRegisterHTML.addEventListener("submit", (evt) => {

	evt.preventDefault();

	const el = formularioRegisterHTML.elements;

	let id


    
	let nuevoUsuario = {
        nombreCompleto: el.nombreCompleto.value,
        email: el.email.value,
        id: crypto.randomUUID(),
        contrasena: el.contrasena.value,
        fechaDeNacimiento: el.fechaNacimiento.value || 'Nulo',
        provincia: el.provincia.value,
        Observaciones: el.observaciones.value || 'Nulo',
        role: "ROLE_CLIENT"
    }


    const busqueda = users.find((us) => {
		if (us.email === nuevoUsuario.email) {
			return true;
		}
	});

	if (busqueda) {
		Swal.fire("Error!", "Email ya esta registardo", "danger");
	} else {
		users.push(nuevoUsuario);
        Swal.fire({
            icon: "success",
            title: "Usuario registrado correctamente",
            text: "El Usuario se registro correctamente!",
        });
    
        localStorage.setItem("users", JSON.stringify(users));
    
        formularioRegisterHTML.reset();
	}
});

