/* API:  http://www.omdbapi.com/?apikey=[apikey]&s=[búsqueda] */
/* API Key: 8efb52d2 */
/* Detalles: https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=8efb52d2 */

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

/* cargar pelícuas desde la API */
async function loadMovies(searchTerm){
    const URL = `http://www.omdbapi.com/?apikey=8efb52d2&s=${searchTerm}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
            searchList.classList.add('hide-search-list');
     }
    
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else
            moviePoster = "./images/image_not_found.jpg";

        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class="search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;        
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    /* Obtener el número ID de la película */
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            console.log(movie.dataset.id);
            /* Esconder los resultados al dar click en la película */
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = " ";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=8efb52d2`);
            const movieDetails = await result.json();
            console.log(movieDetails);
           displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src ="${(details.Poster != "N/A") ? details.Poster: "./images/image_not_found.jpg"}" alt ="movie-poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Año: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Estreno: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Género: </b> ${details.Genre}</p>
        <p class = "writer"><b>Escritores: </b> ${details.Writer}</p>
        <p class = "actors"><b>Actores: </b> ${details.Actors}</p>
        <p class = "plot"><b>Sinopsis: </b>${details.Plot}</p>
        <p class ="languaje"><b>Idioma: </b> ${details.Languaje} </p>
        <p class ="awards"><b>🏆Premios: </i></b>${details.Awards}</p>
    </div>    
    
    `;
}