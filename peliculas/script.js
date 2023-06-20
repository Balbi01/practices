/* API:  http://www.omdbapi.com/?apikey=[apikey]&s=[búsqueda] */
/* API Key: 8efb52d2 */

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