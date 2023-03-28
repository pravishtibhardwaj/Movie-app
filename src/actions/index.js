// {
//     type:'ADD_MOVIES'
//     movies:[m1,m2,m3]
// }

//action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const REMOVE_FROM_FAV = "REMOVE_FROM_FAV";
export const SET_SHOW_FAV = "SET_SHOW_FAV";
export const HANDLE_MOVIE_SEARCH = "HANDLE_MOVIE_SEARCH";
export const ADD_MOVIES_TO_LIST = "ADD_MOVIES_TO_LIST";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT";

//action creators
export function addMovies(movies) {
  return {
    type: ADD_MOVIES,
    movies,
  };
}
export function addfavourites(movie) {
  return {
    type: ADD_FAVOURITE,
    movie,
  };
}
export function Removefavourites(movie) {
  return {
    type: REMOVE_FROM_FAV,
    movie,
  };
}
export function SetShowfavourites(val) {
  return {
    type: SET_SHOW_FAV,
    val,
  };
}

export function addMoviesToList(movie) {
  return {
    type: ADD_MOVIES_TO_LIST,
    movie,
  };
}
export function handleMovieSearch(movie) {
  const url = `http://www.omdbapi.com/?apikey=ec189d5a&t=${movie}`;
  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        console.log("movie", movie);

        //dispatch an action
        dispatch(addSearchMovieResult(movie));
      });
  };
}

//omdbapi.com/?apikey=ec189d5a&t=

export function addSearchMovieResult(movie) {
  return {
    type: ADD_SEARCH_RESULT,
    movie,
  };
}
