import { combineReducers } from 'redux';
import {ADD_MOVIES , ADD_FAVOURITE,REMOVE_FROM_FAV,SET_SHOW_FAV ,ADD_SEARCH_RESULT,ADD_MOVIES_TO_LIST} from '../actions';

const initialStateMovies={
    list:[],
    favourites:[],
    ShowFav:false,
}
export function movies(state=initialStateMovies,action){
    switch(action.type){
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies
                
            }
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites:[action.movie , ...state.favourites]
                

            }
        case REMOVE_FROM_FAV:

        const filteredArray=state.favourites.filter(movie=>movie.title!==action.movie.title)
            return {
                ...state,
                favourites:filteredArray

            }
            case SET_SHOW_FAV :
                
                return{
                    ...state,
                    showFav:action.val

                }
            case ADD_MOVIES_TO_LIST:
                return {
                    ...state,
                    list:[action.movie,...state.list]
                }
        default :
           return state;
    }
}

const initialSearchState={
      result:{},
      showSearchResults:false,
      ans:''
};
export function search( state=initialSearchState,action){
    switch(action.type){
        case ADD_SEARCH_RESULT:
            var myvar,myans;
            // console.log(action.movie.Response)
            if(action.movie.Response==='False'){
               myvar=false
               myans="movie not found"
            }
            else myvar=true
            // console.log('myvar',myvar)
            return{
                ...state,
                
                result:action.movie,
                
                showSearchResults:myvar,
                ans:myans
            }
            case ADD_MOVIES_TO_LIST:
                return {
                    ...state,
                    
                    showSearchResults:false
                }
        default:
            return state;
    }
    
}

// const initialRootState={
       
// }
// export default function RootReducer(state=initialRootState,action){
//       return{
//         movies: movies(state.movies,action),
//         search:search(state.search,action)
//       }
// }

// in built combineRdeucers method is prob=vided by redux

const rootReducer= combineReducers({
    //property:reducer 
    movies:movies,
    search:search
})
export default rootReducer;