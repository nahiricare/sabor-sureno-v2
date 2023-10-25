const userInicio = [
    {
        nombreCompleto: 'Daniel Lee',
        email: 'admin@admin.com',
        fechaDeNacimiento: '1993-07-02',
        provincia: 'Jujuy',
        id: '6',
        password: 'admin',
        role: "ROLE_ADMIN"
    },
    {
        nombreCompleto: 'Samantha Davis',
        email: 'samantha.davis@example.com',
        fechaDeNacimiento: '1963-10-04',
        provincia: 'Rio Negro',
        id: '7',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
    {
        nombreCompleto: 'James Moore',
        email: 'james.moore@example.com',
        fechaDeNacimiento: '1973-11-08',
        provincia: 'Mendoza',
        id: '8',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
    {
        nombreCompleto: 'Isabella Taylor',
        email: 'isabella.taylor@example.com',
        fechaDeNacimiento: '1990-12-09',
        provincia: 'Ushuaia',
        id: '9',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
]

if( localStorage.getItem("users") === null  ) {

    localStorage.setItem("users", JSON.stringify(userInicio))

}

const users = JSON.parse(localStorage.getItem("users"))

const loginForm = document.getElementById("login")
    loginForm.addEventListener("submit", (event) => {

        event.preventDefault()

        const emailInput = event.target.elements.email.value;
        const passwordInput = event.target.elements.password.value;

        const userExist = users.find(usr => {
    
            if(usr.email === emailInput) {
                return true
            }
    
            return false;
        })
    
        if(!userExist || userExist.password !== passwordInput) {

            Swal.fire("Login incorrecto", "Los datos ingresados son incorrectos", "error");
            return;
        }

        Swal.fire("Login Correcto", "En breve será redireccionado", "success")

        delete userExist.password

        localStorage.setItem( "currentUser", JSON.stringify(userExist)   )

        setTimeout(function() {
            window.location.href = '/index.html'
        }, 2000)
    })

