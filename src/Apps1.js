import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Navbar";
// Create an array of imported images

export function Apps1() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  const fetchApps = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/App/GetAllApps');
      const jsonData = await response.json();
      setApps(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <div>
      <Layout/>
      <br/><br/><br/><br/><br/>
      <h3 style={{ textAlign: "center" }}>We value your feedback</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Arrange items vertically
          alignItems: "center", // Center align items horizontally
        }}
      >
        <button
          onClick={() => navigate(`/AddNewReview1`)} // Navigate to AddNewReview page
          style={{
            backgroundColor: "blue", // Set button color to blue
            color: "white", // Set text color to white
            padding: "10px 20px", // Add padding for better appearance
            borderRadius: "5px", // Add rounded corners
            border: "none", // Remove default button border
            cursor: "pointer", // Change cursor on hover
            marginBottom: "20px", // Add margin to separate button from images
          }}
        >
          Add Review
        </button>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {apps.map((item, i) => (
            <div
              key={i}
              style={{
                border: "3px solid pink",
                backgroundColor: "lavender",
                color: "brown",
                width: "250px",
                height: "250px", // Adjusted height to accommodate the button
                margin: "10px",
                padding: "6px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column", // Add this to align content vertically
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={item.appUrl} // Use imported images based on index
                alt={item.appName}
                style={{
                  width: "95%",
                  height: "95%",
                  objectFit: "cover",
                }} // Set the image to cover the container
              />
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}

export default Apps1;
