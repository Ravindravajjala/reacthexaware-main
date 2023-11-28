
// AppSlider.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './AppSlider.css';
 
const AppSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
 
  return (
    <div className="app-slider-container">
      <Slider {...sliderSettings}>
        <div className="app-slide">
         
          <h1>Welcome to App Reviews</h1>
          <img src="https://t3.ftcdn.net/jpg/03/76/66/16/360_F_376661672_OUk4ws66zUuVkOsb9hnbC5Mcg1NjrCI6.jpg" alt="App 1" />
          <div>
            <h3>Share your thoughts. Your feedback is valuable and helps us improve!</h3>
           
          </div>
        </div>
        <div className="app-slide">
          {/* Add an image for the app */}
          <img src="https://st4.depositphotos.com/2903611/39349/i/450/depositphotos_393498608-stock-photo-young-man-touching-stars-screen.jpg" alt="App 2" />
          <div>
            <h3></h3>
            <h3>"Your app reviews are the stepping stones to greatness, guiding us as we build bridges toward an exceptional user experience."</h3>
          </div>
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};
 
export default AppSlider;
 