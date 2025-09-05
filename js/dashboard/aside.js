// handle aside (sude bar)
const aside = document.querySelector(".aside");
const asideToggle = document.getElementById("aside__toggle");
const asideNavs = document.querySelectorAll(".aside__nav span");
const container = document.querySelector(".container");
function handleAside() {

    if (!asideToggle.checked) {
        aside.classList.add("close");
        container.classList.add("close")
        asideNavs.forEach(item => item.style.display = "none")
    } else {
        aside.classList.remove("close")
        container.classList.remove("close")
        asideNavs.forEach(item => item.style.display = "inline-block")
    }
}

// hendle dark theme
function handleTheme(event) {
    const toggle = document.getElementById("theme__toggle");

    if(!event && localStorage.getItem("dark")) {
        toggle.checked = true;
        document.body.setAttribute("data-theme","dark");
    }

    if(event?.target?.checked){
        document.body.setAttribute("data-theme","dark");
        localStorage.setItem("dark",true);
    } else if(event) {
        document.body.removeAttribute("data-theme");
        localStorage.removeItem("dark");
    }
}

handleTheme();
