import React from 'react';
import error from "../src/Images/error.png";


const Error = () => {
    return(
        <div>
            <h1>Oops! Page Not Found.</h1>
            <p>We're sorry, but the page you requested could not be found.</p>
            <img src={error} alt="Error 404" 
            style={{width:"100%"}} />
        </div>
    )
}

export default Error;