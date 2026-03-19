const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.describe = function () {
    return `${this.title} by ${this.author} is ${this.pages} pages long and you ${this.read ? "have" : "have not"} read it.`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}
