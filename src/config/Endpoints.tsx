export const Endpoints = {
  originalImageUrl: "https://image.tmdb.org/t/p/original",
  thumbImageUrl: "https://image.tmdb.org/t/p/w500",
  popularMovies:
    "https://api.themoviedb.org/3/movie/popular?language=en-US&append_to_response=videos,image",
  latestMovies: "https://api.themoviedb.org/3/movie/latest?language=en-US",
  topRatedMovies: "https://api.themoviedb.org/3/movie/top_rated?language=en-US",
  upcomingMovies: "https://api.themoviedb.org/3/movie/upcoming?language=en-US",
  nowPlayingMovies:
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US",
  playVideos: "https://api.themoviedb.org/3/movie/",
  movieDetails:
    "https://api.themoviedb.org/3/movie/id?append_to_response=videos,images&language=en-US",
  movieCredits:
    "https://api.themoviedb.org/3/movie/id/credits?append_to_response=videos,images&language=en-US",
  searchMovies: "https://api.themoviedb.org/3/search/movie?query=",
};
