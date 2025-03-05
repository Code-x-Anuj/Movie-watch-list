function loadWatchlist(){
    const watchList = JSON.parse(localStorage.getItem("watchlist")) || [];
    const watchlistContainer = document.getElementById("search-result")

    if(watchList.length === 0){
        watchlistContainer.innerHTML = "<p>No movies in watchlist.</p>";
        return;
    }

    watchlistContainer.innerHTML = watchList.map((movie,index)  => ` <div class ="movie"> 
    <img src = ${movie.Poster} class = "image" /> 
        <div class ="textInfo"> <h3 id= "titleOfMovie" > ${movie.Title} </h3> 
           <div class ="data1">  <p>${movie.Runtime} &nbsp;&nbsp; ${movie.Genre} &nbsp;&nbsp; ${movie.Type} </p> 
           </div>
            <p>${movie.Plot}</p>
            <p>${movie.Actors}</p>
            <button class ="watchlist-btn" onclick="removeFromWatchlist(${index})" > Remove </button>
        </div> 
    </div> `).join("");
}
function removeFromWatchlist(index) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist.splice(index, 1); 
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    loadWatchlist();
}

window.onload = loadWatchlist; 