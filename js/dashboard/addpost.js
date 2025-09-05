// addpost
const postTitle = document.getElementById("title")
const postBody = document.getElementById("body")
const postError = document.querySelector(".addpost__error")
const titleError = document.getElementById("titleError")
const bodyError = document.getElementById("bodyError")

function handleAddPost() {
    let data = JSON.parse(sessionStorage.getItem("data"));
    let clonedData = [...data];
    let lastId = data[data.length - 1].id;

    // remove all prev errors
    postTitle.classList.remove("input__error")
    postBody.classList.remove("input__error")
    postError.style.display = "none";
    titleError.style.display = "none";
    bodyError.style.display = "none"

    if ( postTitle.value && postBody.value) {
        if (postTitle.value.trim().length < 3) {
            postTitle.classList.add("input__error")
            titleError.style.display = "block"
            return null
        }
        if (postBody.value.trim().length < 10) {
            postBody.classList.add("input__error")
            bodyError.style.display = "block"
            return null
        }

        // user id is a default value because there is no user
        let values = { userId: 10, id: lastId + 1, title: postTitle.value, body: postBody.value }
        clonedData.push(values);
        sessionStorage.setItem("data", JSON.stringify(clonedData));
        window.location.href = "/dashboard.html"
    } else {
        postTitle.classList.add("input__error")
        postBody.classList.add("input__error")
        postError.style.display = "block"
    }
}