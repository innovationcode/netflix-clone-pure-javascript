window.onload = () =>  {
      getOriginals();
      fetchTrendingMovies();
      fetchTopRatedMovies();
      // getActionMovies();
      // getCommedyMovies();
      // getHorrorMovies();
      // getRomanceMovies();
      // getDocumentariesMovies();
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
          var image = `
              <img src="https://image.tmdb.org/t/p/original${movie[path_type]}"></img>
          `
          moviesEl.innerHTML += image;
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
// function getActionMovies(){
//       var url = "";
//       fetchMovies(url, 'action-movies', 'backdrop_path');
//}

// ++++++++++++++++++++++++++++++++++++++++++++  Commedy Movies  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// function getCommedyMovies(){
//       var url = "";
//       fetchMovies(url, "comedy-movies", 'backdrop_path');
//}

// ++++++++++++++++++++++++++++++++++++++++++++  Horror  Movies  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// function getHorrorMovies(){
//       var url = "";
//       fetchMovies(url, "horror-movies", 'backdrop_path');
// }

// ++++++++++++++++++++++++++++++++++++++++++++  Romance  Movies  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// function getRomanceMovies(){
//       var url = "";
//       fetchMovies(url, "romance-movies", 'backdrop_path');
// }

// ++++++++++++++++++++++++++++++++++++++++++++  Documentaries Movies  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// function getDocumentariesMovies(){
//       var url = "";
//       fetchMovies(url, "documentaries", 'backdrop_path');
// }
