window.onload = () =>  {
      getOriginals();
      fetchTrendingMovies();
      fetchTopRatedMovies();
      getActionMovies();
      getCommedyMovies();
      getHorrorMovies();
      getRomanceMovies();
      getDocumentariesMovies();
      headerSelect();
}

function headerSelect() {
      var header = document.getElementById('logo-header');
      console.log("HEADER  ---------- ",header)
      if (document.onkeydown  ) {
            header.style.background = "red";
      }
}
// Common function to fetch mpvies from provided URL
function fetchMovies(url, element_selector, path_type) {
      fetch(url)
      .then((response)=>{
          if (response.ok) {
              return response.json();
          } else {
              throw new Error("something went wrong");
          }
      })
      .then((data)=>{
          console.log(data)  
          showMovies(data, element_selector, path_type);
      })
      .catch((error_data)=>{
          console.log(error_data);
      })
}

// Common function to show fectched movies by selecting particular id by providing query_selector
function showMovies(movies, element_selector, path_type) {
      var moviesEl = document.querySelector(element_selector);
      for(var movie of movies.results){
      //     var image = `
      //         <img src="https://image.tmdb.org/t/p/original${movie[path_type]}"></img>
      //     `
      //     moviesEl.innerHTML += image;
            var imageElement = document.createElement('img'); //create element image
            imageElement.setAttribute('data-id', movie.id);   //setArrtibute to image data-id - movie-id for movie selection
            imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`; //add src to image element

            imageElement.addEventListener('click', (e)=>{ // click event listner for movie image
                  handleMovieSelection(e);                
            });
            moviesEl.appendChild(imageElement); //adding child elememt to div selected thro' passed element_selector.
      }
}

// ++++++++++++++++++++++++++++++++++++++++++++  Original Movies  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getOriginals(){
      var url = "https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213";
      fetchMovies(url, ".original__movies", "poster_path");
}

// ++++++++++++++++++++++++++++++++++++++++++++  Trending Movies  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function fetchTrendingMovies(){
      var url = "https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045";
      fetchMovies(url, '#trending', 'backdrop_path')
}
  
// ++++++++++++++++++++++++++++++++++++++++++++  Top Rated Movies  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function fetchTopRatedMovies(){
      var url = "https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1";
      fetchMovies(url, '#top-rated', 'backdrop_path');
}

// ++++++++++++++++++++++++++++++++++++++++++++  Action Movies  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getActionMovies(){
      var url = "https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=28";
      fetchMovies(url, '#action-movies', 'backdrop_path');
}

// ++++++++++++++++++++++++++++++++++++++++++++  Commedy Movies  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getCommedyMovies(){
      var url = "https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=35";
      fetchMovies(url, "#comedy-movies", 'backdrop_path');
}

// ++++++++++++++++++++++++++++++++++++++++++++  Horror  Movies  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getHorrorMovies(){
      var url = "https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=27";
      fetchMovies(url, "#horror-movies", 'backdrop_path');
}

// ++++++++++++++++++++++++++++++++++++++++++++  Romance  Movies  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getRomanceMovies(){
      var url = "https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=10749";
      fetchMovies(url, "#romance-movies", 'backdrop_path');
}

// ++++++++++++++++++++++++++++++++++++++++++++  Documentaries Movies  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getDocumentariesMovies(){
      var url = "https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=99";
      fetchMovies(url, "#documentaries", 'backdrop_path');
}

// Functions to show movie trailer onclick movie poster..
async function getMovieTrailer(id) {
      var url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
      return await fetch(url)
      .then((response)=>{
          if (response.ok) {
              return response.json();
          } else {
              throw new Error("something went wrong");
          }
      })
}

const setTrailer = (trailers) => {
      const iframe = document.getElementById('movieTrailer');
      const movieNotFound = document.querySelector('.movieNotFound');
      if(trailers.length > 0 ){
          movieNotFound.classList.add('d-none');
          iframe.classList.remove('d-none');
          iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`
      } else {
          iframe.classList.add('d-none');
          movieNotFound.classList.remove('d-none');
      }
}

const handleMovieSelection = (e) => {
      const id = e.target.getAttribute('data-id');
      const iframe = document.getElementById('movieTrailer');
      // here we need the id of the movie
      getMovieTrailer(id).then((data)=>{
          const results = data.results;
          const youtubeTrailers = results.filter((result)=>{
              if(result.site == "YouTube" && result.type == "Trailer"){
                  return true;
              } else {
                  return false;
              }
          })
          setTrailer(youtubeTrailers);
      });
  
      // open modal
      $('#trailerModal').modal('show')
}