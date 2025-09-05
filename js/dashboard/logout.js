// start logout
function handleLogout() {
    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "/index.html"
}
// end logout