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



const store = createStore(mainReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const myRouter = (
  <Provider store={store}>
      <Router>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/admin/signin" component={SignInAdmin} />
              <Route path="/admin/signup" component={SignUpAdmin} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/add-artwork" component={AddArtwork} />
              <Route path="/artworks-list" component={ArtworksList} />
              <Route path="/admin/category-list" component={CateList} />
              <Route path="/admin/user-list" component={UserList} />
              <Route path="/admin/add-category" component={AddCategory} />
              <PrivateRoute path="/admin/dashboard" component={DashboardAdmin} />
              <Route path="/admin/all-artwork-list" component={AllArtworkList} />
              <Route path="/user/edition-artwork/:id_artwork" component={EditArtwork} />








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
