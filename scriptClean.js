// Encapsulate the library and related functions in an IIFE
const LibraryApp = (() => {
    // Container div for displaying books
    const container = document.querySelector("#container");
    const buttonContainer = document.querySelector("#button-container");

    // Array for storing books
    let myLibrary = [];

    // Class definition for Book
    class Book {
        constructor(title, author, pages, read) {
            this.id = crypto.randomUUID();
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }

        info() {
            const readStatus = this.read ? 'Yes' : 'No';
            return `${this.title} by ${this.author}, ${this.pages} pages, read: ${readStatus}`;
        }

        toggleReadStatus() {
            this.read = !this.read;
        }
    }

    // Adds a new book to the library
    function addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        displayBooks();
    }

    // Deletes a book from the library
    function deleteBook(bookId) {
        myLibrary = myLibrary.filter(book => book.id !== bookId);
        displayBooks();
    }

    // Helper function for creating DOM elements
    function createElement(type, attributes = {}, content = '') {
        const element = document.createElement(type);
        Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
        if (content) element.textContent = content;
        return element;
    }

    // Displays all books in the library
    function displayBooks() {
        container.innerHTML = ''; // Clear the container before rendering

        myLibrary.forEach(book => {
            // Create book template
            const bookTemplate = createElement('div', { id: `book-template-${book.id}` }, book.info());
            container.appendChild(bookTemplate);

            // Delete button
            const deleteButton = createElement('button', { 'data-id': book.id }, 'Delete');
            deleteButton.addEventListener('click', handleDelete);
            bookTemplate.appendChild(deleteButton);

            // Read status button
            const readStatusButton = createElement(
                'button',
                { 'data-id': book.id },
                book.read ? 'Mark as Unread' : 'Mark as Read'
            );
            readStatusButton.addEventListener('click', handleToggleRead);
            bookTemplate.appendChild(readStatusButton);
        });
    }

    // Handles delete button click
    function handleDelete(event) {
        const bookId = event.target.getAttribute("data-id");
        deleteBook(bookId);
    }

    // Handles read status button click
    function handleToggleRead(event) {
        const bookId = event.target.getAttribute("data-id");
        const currentBook = myLibrary.find(book => book.id === bookId);
        currentBook.toggleReadStatus();
        displayBooks();
    }

    // Create "Add Book" button and modal
    const bookButton = createElement('button', { id: 'book-button' }, 'Add Book');
    buttonContainer.appendChild(bookButton);

    const dialog = createElement('dialog');
    buttonContainer.appendChild(dialog);

    const form = createElement('form');
    dialog.appendChild(form);

    // Title input
    const titleInput = createElement('input', {
        type: 'text',
        name: 'title',
        placeholder: 'Title',
        required: true,
    });
    form.appendChild(titleInput);

    // Author input
    const authorInput = createElement('input', {
        type: 'text',
        name: 'author',
        placeholder: 'Author',
        required: true,
    });
    form.appendChild(authorInput);

    // Page count input
    const pageInput = createElement('input', {
        type: 'number',
        name: 'page',
        placeholder: 'Page Count',
        required: true,
    });
    form.appendChild(pageInput);

    // Read checkbox input
    const readInput = createElement('input', { type: 'checkbox', name: 'read', id: 'read' });
    const readLabel = createElement('label', { htmlFor: 'read' }, 'Have you read this book?');
    form.appendChild(readInput);
    form.appendChild(readLabel);

    // Submit button
    const submitButton = createElement('button', { type: 'submit' }, 'Submit');
    form.appendChild(submitButton);

    // Add event listeners
    bookButton.addEventListener("click", () => {
        dialog.showModal(); // Opens the dialog as a modal
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = titleInput.value;
        const author = authorInput.value;
        const pages = pageInput.value;
        const read = readInput.checked;
        addBookToLibrary(title, author, pages, read);
        form.reset();
        displayBooks();
        dialog.close();
    });

    // Public API for LibraryApp
    return { addBookToLibrary, deleteBook, displayBooks };
})();
