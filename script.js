const btnAddBook = document.querySelector(".btn-add-book");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");
const btnClose = document.querySelector(".btn-close");
const form = document.querySelector(".form");
const formTitleInput = document.querySelector("#title");
const formTitleError = document.querySelector("#title + div.error");
const formAuthorInput = document.querySelector("#author");
const formAuthorError = document.querySelector("#author + div.error");
const formPagesInput = document.querySelector("#pages");
const formPagesError = document.querySelector("#pages + div.error");

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

    this.addBookToLibrary({
      title: "World War Z",
      author: "Max Brooks",
      pages: 342,
      read: false,
    });
    this.addBookToLibrary({
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      pages: 400,
      read: true,
    });

    formTitleInput.addEventListener("input", () => {
      if (formTitleInput.validity.valid) {
        formTitleError.textContent = "";
        formTitleError.className = "error";
      } else {
        showTextError(formTitleInput, formTitleError);
      }
    });

    formAuthorInput.addEventListener("input", () => {
      if (formAuthorInput.validity.valid) {
        formAuthorError.textContent = "";
        formAuthorError.className = "error";
      } else {
        showTextError(formAuthorInput, formAuthorError);
      }
    });

    formPagesInput.addEventListener("input", () => {
      if (formPagesInput.validity.valid) {
        formPagesError.textContent = "";
        formAuthorError.className = "error";
      } else {
        showPagesError();
      }
    });

    form.addEventListener("submit", function (e) {
      if (!formTitleInput.validity.valid) {
        showTextError(formTitleInput, formTitleError);
        e.preventDefault();
      } else if (!formAuthorInput.validity.valid) {
        showTextError(formAuthorInput, formAuthorError);
        e.preventDefault();
      } else if (!formPagesInput.validity.valid) {
        showPagesError();
      } else {
        e.preventDefault();
        const data = new FormData(e.target);
        const entries = Object.fromEntries(data.entries());
        entries.read = entries.read == "on" ? true : false;
        myLibrary.addBookToLibrary(entries);
        display.modalClose();
        e.target.reset();
        display.buildLibrary();
      }
    });

    function showTextError(input, error) {
      // Title errors
      if (input.validity.valueMissing) {
        error.textContent = "You need to enter a title.";
      } else if (input.validity.tooShort) {
        error.textContent = `Title should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
      }
      input.classname = "error active";
    }

    function showPagesError() {
      if (
        formPagesInput.validity.rangeUnderflow
        // formPagesInput.validity.rangeUnderflow ||
        // formPagesInput.validity.valueMissing
      ) {
        formPagesError.textContent =
          "Number of pages should be a number greater than Zero.";
      }
      formPagesError.classname = "error active";
    }
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

    const newBookTitle = document.querySelector("#title");
    newBookTitle.addEventListener("input", (e) => {
      if (newBookTitle.validity.checkValidity) {
        newBookTitle.setCustomValidity("Title must be at least 2 characters");
      } else {
        newBookTitle.setCustomValidity("");
      }
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

const myLibrary = new Library();
const display = new Display();

display.buildLibrary();

modal.style.display = "flex"; // Remove this to hide modal on load
