let searchResult = document.getElementById("search-result");

document.getElementById("search-form").addEventListener("submit", searchMovie);

function searchMovie(event) {
    event.preventDefault();
    const searchTerm = document.getElementById("input-box").value.trim();
    if (searchTerm === "") {
        alert("Please enter a movie name before searching!"); // Alert if empty
        return; // Stop function execution
    }
    clearScreenAndShowLoader();
    fetchMoviesBySearchTerm(searchTerm)
        .then(movies => {
            // console.log(movies);
            if (movies.length === 0) return;
            const validMovies = checkUndefinedObjects(movies);
            const uniqueMovies = removeDuplicateMovies(validMovies);
            uniqueMovies.forEach(movie => fetchMovieById(movie.imdbID))
        });
};

function fetchMoviesBySearchTerm(searchTerm) {
    return fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=d99b99e6`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "False") {
                searchResult.innerHTML = `<h2 id ="fetching-error"> ${data.Error} </h2>`
                clearLoader();
                return [];
            }
            return data.Search;
        })
}

function fetchMovieById(movieId) {
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=d99b99e6`)
        .then(response => response.json())
        .then(movieData => {
            if (movieData.Response === "True") {
                displayMovie(movieData);
                clearLoader();
            }
        })
        .catch(error => console.error("Error fetching movie details:", error));
}

function removeDuplicateMovies(movies) {
    let uniqueMovies = [];
    for (let i = 0; i < movies.length; i++) {
        let isDuplicate = false;

        for (let j = 0; j < uniqueMovies.length; j++) {
            if (movies[i].imdbID === uniqueMovies[j].imdbID) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            uniqueMovies.push(movies[i]);
        }
    }
    return uniqueMovies;
}

function checkUndefinedObjects(movies) {
    return movies.filter(movie => movie.Response !== "False");
}

function displayMovie(movie) {
    const movieElement = document.createElement('div');
    movieElement.className = "movie-display";
    movieElement.innerHTML = ` 
        <div class ="movie"> 
            <img src = ${movie.Poster} class = "image" /> 
            <div class ="textInfo"> 
                <div id ="titleData" > <h3 id= "titleOfMovie" > ${movie.Title} </h3> 
                            <p> <img src = ${"star.png"} class = "imageStar" /> ${movie.imdbRating} </p>
                </div>
 
                <div class ="data1">
                    <p>${movie.Runtime} &nbsp;&nbsp; ${movie.Genre} &nbsp;&nbsp; ${movie.Type} </p>            
                    <button class ="watchlist-btn" id = "add-btn"> 
                        <img src = ${"addIcon.png"} class = "addRemoveIcon" /> Watchlist 
                    </button>
                </div>
                <p>${movie.Plot}</p>
                <p>${movie.Actors}</p>      
            </div> 
        </div> 
        <div class="hr-container">
        <hr />
        </div>   
    `;

    searchResult.appendChild(movieElement);

    let watchlistBtn = movieElement.querySelector(".watchlist-btn");
    watchlistBtn.addEventListener("click", function () {
        addToWatchlist(movie);
    });
}

function addToWatchlist(movie) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    let movieExists = watchlist.some(item => item.imdbID === movie.imdbID);
    if (movieExists) {
        alert(`${movie.Title} is already in your Watchlist!`)
        return;
    }
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert(`${movie.Title} added to your Watchlist.`)
}

function clearScreenAndShowLoader() {
    const backgroundText = document.getElementById("background-text");
    const loadingText = document.getElementById("loader");

    if (backgroundText) {
        backgroundText.style.display = "none";
    }

    if (searchResult) {
        searchResult.innerHTML = "";
    }

    if (loadingText) {
        loadingText.style.display = "block";
    }

    const inputBox = document.getElementById("input-box");
    if (inputBox) {
        inputBox.value = "";
    }
}

function clearLoader() {
    const loadingText = document.getElementById("loader"); // Define loadingText properly
    if (loadingText) {
        loadingText.style.display = "none";
    }
}
