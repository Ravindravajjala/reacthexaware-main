import React from 'react';
import {Router, Route, Link, Navigate ,Routes, BrowserRouter } from 'react-router-dom';
import LoginAdmin from './LoginAdmin';
import RegisterAdmin from './RegisterAdmin';
import Apps from './Apps';
import AddNewApp from './AddNewApp';
import EmailForm from './EmailForm';
import EmailForm1 from './EmailForm1';
// import AppReviews from './AppReviews';
import AdminLogout from './AdminLogout';
import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';
import UserLogout from './UserLogout';
import Navbar from './Navbar';
import Home from './Home';
import NavbarA from './NavbarA';
import AddNewReview1 from './AddNewReview1';
import Apps1 from './Apps1';
import Review from './Review';
import GetAppImages from './GetAppImages';
import AdminProfile from './AdminProfile';
import UserProfile from './UserProfile';
import HomeUser from './HomeUser';
import HomeAdmin from './HomeAdmin';
import AuthWrapper from './AuthWrapper';
import Error from './Error';

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthWrapper><Review /></AuthWrapper>}></Route>
      <Route path='*' element={<Error />}></Route>
      <Route path="/Navbar" element={<AuthWrapper><Navbar /></AuthWrapper>}></Route>
      <Route path="/Navbar" element={<AuthWrapper><Navbar /></AuthWrapper>}></Route>
      <Route path="/NavbarA" element={<AuthWrapper><NavbarA /></AuthWrapper>}></Route>
      <Route path="/HomeUser" element={<AuthWrapper><HomeUser /></AuthWrapper>}></Route>
      <Route path="/HomeAdmin" element={<AuthWrapper><HomeAdmin /></AuthWrapper>}></Route>
      <Route path="/Apps" element={<AuthWrapper><Apps /></AuthWrapper>}></Route>
      <Route path="/Home" element={<AuthWrapper><Home /></AuthWrapper>}></Route>
      <Route path="/Apps1" element={<AuthWrapper><Apps1 /></AuthWrapper>}></Route>
      <Route path="/AddNewApp" element={<AuthWrapper><AddNewApp /></AuthWrapper>}></Route>
      <Route path="/LoginAdmin" element={<AuthWrapper><LoginAdmin /></AuthWrapper>}></Route>
      <Route path="/LoginUser" element={<AuthWrapper><LoginUser /></AuthWrapper>}></Route>
      <Route path="/UserLogout" element={<AuthWrapper><UserLogout /></AuthWrapper>}></Route>
      <Route path="/AdminLogout" element={<AuthWrapper><AdminLogout /></AuthWrapper>}></Route>
      <Route path="/RegisterAdmin" element={<AuthWrapper><RegisterAdmin /></AuthWrapper>}></Route>
      <Route path="/RegisterUser" element={<AuthWrapper><RegisterUser /></AuthWrapper>}></Route>
      <Route path="/AddNewReview1" element={<AuthWrapper><AddNewReview1 /></AuthWrapper>}></Route>
      <Route path="/EmailForm" element={<AuthWrapper><EmailForm /></AuthWrapper>}></Route>
      <Route path="/EmailForm1" element={<AuthWrapper><EmailForm1 /></AuthWrapper>}></Route>
      {/* <Route path="/AppReviews" element={<AppReviews />}></Route> */}
      <Route path="/Review" element={<AuthWrapper><Review /></AuthWrapper>}></Route>
      <Route path="/GetAppImages" element={<AuthWrapper><GetAppImages/></AuthWrapper>}></Route>
      <Route path="/AdminProfile" element={<AuthWrapper><AdminProfile/></AuthWrapper>}></Route>
      <Route path="/UserProfile" element={<AuthWrapper><UserProfile/></AuthWrapper>}></Route>
      

    </Routes>
  </BrowserRouter>
  );
}

export default App;