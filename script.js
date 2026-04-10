const btnAddBook = document.querySelector(".btn-add-book");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");
const btnClose = document.querySelector(".btn-close");
const form = document.querySelector(".form");

class Book {
  constructor(obj) {
    // the constructor...
    this.id = crypto.randomUUID();
    this.title = obj.title;
    this.author = obj.author;
    this.pages = obj.pages;
    this.read = obj.read;
  }
}

class Library {
  constructor() {
    this.library = [];
  }

  addBookToLibrary(obj) {
    // take params, create a book then store it in the array
    const book = new Book(obj);
    this.library.push(book);
  }
}

class Display {
  constructor() {
    btnAddBook.addEventListener("click", function () {
      modal.style.display = "flex";
    });

    closeModal.addEventListener("click", function () {
      modalClose();
    });

    btnClose.addEventListener("click", function () {
      display.modalClose();
    });
    this.bookDisplay = document.querySelector(".book-display");
    this.bookDisplay.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-book")) {
        const id = e.target.getAttribute("data-id");
        const index = myLibrary.library.findIndex((book) => book.id === id);
        console.log(index);
        myLibrary.library.splice(index, 1);
      } else if (e.target.classList.contains("read-toggle")) {
        const id = e.target.getAttribute("data-id");
        const index = myLibrary.library.findIndex((book) => book.id === id);
        myLibrary.library[index].read = !myLibrary.library[index].read;
      }
      display.buildLibrary();
    });
  }

  buildLibrary() {
    while (display.bookDisplay.firstElementChild) {
      display.bookDisplay.firstElementChild.remove();
    }
    myLibrary.library.forEach((element) => {
      this.createCard(element);
    });
  }

  modalClose() {
    modal.style.display = "none";
  }

  createCard(book) {
    const readMark = "✅";
    const unreadMark = "📖";
    const card = document.createElement("div");
    card.classList.add("card");

    const heading = document.createElement("h2");
    heading.textContent = book.title;
    card.appendChild(heading);
    heading.classList.add("title");

    const author = document.createElement("p");
    author.textContent = book.author;
    card.appendChild(author);
    author.classList.add("author");

    const pageNo = document.createElement("p");
    pageNo.textContent = `${book.pages} pages`;
    card.appendChild(pageNo);
    pageNo.classList.add("page-num");

    const readIndicator = document.createElement("p");
    readIndicator.textContent = book.read ? readMark : unreadMark;
    card.appendChild(readIndicator);
    readIndicator.classList.add("read-indicator");

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    card.appendChild(btnContainer);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Book";
    btnContainer.appendChild(deleteButton);
    deleteButton.classList.add("btn-submit", "delete-book");
    deleteButton.setAttribute("data-id", book.id);

    const readToggle = document.createElement("button");
    readToggle.textContent = `Mark as ${book.read ? "unread" : "read"}`;
    btnContainer.appendChild(readToggle);
    readToggle.classList.add("btn-submit", "read-toggle");
    readToggle.setAttribute("data-id", book.id);

    display.bookDisplay.appendChild(card);
  }
}

// buildLibrary();

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
  myLibrary.addBookToLibrary(entries);
  modalClose();
  e.target.reset();
  display.buildLibrary();
});

const myLibrary = new Library();
const display = new Display();

myLibrary.addBookToLibrary({
  title: "World War Z",
  author: "Max Brooks",
  pages: 342,
  read: false,
});
myLibrary.addBookToLibrary({
  title: "The Thursday Murder Club",
  author: "Richard Osman",
  pages: 400,
  read: true,
});

display.buildLibrary();
