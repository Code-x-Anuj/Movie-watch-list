 document.getElementById("search-btn").addEventListener("click", () => {
    const searchTerm = document.getElementById("input-box").value;
    console.log(searchTerm);
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=d99b99e6`)
        .then(res => res.json())
        .then(data => {console.log(data)
            data.Search.forEach(element => { 
                console.log(element.Poster)
                const poster = document.createElement('div');
                poster.className = "posterOfMovie";
                poster.innerHTML =  `<img src = ${element.Poster} class = "anuj" />`
                document.getElementById('search-result').appendChild(poster);
            });
            
            
            
            
            
            
            // document.getElementById("movie-poster").innerHTML = `<img src = ${data.Search[0].Poster} class = "poster" />`
    });
    
 })
 
 
 







 