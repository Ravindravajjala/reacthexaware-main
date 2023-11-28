
import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarA from "./NavbarA";
 import Layout from "./NavbarA";

export function AddNewApp() {
  const [appName, setAppName] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAppNameRegistered, setIsAppNameRegistered] = useState(false);
  const [isFormEmpty, setIsFormEmpty] = useState(false);
 
  function handleSubmit(event) {
    event.preventDefault();
    setIsAppNameRegistered(false);
    setIsFormEmpty(false);
 
    const lowerCaseAppName = appName.toLowerCase();
 
    if (lowerCaseAppName.trim() === "" || appDescription.trim() === "") {
      setIsFormEmpty(true);
      return;
    }
 
    fetch(`http://localhost:5001/api/App/GetAllApps`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          data.length > 0 &&
          data.some(
            (app) => app.appName.toLowerCase() === lowerCaseAppName
          )
        ) {
          setIsAppNameRegistered(true);
        } else {
          fetch("http://localhost:5001/api/App/AddApp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              appName: appName,
              appDescription: appDescription,
              appUrl: imageUrl,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setAppName("");
              setAppDescription("");
              setImageUrl("");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        console.error(error);
      });
  }
 
  function renderAlert() {
    if (isAppNameRegistered) {
      return (
        <div className="alert alert-danger" role="alert">
          {appName} is already registered.
        </div>
      );
    }
    if (isFormEmpty) {
      return (
        <div className="alert alert-danger" role="alert">
          Please fill in both AppName and AppDescription.
        </div>
      );
    }
    return null;
  }
 
  return (
    <div>
    
      <Layout /> 
      <div className="container text-center mt-5">
      <h2>App Details</h2>
      {renderAlert()}
      <form onSubmit={handleSubmit}>
        <label htmlFor="appName">Enter the App Name</label>
        <span style={{ marginLeft: "45px" }}></span>
        <input
          type="text"
          className={"col-xs-4"}
          placeholder="Enter appName"
          name="appName"
          value={appName}
          onChange={(event) => setAppName(event.target.value)}
        />
        <br />
        <br />
        <label htmlFor="appDescription">Enter the App Description</label>
        <span style={{ marginLeft: "15px" }}></span>
        <input
          type="text"
          className={"col-xs-4"}
          placeholder="Enter appDescription"
          name="appDescription"
          value={appDescription}
          onChange={(event) => setAppDescription(event.target.value)}
        />
        <br />
        <br />
        <label htmlFor="imageUrl">Enter the Image URL</label>
        <span style={{ marginLeft: "15px" }}></span>
        <input
          type="text"
          className={"col-xs-4"}
          placeholder="Enter imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />
        <br />
        <br />
        <button type="submit" className="btn btn-success">
          Register new App
        </button>
      </form>
     
      {/* Display the image */}
      {imageUrl && (
        <div>
          <h3>Preview Image</h3>
          <img src={imageUrl} alt="App Preview" style={{ maxWidth: "100%" }} />
        </div>
      )}
      </div>
    </div>
  );
}
 
export default AddNewApp;