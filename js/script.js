// ELEMENT SELECTORS
const authorContainer = document.querySelector('#authorContainer')
let paginationList = document.querySelector('#paginationList')
const searchInput = document.querySelector('#authorSearch')

// console.log(authors);
const authorsPerPage = 3

/* ENTER YOUR CODE HERE */

// [X] 1. Create an event listener on the searchInput to listen for keyboard input.
// [X] 2. Inside, create a variable storing an empty array for the soon-to-be filtered authors.
// [X] 3. Create a variable to store the string the user has typed.
//    Hint: toLowerCase()
// [X] 4-a. Start a loop to the length of `authors`.
// [X] 4-b. Inside, create a variable to store the current `authors` name.
//      Hint: toLowerCase()
// [X] 4-c. Create a conditional to check if the author's name includes the user's input.
//      Hint: includes()
// [X] 4-d. If true, push the current author object into the new array created above.
// [X] 5-a. Create a conditional to check if the length of the new array is greater than zero.
// [X] 5-b. If true,
//      - Call the handlePagination() function passing it this new array.
//      - Call the showPage() function passing it this new array and the number 1.
// [X] 5-c. If false,
//      - Set the authorContainer's innerHTML to an <h3> saying no results were found.
//      - Set the paginationList's innerHTML to an empty string.

// Self imposed problem:
// [X] Store current active page in variable, currentPage
// [X] Update currentPage whenever pagination buttons are clicked
// [X] In the search event listener, if input is empty reset to currentPage with full authors list

let currentPage = 1

searchInput.addEventListener('input', (e) => {
  let filteredAuthors = []
  let searchText = e.target.value.toLowerCase()

  if (searchText === '') {
    handlePagination(authors, currentPage)
    showPage(authors, currentPage)
    return
  }

  for (let i = 0; i < authors.length; i++) {
    let authorName = authors[i].name.toLowerCase()

    if (authorName.includes(searchText)) {
      filteredAuthors.push(authors[i])
    }
  }

  if (filteredAuthors.length > 0) {
    handlePagination(filteredAuthors, 1)
    showPage(filteredAuthors, 1)
  } else {
    authorContainer.innerHTML = `<h3>No results found.</h3>`
    paginationList.innerHTML = ''
  }
})

/* DON'T CHANGE THE CODE BELOW */

/* This function handles calculating how many buttons are
needed and dynamically add them to the page */

function handlePagination(array, activePage = 1) {
  const numberOfButtons = Math.ceil(array.length / authorsPerPage)
  paginationList.innerHTML = ''

  for (let i = 1; i <= numberOfButtons; i++) {
    const html = `
      <li>
        <button>${i}</button>
      </li>
    `
    paginationList.insertAdjacentHTML('beforeend', html)
  }
  //paginationList.querySelector('button').classList.add('active')

  //set active button based on activePage argument
  const buttons = paginationList.querySelectorAll('button')
  if (buttons.length > 0 && activePage <= buttons.length) {
    buttons[activePage - 1].classList.add('active')
  } else if (buttons.length > 0) {
    buttons[0].classList.add('active')
  }

  //remove previous event listeners to avoid stacking
  paginationList.replaceWith(paginationList.cloneNode(true))
  //re-select paginationList after cloning
  paginationList = document.querySelector('#paginationList')

  /* This event listener handles calling our function
  below to change the page & add the `active` class  */

  paginationList.addEventListener('click', (e) => {
    const activeButton = paginationList.querySelector('.active')
    const buttonClicked = e.target.closest('button')

    if (activeButton && buttonClicked) {
      activeButton.classList.remove('active')
    }

    if (buttonClicked) {
      buttonClicked.classList.add('active')
      currentPage = Number(buttonClicked.innerHTML)
      showPage(array, currentPage)
    }
  })
}

handlePagination(authors, currentPage)
showPage(authors, currentPage)

/* This function handles calculating how many and which
authors to show on the current page and dynamically add them */

function showPage(array, page) {
  const start = page * authorsPerPage - authorsPerPage
  const end = page * authorsPerPage - 1
  authorContainer.innerHTML = ''

  for (let i = 0; i < array.length; i++) {
    if (i >= start && i <= end) {
      const html = `
        <div class="author-card">
          <div class="card-header">
            <img src="${array[i].image}" alt="photo of ${array[i].name}" />
          </div>
          <div class="card-content">
            <h2 class="title">${array[i].name}</h2>
            <p>${array[i].text}</p>
          </div>
        </div>
      `

      authorContainer.insertAdjacentHTML('beforeend', html)
    }
  }
}

/* These function calls are needed to initialize the page */

handlePagination(authors)
showPage(authors, 1)
