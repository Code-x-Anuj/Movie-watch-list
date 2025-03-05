let title ="";
 
document.getElementById("search-btn").addEventListener("click",searchMovie);
function searchMovie() {
    const searchTerm = document.getElementById("input-box").value;
    console.log(searchTerm);
    document.getElementById('search-result').innerHTML = "";
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=d99b99e6`)
        .then(res => res.json())
        .then(data => {console.log(data)
            data.Search.forEach(movie => { 
                // console.log(movie.Poster)
                title = movie.Title
                console.log(title);
                fetch(`http://www.omdbapi.com/?t=${title}&apikey=d99b99e6`)
                    .then(response => response.json())
                    .then(movieData => {console.log(movieData)
                    displayMovie(movieData);
                     });
                    // showPoster(movie)
            });     
        });
}
 

function displayMovie(movie) {
    const movieElement = document.createElement('div');
    movieElement.className = "movie-display";
    movieElement.innerHTML = ` <div class ="movie"> 
        <img src = ${movie.Poster} class = "image" /> 
            <div class ="textInfo"> <h3 id= "titleOfMovie" > ${movie.Title} </h3> 
               <div class ="data1">  <p>${movie.Runtime} &nbsp;&nbsp; ${movie.Genre} &nbsp;&nbsp; ${movie.Type} </p> 
               </div>
                <p>${movie.Plot}</p>
                <p>${movie.Actors}</p>
                <button class ="watchlist-btn" id = "add-btn"> Add to watchlist </button>
            </div> 
        </div> `;
    document.getElementById('search-result').appendChild(movieElement);

        let watchlistBtn = movieElement.querySelector(".watchlist-btn");
        watchlistBtn.addEventListener("click", function () {
           // alert(`${movie.Title} added to watchlist!`)
            //localStorage.setItem("my-watchlist")
            let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
            watchlist.push(movie);
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
            alert(`${movie.Title} added to watchlist`)
            console.log(JSON.parse(localStorage.getItem("watchlist")))
            console.log(`${movie.Title} added to watchlist!`);
            
        });
}

   
 
 
