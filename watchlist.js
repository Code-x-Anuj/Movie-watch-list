function loadWatchlist(){
    const watchList = JSON.parse(localStorage.getItem("watchlist")) || [];
    const watchlistContainer = document.getElementById("search-result")

    if(watchList.length === 0){
        watchlistContainer.innerHTML = 
        '<div id ="watchlist-backkground-text"> <h1> No movies in your watchlist.</h1> <div>  <a id ="go-back-link" href="index.html"> <img src = "addIcon.png" class = "image1" /> Add some movies</a></div> </div>';
        return;
    }

    //create a function pass array 
    // that function iteratively creates div and pushes each object 
    
    watchlistContainer.innerHTML = watchList.map((movie,index)  =>  ` 
    <div class ="movie"> 
            <img src = ${movie.Poster} class = "image" /> 
                <div class ="textInfo"> 
                     <div id ="titleData" > <h3 id= "titleOfMovie" > ${movie.Title} </h3> 
                        <p> <img src = ${"star.png"} class = "imageStar" /> ${movie.imdbRating} </p>
                    </div> 
                        <div class ="data1">  
                            <p>${movie.Runtime} &nbsp;&nbsp; ${movie.Genre} &nbsp;&nbsp; ${movie.Type} </p> 
        
                            <button class ="watchlist-btn" id = "add-btn" onclick="removeFromWatchlist(${index})"> <img src = ${"addIcon.png"} class = "image1" /> Remove </button>
                        </div>
                    <p>${movie.Plot}</p>
                    <p>${movie.Actors}</p>
                    
                </div> 
    </div> 
    <div class="hr-container">
     <hr />
    </div>  `).join("");
}
function removeFromWatchlist(index) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist.splice(index, 1); 
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    loadWatchlist();
}

window.onload = loadWatchlist;