import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './Store/reducers/index';


//___Components
import SignUp from './ComponentsHome/SignUp';
import SignIn from './ComponentsHome/SignIn';
import Home from './ComponentsHome/Home'
import Dashboard from './ComponentsUser/Dashboard'
import AddArtwork from './ComponentsUser/AddArtwork'
import ArtworksList from './ComponentsUser/ArtworksList'
import AddCategory from './ComponentsAdmin/AddCategory'
import PrivateRoute from './privateroutes'
import DashboardAdmin from './ComponentsAdmin/DashboardAdmin';
import CateList from './ComponentsAdmin/CateList'
import UserList from './ComponentsAdmin/UserList'
import AllArtworkList  from './ComponentsAdmin/AllArtworkList';
import EditArtwork from './ComponentsUser/EditArtwork';
import SignInAdmin from './ComponentsAdmin/SignInAdmin'
import SignUpAdmin from './ComponentsAdmin/SignUpAdmin'
import PageAdmin from './ComponentsAdmin/PageAdmin'
import Header from './ComponentsHome/Header'
import Footer from './ComponentsHome/Footer'
import OurArtists from './ComponentsHome/OurArtists'
import ArtistGalery  from './ComponentsHome/ArtistGalery'




const store = createStore(mainReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const myRouter = (
  <Provider store={store}>
      <Router>
        <Header/>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/admin" component={PageAdmin} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/admin/signin" component={SignInAdmin} />
              <Route exact path="/admin/signup" component={SignUpAdmin} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/add-artwork" component={AddArtwork} />
              <Route exact path="/artworks-list" component={ArtworksList} />
              <Route exact path="/admin/category-list" component={CateList} />
              <Route exact path="/admin/user-list" component={UserList} />
              <Route exact path="/admin/add-category" component={AddCategory} />
              <PrivateRoute exact path="/admin/dashboard" component={DashboardAdmin} />
              <Route exact path="/admin/all-artwork-list" component={AllArtworkList} />
              <Route exact path="/user/edition-artwork/:id_artwork" component={EditArtwork} />
              <Route exact path="/galeries" component={OurArtists} />
              <Route exact path="/galerie-of/:id_user" component={ArtistGalery} />




          </Switch>
          <Footer/>
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
