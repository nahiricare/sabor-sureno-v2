const currentUser = JSON.parse(localStorage.getItem("currentUser"))

const headerUserInfo = document.getElementById("user-header-name")
const headerUserAction = document.getElementById("user-action")
const navbarLink = document.querySelector("ul.navbar-nav#nav-list")


headerUserInfo.innerText = currentUser ? currentUser.fullname : ""


if(currentUser) {
    headerUserAction.innerHTML = `<button class="btn btn-success" onclick="logout()">Logout</button>`
  
    if(currentUser.role === 'ROLE_ADMIN') {
      

        const adminProductLink = document.createElement('li')
        adminProductLink.classList.add('nav-item')
        adminProductLink.id = 'nav-admin-product'
        
        const url = window.location.pathname;
        if(url.includes('admin.html')) {

            adminProductLink.classList.add('active')
        }

        


        const link = document.createElement('a')
        link.classList.add('nav-link')
      
        link.href = '/pages/admin/admin.html';
        link.innerText = 'Adm. Productos'


        adminProductLink.appendChild(link)

        navbarLink.appendChild(adminProductLink)





        const adminUsersLink = document.createElement('li')
        adminUsersLink.classList.add('nav-item')
        adminUsersLink.id = 'nav-admin-users'

        const linkUsers = document.createElement('a')
        linkUsers.classList.add('nav-link')
        linkUsers.href = '/pages/users/admin-users.html'
        linkUsers.innerText = 'Adm. Usuarios'

        adminUsersLink.appendChild(linkUsers)
        navbarLink.appendChild(adminUsersLink)
        
        if(url.includes('admin-users.html')) {

            linkUsers.classList.add('active')
        }

    }


} else {
    headerUserAction.innerHTML = `<a class="btn btn-success" href="/pages/login/login.html">Login</a>`
}







function logout() {
    localStorage.removeItem("currentUser")
    setTimeout(function() {
        window.location.href = "/index.html"
    }, 500)
}
