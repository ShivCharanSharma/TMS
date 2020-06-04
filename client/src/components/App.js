import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import DetailPackagePage from './views/DetailPackagePage/DetailPackagePage';
import CartPage from './views/CartPage/CartPage';
import BookingHistory from './views/BookingHistory/BookingHistory';
import ContactPage from './views/ContactPage/ContactPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{paddingTop:'50px',  minHeight: 'calc(100vh - 50px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
	  <Route exact path="/product/:packageId" component={Auth(DetailPackagePage, null)} />
	  <Route exact path="/user/cart/" component={Auth(CartPage, true)} />
	  <Route exact path="/bookinghistory" component={Auth(BookingHistory,true)} />}
	  <Route exact path="/contact" component={Auth(ContactPage,null)} />*/}

        </Switch>
      </div>
      <ContactPage />
    </Suspense>
  );
}

export default App;
