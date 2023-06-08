let button = document.getElementById("button")
let input = document.getElementById("input")
let films = document.getElementById("films")


let state = {
  film: []
}

const generateFilmItem = (film) =>`
<div class="film">
    <img src="${film.image?.url}">
    <h3>${film.title}</h3>
    <p>${film.year}</p>
</div>
`

const renderFilm = () => {
  const html = state.film.map((film) => {
      return generateFilmItem(film);
  }).join("");

  films.innerHTML = html;
}

button.addEventListener("click", () =>{
  async function fetchApi(title){
      const url = `https://online-movie-database.p.rapidapi.com/title/find?q=${title}`;
      const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c4681c5016mshea25e25585387d9p1162c6jsnf7e58bfbf2a9',
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
  };
      try {
          const response = await fetch(url, options);
          const result = await response.json();
          state.film = result.results
          console.log(state)
          renderFilm()
      } catch (error) {
          console.error(error);
      }
  }
  
  fetchApi(input.value)
})








