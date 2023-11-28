
 
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import React from "react";
import Navbar from "./Navbar";
 
import emailjs from '@emailjs/browser'
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};
 
function AddNewReview1() {
  const [appName, setAppName] = useState("");
  const [email, setEmail] = useState('');
  const [reviewText, setReviewText] = useState("");
  const [appId, setAppId] = useState("");
  const [appList, setAppList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isReviewAdded, setIsReviewAdded] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [rating, setRating] = useState(1);
  const stars = Array.from({ length: 5 });
  const [currentValue, setCurrentValue] = React.useState(0);
  const [hoverValue, setHoverValue] = React.useState(undefined);
  const readOnlyEmail = localStorage.getItem('loggedInEmail');
 
  useEffect(() => {
    fetchAppList();
    if (readOnlyEmail) {
      setEmail(readOnlyEmail);
    }
  }, []);
 
  const handleClick = (value) => {
    setRating(value);
    setCurrentValue(value);
  };
 
  const handleMouseOver = (value) => {
    setHoverValue(value);
  };
 
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
 
  const fetchAppList = () => {
    fetch("http://localhost:5001/api/App/GetAllApps", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAppList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  function handleSubmit(event) {
    event.preventDefault();
 
    console.log("appName:", appName);
    console.log("email:", email);
    console.log("reviewText:", reviewText);
    console.log("rating:", rating);
 
    if (!appName || !email || !reviewText || rating === 0) {
      setIsError(true);
      setIsInvalidEmail(false);
      return;
    }
 
    setIsError(false);
    setIsInvalidEmail(false);
 
    fetch("http://localhost:5001/api/Review/AddReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appId: appId,
        email: email,
        reviewText: reviewText,
        rating: rating,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsReviewAdded(true);
        setAppName("");
        setEmail("");
        setReviewText("");
        setRating(0);
       
      })
     
      .catch((error) => {
        console.error(error);
      });
 
      const serviceId = "service_ocwffrb";
      const templateId = "template_gx2xhg5";
      const publicKey = "idNz11mTh5c3YbHpV";
    console.log(email);
    const templateParams = {
      from_name :"TrustspotApp",
      to_email:email,
      to_name: "email",
      message:"Hii, Your reviews was sucessfully submitted",
    };
    emailjs.send(serviceId,templateId,templateParams,publicKey)
    .then(()=>{
      alert("Email sent successfully");
    })
    .catch((emailerror)=>{
alert("Error in sending email");
    });
  }
 
  return (
   
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Navbar/>
     
     
      <div className="form-container">
        <h2><br/>Review Details</h2>
        {isError && (
          <div className="alert alert-danger" role="alert">
            Please fill in all input fields.
          </div>
        )}
        {isReviewAdded && (
          <div className="alert alert-success" role="alert">
            Your review has been added successfully. Thank you for your valuable feedback!
          </div>
        )}
 
        <form  onSubmit={handleSubmit}>
          <label htmlFor="appName">Select the App Name</label>
          <select
            className={"col-xs-4"}
            name="appName"
            value={appName}
            onChange={(event) => {
              setAppName(event.target.value);
              const selectedApp = appList.find((app) => app.appName === event.target.value);
              if (selectedApp) {
                setAppId(selectedApp.appId);
              }
            }}
          >
            <option value="">Select an app...</option>
            {appList.map((app) => (
              <option key={app.appId} value={app.appName}>
                {app.appName}
              </option>
            ))}
          </select>
          <br />
          <br />
          <label htmlFor="email">Enter the Email</label>
          <input
            type="text"
            className={"col-xs-4"}
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            readOnly={readOnlyEmail !== null}
          />
          {readOnlyEmail && <span> </span>}
     
          <br />
          <br />
          <div>
            <label htmlFor="rating">Rating (1-5 stars):</label>
            <br />
            <div>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    style={{ marginRight: 10, cursor: "pointer" }}
                    color={(hoverValue || currentValue) >= index + 1 ? colors.orange : colors.grey}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })}
            </div>
          </div>
          <br />
          <div>
            <label htmlFor="reviewText">Enter the Review</label>
            <br />
            <textarea
              className={"col-xs-4"}
              placeholder="Enter review"
              name="reviewText"
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
              rows={4}
              cols={40}
            ></textarea>
          </div>
       
 
          <button type="submit" className="btn btn-success">
            Add new Review
          </button>
        </form>
        <img
          src="https://interflext.com/wp-content/uploads/2021/10/Top-5-Mobile-App-Development-Trends-Set-to-Rule-2020.png"
          alt=""
          style={{
            width: "300px",
            height: "750px",
            position: "absolute",
            top: "0",
            right: "0",
            transform: "translateY(0)",
            marginTop: "80px",
          }}
        />
      </div>
    </div>
  );
}
 
export default AddNewReview1;
 