import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools';
import mainReducer from './Store/reducers/index';
//____Persist Store
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'


//___Components
import SignUp from './ComponentsHome/SignUp';
import SignIn from './ComponentsHome/SignIn';
import Home from './ComponentsHome/Home'
import Dashboard from './ComponentsUser/Dashboard'
import AddArtwork from './ComponentsUser/AddArtwork'
import ArtworksList from './ComponentsUser/ArtworksList'
import PrivateRoute from './privateroutes'




const store = createStore(mainReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

// const persistor = persistStore(store)


const myRouter = (
  <Provider store={store}>
      <Router>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/add-artwork" component={AddArtwork} />
              <Route path="/artworks-list" component={ArtworksList} />



          </Switch>
      </Router>
      </Provider>

);

ReactDOM.render(
  myRouter,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
