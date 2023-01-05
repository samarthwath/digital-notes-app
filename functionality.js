let addNote = document.querySelector(`#add-note-btn`);
let notesCount = localStorage.getItem(`notes-count`);
let notesData = {};
let notesLayout = document.querySelector(`#notes-layout`);
if (notesCount === null || notesCount == 0) {
    localStorage.setItem(`notes-count`, 0);
    let headingThird = document.createElement(`h3`);
    headingThird.setAttribute(`id`, `no-notes-heading`);
    headingThird.style.marginTop = `14px`;
    headingThird.innerText = `No Notes to Display`;
    notesLayout.appendChild(headingThird);
}
iterateUserNotes();
addNote.addEventListener(`click`, addToDoNotes);

function addToDoNotes() {
    let getNoteText = document.querySelector(`#note-text`);
    console.log(getNoteText.value);
    let notesCount = Number.parseInt(localStorage.getItem(`notes-count`));
    notesCount += 1;
    localStorage.setItem(`notes-count`, notesCount);
    console.log(`Add Note button clicked.`);
    let cardDiv = document.createElement(`div`);
    cardDiv.innerHTML =
        `<div id="div-${notesCount}" class="card me-4" style="width: 18rem;">
            <img src="./notes-image.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Note: ${notesCount}</h5>
            <p class="card-text">${getNoteText.value}</p>
            <button class="btn btn-primary" onclick="deleteUserNote(this.id)" id="${notesCount}">Delete Note</button>
            </div>
        </div>`;
    notesData = JSON.parse(localStorage.getItem(`notes-info`));
    if (notesData === null) {
        notesData = {};
        notesData[notesCount] = getNoteText.value;
        localStorage.setItem(`notes-info`, JSON.stringify(notesData));
    } else {
        notesData[notesCount] = getNoteText.value;
        localStorage.setItem(`notes-info`, JSON.stringify(notesData));
    }
    console.log(cardDiv);
    notesLayout.appendChild(cardDiv);
    getNoteText.value = ``;
}
function iterateUserNotes() {
    console.log(`--------iterateUserNotes method start--------`);
    let notesCount = Number.parseInt(localStorage.getItem(`notes-count`));
    console.log(`Logging Notes Count Value: ${notesCount}`);
    if (notesCount == 1) {
        let noNotesHeading = document.querySelector(`#no-notes-heading`);
        console.log(noNotesHeading);
        if (noNotesHeading != null) {
            noNotesHeading.remove();
        }
        console.log(`No notes to display to User.`);
    }
    let notesData = JSON.parse(localStorage.getItem(`notes-info`));
    console.log(notesData);
    if (notesData != null) {
        console.log(`--------Iterating User Notes start--------`);
        for (const key in notesData) {
            let cardDiv = document.createElement(`div`);
            console.log(key);
            cardDiv.innerHTML =
                `<div id="div-${key}" class="card me-4" style="width: 18rem;">
                    <img src="./notes-image.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">Note: ${key}</h5>
                    <p class="card-text">${notesData[key]}</p>
                    <button class="btn btn-primary" onclick="deleteUserNote(this.id)" id="${key}">Delete Note</button>
                    </div>
                </div>`;
            notesLayout.appendChild(cardDiv);
        }
        console.log(`--------Iterating User Notes ends--------`);
    }
    console.log(`--------iterateUserNotes method ends--------`);
}
function deleteUserNote(id) {
    let notesData = JSON.parse(localStorage.getItem(`notes-info`));
    delete notesData[id];
    console.log(`notes-object after element deletion.... `);
    console.log(notesData);
    localStorage.setItem(`notes-info`, JSON.stringify(notesData));
    let noteItem = document.querySelector(`#div-${id}`);
    noteItem.remove();
    console.log(`Delete User Note button clicked`);
}
