import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from './Home';

const AuthWrapper = ({children}) => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized]= useState(false);

    useEffect(() => {
        const AdminIsAuthorized = localStorage.getItem('IsLoggedIn') !== '400';
        const userIsAuthorized = localStorage.getItem('IsLoggedIn') !== '400';

        console.log(localStorage.getItem('IsLoggedIn'));

        if(userIsAuthorized || AdminIsAuthorized)
        {
            setIsAuthorized(true);
        }
        else{
            navigate('/Home');
        }
    },[navigate]);

    return isAuthorized? children: <Home />;
};
export default AuthWrapper;
 