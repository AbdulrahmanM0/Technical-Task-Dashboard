let email = document.getElementById("email");
let emailError = document.getElementById("emailError");
let password = document.getElementById("password");
let passwordError = document.getElementById("passwordError");
let remember = document.getElementById("remember");
let form = document.forms[0];

function handleSubmit(event) {
    event.preventDefault();
    passwordError.style.display = "none"
    emailError.style.display = "none"

    // start validation

    if (
        !email.value.includes("@")
    ) {
        emailError.style.display = "inline-block"
    } if (password.value.length < 6) {
        passwordError.style.display = "inline-block"
    }

    if (email.value && password.value) {
        let auth = new Date()
        if (remember.checked) {
            localStorage.setItem("auth", JSON.stringify(auth))
        } else {
            sessionStorage.setItem("auth", JSON.stringify(auth))
        }
        window.location.href = "/dashboard.html"
    }

}