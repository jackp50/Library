//container div i made in the html file
const container = document.querySelector("#container");
//array the books will go into
let myLibrary = [];

//constructor object for book
function Book(title, author, pages, read) {
    //gives book random id
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        // Dynamically calculate read status
        //syntax: condition ? True False
        const readStatus = this.read ? 'Yes' : 'No';
        return `${this.title} by ${this.author}, ${this.pages} pages, read: ${readStatus}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    // Creates a new Book object
    const newBook = new Book(title, author, pages, read);
    // Add the new Book to the array
    myLibrary.push(newBook); 
    // console.log(`Book added: ${newBook.info()}`);
};

function deleteBook(bookId) {
    // Filter out the book with the matching ID
    myLibrary = myLibrary.filter((book) => book.id !== bookId);
    // Log the updated library for debugging
    console.log(myLibrary);
    // Refresh the library
    displayBooks();
}

function displayBooks() {
    container.innerHTML = ''; // Clear the container before rendering

    myLibrary.forEach((book) => {
        // Create the book template
        const bookTemplate = document.createElement("div");
        bookTemplate.textContent = book.info();
        bookTemplate.id = `book-template-${book.id}`;
        container.appendChild(bookTemplate);

        // Create the delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-id", book.id); // Attach book ID
        deleteButton.addEventListener("click", (event) => {
            const bookId = event.target.getAttribute("data-id");
            deleteBook(bookId); // Remove the book from the library
        });
        bookTemplate.appendChild(deleteButton);

        // Create the read status button
        const readStatusButton = document.createElement("button");
        readStatusButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";
        readStatusButton.setAttribute("data-id", book.id); // Attach book ID
        readStatusButton.addEventListener("click", (event) => {
            const bookId = event.target.getAttribute("data-id");
            const currentBook = myLibrary.find((b) => b.id === bookId); // Find the book
            currentBook.changeStatus(); // Toggle read status
            displayBooks(); // Refresh the library display
        });
        bookTemplate.appendChild(readStatusButton);
    });
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

    //prototype function that can change read status
    Book.prototype.changeStatus = function(bookId) {
        // Toggle the `read` property of the current book instance
        // If true, it becomes false; if false, it becomes true
        this.read = !this.read;
        console.log(myLibrary);
        // Refresh the library
        displayBooks();
    }
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



