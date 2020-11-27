
//Sets up the quill editor in the element with the id of "editor"
var quill = new Quill('#editor', {
  theme: 'snow'
  });



  //new user redirect
  let pageVisits = JSON.parse(localStorage.getItem('pageVisits')); 

  function redirectToInfo(){
    window.location = "intro.html";
}

  function redirectNewUser(){   
   if (pageVisits == null) {
      pageVisits += 1;
      localStorage.setItem("pageVisits", pageVisits);
      redirectToInfo();
    } 
  }

 //global variables
  let editingField = document.querySelector(".ql-editor");
  let notesListContainer = document.querySelector('.saved-notes-list');
  let saveNoteBtn = document.querySelector('.save-note-btn');
  let newNoteButton = document.querySelector(".new-note-button");

  //function that opens the editor
  newNoteButton.addEventListener("click", function() {
    document.querySelector(".toolbar-and-editor-container").classList.remove("hidden")
    console.log("Hej");
  });

  //unique identifyer for each note to act as a local storage key that is taken from local storage
  let notesNumber = JSON.parse(localStorage.getItem('notesNumber'));


//creating a note
  function createNote() {
    //creates one list item in the saved notes div containing all of the html generated by the editor
    let note = `<li class="note">${editingField.innerHTML.firstChild}<span>${date()}</span></li>`;
    notesListContainer.innerHTML += note;
    //saves the note html as a JSON string in Local Storage
    localStorage.setItem(notesNumber, JSON.stringify(note))
  }

//saving a note
  saveNoteBtn.onclick = function saveNote(){
    
    //select the first element in the editing field
    let firstElement = editingField.firstChild;
    //only creates a note if first element is a heading(h1, h2...h6) and it is not empty
    if (firstElement.tagName.startsWith('H') && firstElement.textContent.trim() != "") {
      //the id increases by 1 for each created note
      notesNumber += 1;
      //saves the number in local storage for access
      localStorage.setItem('notesNumber', notesNumber);
      //creates the note
      createNote();
      //closes the editor
      document.querySelector(".toolbar-and-editor-container").classList.add("hidden");
    } else alert("Please add a heading at the begining of your note, it will act as the note\'s title");
  }


  //loading notes from local storage
 function loadNotes() {

  for (i = 1; i<= notesNumber; i++){
    //console.log(i);
   //console.log(localStorage.getItem(i));
   let note = JSON.parse(localStorage.getItem(i));
    notesListContainer.innerHTML += note;
 }
 }

 document.addEventListener('DOMContentLoaded', e => {
  loadNotes();
 })

 

  /* ADDITIONAL FUNCTIONS NOT IMPLEMENTED */
  /* Date Function */
function date() {
  let now = new Date();

  let dd = now.getDate();
  let m = now.getMonth() + 1;
  let yyyy = now.getFullYear();
  let hh = now.getHours();
  let mm = now.getMinutes();
  let ss = now.getSeconds();

  if (dd < 10) {
      dd = `0${dd}`;
  }
  if (m < 10) {
      m = `0${m}`;
  }
  if (hh < 10) {
      hh = `0${hh}`;
  }
  if (mm < 10) {
      mm = `0${mm}`;
  }
  if (ss < 10) {
      ss = `0${ss}`;
  }

  now = `${dd}/${m}/${yyyy} ${hh}:${mm}`;
  return now;
}



/* Read only mode */
// To turn the editor into "read-only-mode" - the toolbar is hidden and the content of the editor is non-editable. When clcked on again, it is made into "edit-mode" and the toolbar is shown again.
// Activate function from e.g. a button with a event listener that activates the function
// Also need to create a class of "hide-toolbar" with a "display: none; property"
function editToggle(e) {
  // Add the class "edit-button" to the html element that activates this function
  if (!e.target.classList.contains('edit-button')) {
      return;
  }

  const editor = document.querySelector('.ql-editor');
  const toolbar = document.querySelector('.ql-toolbar.ql-snow');

  if (editor.getAttribute('contenteditable') === 'true') {
      // makes the editor non-editable
      editor.setAttribute('contenteditable', false);
      // adds the class "hide-toolbar" containing a "dsplay: none;" to hide the toolbar
      toolbar.classList.toggle('hide-toolbar');
  } else {
      // the opposite
      editor.setAttribute('contenteditable', true);
      toolbar.classList.toggle('hide-toolbar');
  }
}



// EXAMPLE OF TOOLBAR CUSTOMIZATION
var toolbarOptions = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'font': [] }],

  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  ['blockquote', 'code-block'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
  [{ 'indent': '-1' }, { 'indent': '+1' }, { 'direction': 'rtl' }],          // outdent/indent
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  ['clean']                                         // remove formatting button
];

// IN ORDER TO WORK THE FOLLOWING NEEDS TO BE WRITTEN WHEN INITIALIZING THE EDITOR
/* 

quill = new Quill('.editor', {
    modules: {
        toolbar: toolbarOptions
    },
    theme: 'snow'
});

*/