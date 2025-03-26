
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


addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, true);
addBookToLibrary("Crazy Steve", "Andrew Scott", 187, false);
addBookToLibrary("Chicago Dog", "Lester Crave", 300, false);
addBookToLibrary("The Sweatshirt", "Linda Blind", 90, true);

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i]);
    }
}

displayBooks();


