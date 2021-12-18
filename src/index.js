import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Login from './components/Login';
import HomePage from './components/Homepage';
import Favorite from './components/Favorite' ;
import Register from './components/Register';
import { createStore} from 'redux'
import reducers from './reducers/reducers';

const store = createStore(reducers);

const Header=()=>{//Navigation bar

  const userState = useSelector((state)=>state.user);
  
  let LoggedInComponent = [], LoggedOutComponent = [];
  if(userState.status===false){
    LoggedInComponent.push(<span key='login'><Link to={"/login"}>Log in </Link></span>);
    LoggedInComponent.push(<span key = 'register'><Link to={"/register"}>Sign up </Link></span>);
    LoggedOutComponent = [];
  }else{
      LoggedOutComponent.push(<span><Link to={"/favorite"}>Favorite </Link></span>);
    LoggedOutComponent.push(<span key = 'logout'><Link to={"/logout"}>Logout </Link></span>);
    LoggedOutComponent.push(<span key='username'>{userState.username}</span>);
    LoggedInComponent = [];
  }


  return(
    <div>
      <span><Link to={"/"}>Home </Link> </span>
      {LoggedOutComponent}
      {LoggedInComponent}      
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/favorite" element={<Favorite/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
