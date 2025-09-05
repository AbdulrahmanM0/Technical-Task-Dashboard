let email = document.getElementById("email");
let emailError = document.getElementById("emailError");
let password = document.getElementById("password");
let passwordError = document.getElementById("passwordError");
let remember = document.getElementById("remember");
let loginBtn = document.getElementById("login_button");
let form = document.forms[0];

function handleSubmit(event) {
    event.preventDefault();
    passwordError.style.display = "none";
    emailError.style.display = "none";
    let error = false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    email.classList.remove("input__error")
    password.classList.remove("input__error")

    // start validation
    if (
        !email.value.includes("@") || !emailRegex.test(email.value)
    ) {
        emailError.style.display = "inline-block"
        email.classList.add("input__error")

        error = true
    } if (password.value.length < 6) {
        password.classList.add("input__error")
        passwordError.style.display = "inline-block"
        error = true
    }

    if (email.value && password.value) {
        if (error) return null
        let auth = new Date()
        if (remember.checked) {
            localStorage.setItem("auth", JSON.stringify(auth))
        } else {
            sessionStorage.setItem("auth", JSON.stringify(auth))
        }

        loginBtn.innerHTML = `<svg id="spinner" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-icon lucide-loader">
                                    <path d="M12 2v4"/>
                                    <path d="m16.2 7.8 2.9-2.9"/>
                                    <path d="M18 12h4"/>
                                    <path d="m16.2 16.2 2.9 2.9"/>
                                    <path d="M12 18v4"/>
                                    <path d="m4.9 19.1 2.9-2.9"/>
                                    <path d="M2 12h4"/>
                                    <path d="m4.9 4.9 2.9 2.9"/>
                                    </svg>`;
        window.location.href = "/dashboard.html"
    }

}

// handle show password
const eye = document.getElementById("eye");
const eyeOff = document.getElementById("eye-off");

eye.addEventListener("click", () => {
    password.type = "text";
    eye.style.display = "none";
    eyeOff.style.display = "block";
});

eyeOff.addEventListener("click", () => {
    password.type = "password";
    eyeOff.style.display = "none";
    eye.style.display = "block";
});