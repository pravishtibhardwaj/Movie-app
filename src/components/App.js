import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, SetShowfavourites } from "../actions";
import { connect } from "react-redux";
// import { StoreContext } from "../index";
// import NavbarWrapper from "./Navbar";
class App extends React.Component {
  //lifecycle function
  componentDidMount() {
    // const { store } =this.props;
    // store.subscribe(()=> {
    //   console.log("updated");
    //   this.forceUpdate();
    this.props.dispatch(addMovies(data));
  }

  // make api call
  //dispatch action
  // store.dispatch(addMovies(data));
  // console.log('state',this.props.store.getState());

  isFavouriteMovie = (movie) => {
    // const {movies}=this.props.store.getState();
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      return true; // movie found
    }
    return false;
  };
  OnChangeTabs = (val) => {
    // this.props.store.dispatch(SetShowfavourites(val))
    this.props.dispatch(SetShowfavourites(val));
  };
  render() {
    // console.log('state',this.props.store.getState());
    const { movies, search } = this.props; //not this.props.store.getState();
    const { list, favourites, showFav } = movies;
    const display = showFav ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFav ? "" : "active-tabs"}`}
              onClick={() => this.OnChangeTabs(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFav ? "active-tabs" : ""}`}
              onClick={() => this.OnChangeTabs(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {display.map((movie, index) => {
              return (
                <MovieCard
                  movie={movie}
                  key={`movies-${index}`}
                  dispatch={this.props.dispatch}
                  isFavourite={this.isFavouriteMovie(movie)}
                />
              );
            })}
            {display.length === 0 ? (
              <div className="no-movies">No movies to display! </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component{

//   render(){
//   return(
//   <StoreContext.Consumer>
//   {
//     (store)=> <App store={store}/>
//   }
//   </StoreContext.Consumer>
//   );
//     }
// }
// export default AppWrapper;
function callback(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}
const connectedComponent = connect(callback)(App);
export default connectedComponent;
