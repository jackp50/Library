
const container = document.querySelector("#container");
const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        let readStatus;
        if (read) {
    readStatus = 'Yes';
     } else {
        readStatus = 'No';
    }
        return (`${title} by ${author}, ${pages} pages, read: ${readStatus}`);
    }
}

function addBookToLibrary(title, author, pages, read) {
    // Creates a new Book object
    const newBook = new Book(title, author, pages, read);
    // Add the new Book to the array
    myLibrary.push(newBook); 
    console.log(`Book added: ${newBook.info()}`);
};

function deleteBook() {
    
}

function displayBooks() {
    container.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i]);
        const bookTemplate = document.createElement("div");
        bookTemplate.textContent = myLibrary[i].info();
        container.appendChild(bookTemplate);
        bookTemplate.id = "book-template"
        const deleteButton = document.createElement("button");
        container.appendChild(deleteButton);
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteBook();
    });
    }
    
}
// button that bring up form to create new book entry
const buttonContainer = document.querySelector("#button-container");
const bookButton = document.createElement("button");
buttonContainer.appendChild(bookButton);
bookButton.textContent = "Add Book"
bookButton.id = "book-button"
    //create dialog box
    const dialog = document.createElement("dialog");
    buttonContainer.appendChild(dialog);
    //create form to fill out
    const form = document.createElement("form");
    dialog.appendChild(form);
    //title input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.placeholder = 'Title';
    titleInput.required = true;
    form.appendChild(titleInput);
    // author input
    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.name = 'author';
    authorInput.placeholder = 'Author';
    authorInput.required = true;
    form.appendChild(authorInput);
    //page count input
    const pageInput = document.createElement('input');
    pageInput.type = 'number';
    pageInput.name = 'page';
    pageInput.placeholder = 'Page Count';
    pageInput.required = true;
    form.appendChild(pageInput);
    //has read input
    const readInput = document.createElement('input');
    readInput.type = 'checkbox';
    readInput.name = 'read';
    readInput.id = 'read';
    const readLabel = document.createElement("label");
    readLabel.textContent = 'Have you read this book?';
    readLabel.htmlFor = 'read';
    form.appendChild(readInput);
    form.appendChild(readLabel);

    //submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);

    bookButton.addEventListener("click", () => {
        dialog.showModal(); // Opens the dialog as a modal
        });

    //event listener for submit button
    form.addEventListener("submit", (event) => {
        // need this because I have no where to submit it
        event.preventDefault(); 
        const title = titleInput.value;
        const author = authorInput.value;
        const pages = pageInput.value;
        const read = readInput.checked; // Returns true if checked
        //console log
        console.log(`Book: ${title}, Author: ${author}, Pages: ${pages}, Read: ${read}`);
        //add to library
        addBookToLibrary(title, author, pages, read);
        // Clear form
        form.reset();
        displayBooks();
        dialog.close();
    });



