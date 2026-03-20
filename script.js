const bookDisplay = document.querySelector(".book-display");
const btnAddBook = document.querySelector(".btn-add-book");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");
const btnClose = document.querySelector(".btn-close");
const form = document.querySelector(".form");
let deleteBookBtns;

const readMark = "✅";
const unreadMark = "📖";

const myLibrary = [];

function Book(obj) {
  // the constructor...
  this.id = crypto.randomUUID();
  this.title = obj.title;
  this.author = obj.author;
  this.pages = obj.pages;
  this.read = obj.read;
}

function addBookToLibrary(obj) {
  // take params, create a book then store it in the array
  const book = new Book(obj);
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

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Book";
  card.appendChild(deleteButton);
  deleteButton.classList.add("btn-submit");
  deleteButton.classList.add("delete-book");
  deleteButton.setAttribute("data-id", book.id);
}

addBookToLibrary({
  title: "World War Z",
  author: "Max Brooks",
  pages: 342,
  read: false,
});
addBookToLibrary({
  title: "The Thursday Murder Club",
  author: "Richard Osman",
  pages: 400,
  read: true,
});

function buildLibrary() {
  while (bookDisplay.firstElementChild) {
    bookDisplay.firstElementChild.remove();
  }
  myLibrary.forEach((element) => {
    createCard(element);
  });

  getDeleteBtns();
}

function getDeleteBtns() {
  deleteBookBtns = document.querySelectorAll(".delete-book");
  deleteBookBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const id = e.target.getAttribute("data-id");
      const index = myLibrary.findIndex((book) => book.id === id);
      console.log(index);
      myLibrary.splice(index, 1);
      buildLibrary();
    });
  });
}

function modalClose() {
  modal.style.display = "none";
}

buildLibrary();

btnAddBook.addEventListener("click", function () {
  modal.style.display = "flex";
});

closeModal.addEventListener("click", function () {
  modalClose();
});

btnClose.addEventListener("click", function () {
  modalClose();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const entries = Object.fromEntries(data.entries());
  entries.read = entries.read == "on" ? true : false;
  addBookToLibrary(entries);
  modalClose();
  e.target.reset();
  buildLibrary();
});
