// I don't want to make the api key public so I created a file keys.js with the API_KEY
// If you want to replicate it, create an api key on the themoviedb.org site and insert it
import API_KEY from "./keys.js"

const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`

const form = document.getElementById('form')
const search = document.getElementById('search')

const main = document.getElementById('main')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRating(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieElement)
    })
}

function getClassByRating(rating) {
    if(rating >= 8) {
        return 'green'
    } else if (rating >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_URL + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
})