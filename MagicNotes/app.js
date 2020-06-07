console.log('Welcom to app.js')
showNotes();

// if user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn")
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    let myObj = {
        title : addTitle.value,
        text :addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
});

// Function to show elements from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj)
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width:18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <a id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-danger">Delete Note</a>
                    </div>
                </div>`
    });
    let noteElm = document.getElementById('notes');
    if(notesObj.length != 0){
        noteElm.innerHTML = html;
        noteElm.style.color = "black";
    }else{
        noteElm.innerHTML = `<h6>Nothing to show! use "Add a Note" section above to add a button.<h6>`;
        noteElm.style.color = "red";
    }
}

// function to delete a note
function deleteNote(index){
    console.log("I am deleting",index);

    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);//splice is used to delete with which index and how many element
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputval = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputval)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })
})

// futher features
// 1. Add Title
// 2. Mark a note as Important