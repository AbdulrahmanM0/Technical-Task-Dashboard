// Edit Post function
function handleEditPost(id) {
    let tr = document.querySelector(`svg[id="${id}"]`).closest("tr");

    let userId = tr.children[0];
    let title = tr.children[1];
    let body = tr.children[2];
    let action = tr.children[3];

    let userVal = userId.innerText;
    let titleVal = title.innerText;
    let bodyVal = body.innerText;

    userId.innerHTML = `
        
            <input type="number" value="${userVal}" class="input__control" name="userId" placeholder="Enter ID">
        `;

    title.innerHTML = `
        
            <small class="error" id="titleError"> must exceed 3 letters </small> 
            <input type="text" value="${titleVal}" class="input__control" name="title" placeholder="Enter Title">
        `;

    body.innerHTML = `
            <small class="error" id="bodyError">must exceed 10 letters </small>
            <textarea rows="5" class="input__control" name="body" placeholder="Enter Body">${bodyVal}</textarea>
        `;

    action.innerHTML = `
        <svg onclick="handleSavePost(${id})" class="action" xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
             stroke-linejoin="round" class="lucide lucide-check">
             <path d="M20 6 9 17l-5-5"/>
        </svg>
        <svg onclick="handleCancelEdit(${id})" class="action" xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
             stroke-linejoin="round" class="lucide lucide-x">
             <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>`;
}

// cancel Edit Post
function handleCancelEdit(id) {
    let data = JSON.parse(sessionStorage.getItem("data"));
    let tr = document.querySelector(`svg[onclick="handleCancelEdit(${id})"]`).closest("tr");
    let post = data.find(item => item.id === id)

    tr.children[0].innerText = post.userId;
    tr.children[1].innerText = post.title;
    tr.children[2].innerText = post.body;

    tr.children[3].innerHTML = `
        <svg id="${id}" onclick="handleEditPost(${id})" class=action title=Edit xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
        <svg id="${id}" class=action title=Delete xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
    `;
}