
// HomeUser.js
import Navbar from "./Navbar";
import React from 'react';
import  ApplicationReview  from "./ApplicationReview"; // Keep this if it's a named export
import  AppSlider  from "./AppSlider";
 
const HomeUser = () => {
  return (
    <div>
      <Navbar />
      <nav>
        {/* Your navigation bar content */}
      </nav>
      <ApplicationReview />
      <AppSlider />
      {/* Add other content as needed */}
    </div>
  );
};
 
export default HomeUser;
 