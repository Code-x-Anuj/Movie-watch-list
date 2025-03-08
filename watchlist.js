function createMovieElements(movieArray) {
    const watchlistContainer = document.getElementById("search-result");
    
    const emptyWatchlistMessage = `
        <div id="watchlist-background-text"> 
            <h1> No movies in your watchlist.</h1> 
            <div>  
                <a id="go-back-link" href="index.html"> 
                    <img src="addIcon.png" class="addRemoveIcon" /> Add some movies
                </a>
            </div>
        </div>
    `;
    if (movieArray.length === 0) {
       watchlistContainer.innerHTML =  emptyWatchlistMessage;
        return;
    }

    watchlistContainer.innerHTML = '';

    // Iteratively create and append divs for each movie
    movieArray.forEach((movie, index) => {
        // Create main movie div
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie';

        // Create image element
        const img = document.createElement('img');
        img.src = movie.Poster;
        img.className = 'image';

        // Create text info container
        const textInfoDiv = document.createElement('div');
        textInfoDiv.className = 'textInfo';

        // Title and rating section
        const titleDataDiv = document.createElement('div');
        titleDataDiv.id = 'titleData';
        titleDataDiv.innerHTML = `
            <h3 id="titleOfMovie">${movie.Title}</h3>
            <p><img src="star.png" class="imageStar" />${movie.imdbRating}</p>
        `;

        // Movie details and button section
        const dataDiv = document.createElement('div');
        dataDiv.className = 'data1';
        const button = document.createElement('button');
        button.className = 'watchlist-btn';
        button.id = 'add-btn';
        button.innerHTML = `<img src="remove.png" class="addRemoveIcon" /> Remove`;
        button.onclick = () => removeFromWatchlist(index);

        dataDiv.innerHTML = `
            <p>${movie.Runtime} &nbsp;&nbsp; ${movie.Genre} &nbsp;&nbsp; ${movie.Type}</p>
        `;
        dataDiv.appendChild(button);

        // Add plot and actors
        const plotP = document.createElement('p');
        plotP.textContent = movie.Plot;
        const actorsP = document.createElement('p');
        actorsP.textContent = movie.Actors;

        // Assemble text info
        textInfoDiv.appendChild(titleDataDiv);
        textInfoDiv.appendChild(dataDiv);
        textInfoDiv.appendChild(plotP);
        textInfoDiv.appendChild(actorsP);

        // Assemble movie div
        movieDiv.appendChild(img);
        movieDiv.appendChild(textInfoDiv);

        // Create and add hr container
        const hrContainer = document.createElement('div');
        hrContainer.className = 'hr-container';
        hrContainer.innerHTML = '<hr />';

        // Add to container
        watchlistContainer.appendChild(movieDiv);
        watchlistContainer.appendChild(hrContainer);
    });
}

function loadWatchlist() {
    const watchList = JSON.parse(localStorage.getItem("watchlist")) || [];
    createMovieElements(watchList);
}

function removeFromWatchlist(index) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist.splice(index, 1);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    loadWatchlist();
}

window.onload = loadWatchlist;