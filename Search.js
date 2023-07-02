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
    <img class="searchImg homeFilm" src="https://image.tmdb.org/t/p/original${film.backdrop_path === null ? film.poster_path : film.backdrop_path}">

    <div class="modal-container" id="container-modal">
    <div class="modal">
        <button class="close-modal5">X</button>
        <div class="modal-wrap">
            <img class="search-poster-img" src="https://image.tmdb.org/t/p/original${film.poster_path}">
            <div class="modal-film-details">
                <h1>${film.title}</h1>
                <span>${film.release_date}</span>
                <div class="film-button-action">
                    <span>${film.vote_average}</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                  </span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  </span>
                </div>
                <p>${film.overview}</p>         
            </div>
        </div>
    </div>
</div>
</div>
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
  let pages
  if(state.totalPage > 10){
    pages = 10
  }else{
    pages = state.totalPage
  }
  for (let i = 1; i <= pages; i++) {
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
    closeModal()
    openModal()
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
      openModal()
      closeModal()
    })
    .catch((err) => console.error(err))
})

function openModal(){
  let filmImage = document.querySelectorAll(".searchImg")

  for(let i of filmImage){
    i.addEventListener("click", (event)=>{
      event.target.nextElementSibling.style.display = "block"
      document.getElementById("modalBackdrop").style.display = "block";
    }) 
  }
}

function closeModal(){
  let closeButton = document.querySelectorAll(".close-modal5")
  
  for(let i of closeButton){
    i.addEventListener("click", (event)=>{
      event.target.offsetParent.offsetParent.style.display = "none"
      document.getElementById("modalBackdrop").style.display = "none";
     })
}
}








