import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, } from 'react-router-dom';
import './index.css';
import Header from './components/header'
import App from './App';
import Signup from './components/Signup'
import * as serviceWorker from './serviceWorker';
import Shortner from './components/shortner'
ReactDOM.render(
<Router>
     <div>
          <Header/>
          <Route exact path='/' component={App}/> 
          <Route exact path = '/signup'component={Signup}/> 
          <Route exact path = '/shortner' component={Shortner}/>
     </div>   
     
</Router>     
, document.getElementById('root'));
serviceWorker.unregister();
