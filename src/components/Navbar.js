import React from "react";
import { connect } from "react-redux";
// import { StoreContext } from "..";
// import { data } from "../data";
import {handleMovieSearch,addMoviesToList} from '../actions';

class Navbar extends React.Component{

  constructor(props){
    super(props);
    this.state={
      showSearchResults:false,
      searchText:''
    };    
  }
  handleAddToMovies=(movie)=>
  {
    this.props.dispatch(addMoviesToList(movie));
    this.setState({
      showSearchResults:false
    });   
  };
  handleSearch=()=>{
    const{searchText}=this.state;  
    this.props.dispatch(handleMovieSearch(searchText));
  };
  handleChange=(e)=>{
    this.setState({
       searchText:e.target.value
    });
  };
  render(){
    
    const{result,showSearchResults,ans}=this.props.search;
    
    // if(showSearchResults===false)
    // {
      
    //   ans="MOVIE NOT FOUND"
    // }
    console.log(showSearchResults);
    return (
        <div className="nav">
            <div className="search-container">
                <input onChange={this.handleChange}/>
                <button id="search-btn" onClick={this.handleSearch}>Search</button>
                <div className="search-results" >
                  <div className="search-result" /*style={{margin:30 , textAlign:"center"} }*/>
                     {ans}
                </div>
                </div>
                {showSearchResults &&
                <div className="search-results">
                  <div className="search-result">
                    <img src={result.Poster} alt="search-pic"/> 
                    <div className="movie-info">
                      <span>{result.Title}</span>
                      <button onClick={()=>this.handleAddToMovies(result)}>ADD TO MOVIES</button>
                    </div>
                  </div>
                </div>
                  }
                  
            </div>

          
        </div>
      );
  }
}   

// class NavbarWrapper extends React.Component{
//   render(){
//     return(
//       <StoreContext.Consumer>
//       {
//         (store)=> <Navbar dispatch={store.dispatch} search={this.props.search}/>
//       }
//       </StoreContext.Consumer>
//     )
//   }
// }
// export default NavbarWrapper;

function mapStateToProps({search})
{
  return{
    search,
  };
}
// const connectedComponent = 
export default connect(mapStateToProps)(Navbar);;