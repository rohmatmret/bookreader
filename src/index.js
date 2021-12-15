import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import LoginForm from "./pages/LoginForm";
import Reader from "./pages/Reader";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Premium from "./pages/Premium";
import { Provider } from "react-redux";
import {store} from './store';
import Cookies from 'js-cookie';
import NotFound from './pages/Notfound';
import Authorized from "./pages/Authorized";
import SetPasswordPage from "./pages/SetPassword";
import Profile from "./pages/Profile";

const isAuthenticated = Cookies.get('token')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact render={()=>isAuthenticated ? <Premium />: <LoginForm/>}/>
          <Route path={["/premium"]} exact render={()=>isAuthenticated ? <Premium />: <Redirect to="/login"/>}/>
          <Route path={["/reader/:itemid"]} exact render={()=>isAuthenticated ? <Reader />: <Redirect to="/login"/>}/>
          <Route path={["/","/dashboard"]} exact render={()=>isAuthenticated ? <App />: <Redirect to="/login"/>}/>
          <Route path={["/set-password"]} exact render={()=><SetPasswordPage/>}/>
          <Route path={["/authorized"]} exact render={() => <Authorized/>}/>
          <Route path="/404" component={NotFound}/>
          <Route path="/profile" component={Profile}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
