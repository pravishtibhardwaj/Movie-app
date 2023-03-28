// import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import './index.css';
import rootReducer from './reducers';
import App from './components/App';
import {createStore,applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
// import AppWrapper from './components/App';
// import AppWrapper from './components/App';
// import AppWrapper from './components/App';s
  


//curried function   
//fucntion logger(obj,next,action)
//logger(obj )(next)(action  )

// since there can be multiple middle wares so next keywors is used to call the  middleware2,3 and so on..
//and if we are at the last middleware then next will call dispatch function
// const logger=function({dispatch,getState})
// {
//     return function(next){
//         return function(action){
//             console.log('ACTION_TYPE=',action.type); 
//             next(action);
//         }
//     }
// }
const logger=({dispatch,getState})=>(next)=>(action)=>{
    //logger code
    if(typeof action !== 'function')
    {
        console.log('ACTION_TYPE=',action.type);
    }
    next(action);
}
//thunk already present in redux-thunk 

// const thunk=({dispatch,getState})=>(next)=>(action)=>{
//     //logger code
//     // console.log('ACTION_TYPE=',action.type);
//     if(typeof action==='function'){
//     action(dispatch);
//     return;
//     }
//     next(action);
// }
// configureStore({reducer:rootReducer},
const store = createStore(rootReducer,applyMiddleware(logger,thunk));
console.log('store',store);

// **********NO NEED OF CONTEXT AND CONNECT METHOD COZ IT IS ALREADY INBUILT IN REACT-REDUX LIBRARY



// export const StoreContext=createContext();   //store context has a provider and a consumer property
// //we can pass anything in provider ,here we pass our store...if my any nested level componemt want the store access then it can use thr consumer property without using props

// console.log('storecontext',StoreContext);

// class Provider extends React.Component{
//     render(){
//     const {store} = this.props;
//     return <StoreContext.Provider value={store}> 
//        {this.props.children}             {/* //childern are all those which are wrapeed inside the Provider class ....here App component  */}
//     </StoreContext.Provider>
//     }
//  }
// const connectedComponent = connect(callback)(App);
// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBeSentAsProps = callback(state);

//         return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => {
//               return <ConnectedComponent store={store} />;
//             }}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }
// console.log('before state',store.getState()); 

// //using dispatch function actions to the reducer and store are sent
// store.dispatch({
//     type:'ADD_MOVIES',
//     movies:[{name:'supername'}]
// });
// console.log('after state',store.getState());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // instead of wrapping like this create uor own provider class so that we can easily make changes acc to our convinience
    // <StoreContext.Provider value={store}> {/*the store will be availbale to each and every decsendant comp. of app comp.*/ }
    //      <App store={store}/>                
    // </StoreContext.Provider>
    <Provider store={store}>
        <App />
     </Provider>
  
);

