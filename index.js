document.addEventListener("DOMContentLoaded", init);

const apiURL = 'http://localhost:3000/books'
const bookListEl = document.querySelector('#list')

function fetchBooks() {
  fetch(apiURL)
    .then(response => response.json())
    .then(renderBooks)
}

function renderBooks(booksArray) {
  console.log(booksArray)
  booksArray.forEach(renderSingleBook)
}

function renderSingleBook(book) {
  const bookEl = document.createElement('el')
  //results.genres[0].name;
  // results.genres.forEach(function(genre) {
  //  console.log(genre.name);
  //  });
  let userName = book['users'][0]['username']
  let bookUsernames = []
  for (let i = 0; i < book.users.length; i++) {
  bookUsernames.push(book['users'][i]['username'])
  }

  bookEl.innerHTML = `<h2>${book.title}</h2> <p>${book.description}</p> <img src='${book.img_url}'></img> <p class='user-likes'>${bookUsernames}<br><button data-id='${book.id} class='like-btn'>Like</button></p>`
  bookListEl.append(bookEl)
}

  // send a patch request to server increasing a toy's like count
  function addClicksToLikes(){
  document.addEventListener('click', (e) => {
    // conditionally render the like number
    if (e.target.className === "like-btn") {
      likeBook(e.target.dataset.id).then(console.log)
    }
  })
}

function likeBook(bookId, data) {
  return fetch(apiURL + `/${bookId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: 'pouros'
    })
  }).then(res => res.json())
}

// function saveNewBook(e) {
//   e.preventDefault()
//   console.log(e)
//   const name = bookName
// }

function init() {
  fetchBooks()
  addClicksToLikes()
}
