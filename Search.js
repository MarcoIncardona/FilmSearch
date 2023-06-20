let button = document.getElementById("button")
let input = document.getElementById("input")
let films = document.getElementById("search")
let homepagefilms = document.getElementById("homepage-films")
let buttonPage = document.getElementById("button-page")
let listButton = document.getElementById("button-list")
let numberButtons = document.querySelectorAll(".number-button-page")


let state = {
  currentPage: 1,
  totalPage: 0,
  totalResult: 0
}

const generateFilmItem = (film) => `
<div class="single-film">
    <img class="searchImg" src="https://image.tmdb.org/t/p/original${film.backdrop_path === null ? film.poster_path : film.backdrop_path}">
</div>
`

const renderFilm = (result) => {
  const html = result.results.filter(el => el.poster_path !== null).map((film) => {
    return generateFilmItem(film);
  }).join("");

  films.innerHTML = html
}

const renderButton = () => {
  listButton.innerHTML = ""
  for (let i = 1; i <= state.totalPage; i++) {
    const li = document.createElement("li")
    li.className = "number-button-page";
    li.textContent = `${i}`;
    listButton.appendChild(li)
  }
  buttonPage.style.display = "flex"
}


listButton.addEventListener("click", (event) => {
  state.currentPage = parseInt(event.target.textContent)
  console.log(state)
  FetchApi(input.value, state.currentPage)
  .then((result) => {
    renderFilm(result)
    renderButton()
  })
  .catch((err) => console.error(err))
})


function FetchApi(title, page) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzI3Nzc2ZDY0YjE5NDYxZDAwNmM3OTVhMzVmMzQxZSIsInN1YiI6IjY0ODI0NGNiOTkyNTljMDBjNWIzNzEwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1qkzIYTfL5_hcA5VDvBhTPdwQYsy_9IYJyiyLpwhs3I'
      }
    };

    fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`, options)
      .then(response => response.json())
      .then(result => { resolve(result) })
      .catch(err => reject(err))
  })
}

button.addEventListener("click", () => {
  homepagefilms.style.display = "none"
  state.currentPage = 1
  FetchApi(input.value, state.currentPage)
    .then((result) => {
        state.currentPage = result.page,
        state.totalPage = result.total_pages,
        state.totalResult = result.total_results
      console.log(result)
      renderFilm(result)
      renderButton()
    })
    .catch((err) => console.error(err))
})








