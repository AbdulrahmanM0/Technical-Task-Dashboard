
let API = "https://jsonplaceholder.typicode.com/posts"

let tbody = document.getElementById("tbody");
let status = document.getElementById("status");
let pagination = document.getElementById("pagination");


const loading = `<td colspan=4>
                   <svg id="spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-icon lucide-loader"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
                </td>`;

const NoData = `<td colspan=4>
                    <div style=text-align:center>NO DATA</div>
                </td>`;

// start fetch data
async function fetchData() {

    try {
        status.innerHTML = loading;

        let response = await fetch(API);

        if (!response.ok) {
            throw new Error(`THERE IS AN ERROR: ${response.status}`);
        }

        data = await response.json();
        sessionStorage.setItem("data", JSON.stringify(data))

        if (data.length > 0) {
            status.style.display = "none"
            showRows(data)
        } else {
            status.innerHTML = NoData;
        }
    } catch (error) {
        status.innerHTML = `<td colspan="4">
                                <div>THERE IS AN ERROR : ${error}</div>
                            </td>`
    }
}
// end fetch data


// i have added current page here for pagination to be in a heigh line
let currentPage = 1;
// --------------------------

// start show function
function showRows(data = JSON.parse(sessionStorage.getItem("data")), page = 1) {
    tbody.innerHTML = "";
    const start = (page - 1) * 10;
    const end = start + 10;
    let filteredData = data.slice(start, end);


    if (filteredData.length > 0) {
        filteredData.map((item) => {
            let { title, body, id } = item;
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${id}</td><td>${title}</td><td>${body}</td>
        <td>
            <svg id=${id} onclick=handleEditPost(${id}) class=action title=Edit xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
            <svg id=${id} onclick=handleDeletePost(${id})  class=action title=Delete xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </td>`

            tbody.appendChild(tr);
        });
    } else {
        let tr = document.createElement("tr");
        tr.innerHTML = NoData;

        tbody.appendChild(tr);
    }

    handlePagination(data);
}
// end show function

// start sort function
const idHead = document.getElementById("id__col");
const titleHead = document.getElementById("title__col");

function handleSort(event) {
    event.stopPropagation();
    currentPage = 1;

    let data = JSON.parse(sessionStorage.getItem("data"));
    let clonedData = [...data];
    let filteredData = [];

    let arrow = event.currentTarget.children[0].children[0];

    if (arrow.classList.contains("lower")) {
        arrow.classList.remove("lower");
        arrow.classList.add("upper");
    } else {
        arrow.classList.remove("upper");
        arrow.classList.add("lower");
    }

    if (event.currentTarget.id == "id__col") {
        filteredData = clonedData.sort((a, b) =>
            arrow.classList.contains("lower") ? a.id - b.id : b.id - a.id
        );

    } else if (event.currentTarget.id == "title__col") {
        filteredData = clonedData.sort((a, b) =>
            arrow.classList.contains("lower")
                ? a.title.localeCompare(b.title) 
                : b.title.localeCompare(a.title) 
        );
    }

    showRows(filteredData, 1);
}
// end sort function

// start search function
function handleSearch(event) {

    currentPage = 1;
    let data = JSON.parse(sessionStorage.getItem("data"));
    let clonedData = [...data]
    let query = event.target.value.toLowerCase().trim()
    let filteredData = clonedData.filter(item => {

        return (
            item.title.toLowerCase().trim().includes(query) ||
            // .replace(/\s+/g, ' ') i have searched for this line 
            item.body.toLowerCase().replace(/\s+/g, ' ').trim().includes(query) ||

            String(item.id).includes(event.target.value)
        )
    })

    showRows(filteredData, 1)
}
// end search function

// start save edit row
function handleSavePost(id) {
    let tr = document.querySelector(`svg[onclick="handleSavePost(${id})"]`).closest("tr");
    let data = JSON.parse(sessionStorage.getItem("data"));

    // all values are from "/editpost.js"
    let newTitle = tr.querySelector('input[name="title"]');
    let newBody = tr.querySelector('textarea[name="body"]');

    newTitle.classList.remove("input__error")
    newBody.classList.remove("input__error")
    titleError.style.display = "none"
    bodyError.style.display = "none"

    if (newTitle.value.length < 3) {
        newTitle.classList.add("input__error")
        titleError.style.display = "block"
        return null
    }
    if (newBody.value.length < 10) {
        newBody.classList.add("input__error")
        bodyError.style.display = "block"
        return null
    }

    tr.children[1].innerText = newTitle.value;
    tr.children[2].innerText = newBody.value;

    // save the new values in the store first
    let updatedData = data.map(item => {
        if (item.id === id) {
            return { ...item, title: newTitle.value, body: newBody.value }
        }
        return item
    })

    // return null
    sessionStorage.setItem("data", JSON.stringify(updatedData));

    // show the new values
    tr.children[3].innerHTML = `
        <svg id="${id}" onclick="handleEditPost(${id})" class=action title=Edit xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
        <svg id="${id}" onclick=handleDeletePost(${id}) class=action title=Delete xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
    `;
}
// end save edit row

// start handle Delete Post
function handleDeletePost(id) {
    console.log('id')
    let data = JSON.parse(sessionStorage.getItem("data"));
    let filteredData = data.filter(item => item.id !== id);
    sessionStorage.setItem("data", JSON.stringify(filteredData));
    showRows(filteredData, currentPage)
}
// end handle Delete Post

// start pagination
function handlePagination(data) {
    const totalPages = Math.ceil(data.length / 10);
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    let buttons = "";
    for (let i = start; i <= end; i++) {
        buttons += `
            <div class="pagination__button ${i == currentPage ? "active" : ""}" data-page="${i}">
                <span>${i}</span>
            </div>`;
    }

    let paginationButtons = `
        <div class="pagination__button" data-page="first"><span>«</span></div>
        <div class="pagination__button" data-page="prev"><span>‹</span></div>
        
        ${buttons}

        <div class="pagination__button" data-page="next"><span>›</span></div>
        <div class="pagination__button" data-page="last"><span>»</span></div>
    `;

    pagination.innerHTML = paginationButtons;

    // add actions to paginations buttons
    document.querySelectorAll(".pagination__button").forEach((btn) => {
        btn.addEventListener("click", () => {
            const action = btn.dataset.page;

            // handle actions
            if (action === "prev" && currentPage > 1) {
                currentPage--;
            } else if (action === "next" && currentPage < totalPages) {
                currentPage++;
            } else if (action === "first") {
                currentPage = 1;
            } else if (action === "last") {
                currentPage = totalPages;
            } else if (!isNaN(action)) {
                // handle chose page
                currentPage = Number(action);
            }

            showRows(data, currentPage);
        });
    });
}
// end pagination


// call the fetch &&  caches the data
if (!sessionStorage.getItem("data")) {
    fetchData()
} else {
    showRows()
}