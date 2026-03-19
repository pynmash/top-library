const bookDisplay = document.querySelector(".book-display");
const btnAddBook = document.querySelector(".btn-add-book");

const readMark = "✅";
const unreadMark = "📖";

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

function createCard(book) {
  const card = document.createElement("div");
  bookDisplay.appendChild(card);
  card.classList.add("card");

  const heading = document.createElement("h2");
  heading.textContent = book.title;
  card.appendChild(heading);
  heading.classList.add("title");

  const author = document.createElement("p");
  author.textContent = book.author;
  card.appendChild(author);
  heading.classList.add("author");

  const pageNo = document.createElement("p");
  pageNo.textContent = `${book.pages} pages`;
  card.appendChild(pageNo);
  pageNo.classList.add("page-num");

  const readIndicator = document.createElement("p");
  readIndicator.textContent = book.read ? readMark : unreadMark;
  card.appendChild(readIndicator);
  readIndicator.classList.add("read-indicator");
}

addBookToLibrary("World War Z", "Max Brooks", 342, false);
addBookToLibrary("The Thursday Murder Club", "Richard Osman", 400, true);

myLibrary.forEach((element) => {
  createCard(element);
});

btnAddBook.addEventListener("click", function (e) {
  console.log("Button clicked!");
});
