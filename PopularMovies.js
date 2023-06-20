let films = document.getElementById("Popular-movies")


const generateFilmItem = (film) =>`
<div class="homePage">
    <img class="homeFilm" src="https://image.tmdb.org/t/p/original${film.backdrop_path}">
</div>
`

const renderFilm = (api) => {
  const html = api.map((film) => {
      return generateFilmItem(film);
  }).join("");

  films.innerHTML = html;
}

function fetchMovies(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzI3Nzc2ZDY0YjE5NDYxZDAwNmM3OTVhMzVmMzQxZSIsInN1YiI6IjY0ODI0NGNiOTkyNTljMDBjNWIzNzEwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1qkzIYTfL5_hcA5VDvBhTPdwQYsy_9IYJyiyLpwhs3I'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => renderFilm(response.results))
        .catch(err => console.error(err));


    }

fetchMovies()









