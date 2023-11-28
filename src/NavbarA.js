//ADMIN NAVIGATIONBAR
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink,Link, Outlet } from "react-router-dom";
import Layout from "react";
import './NavbarA.css';
import Review from './Review';

function NavbarA() {
  return (
    
    <div>
      <nav className="navbar navbar-expand-lg bg-light"  >
        <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ fontWeight: 'bold', color: 'rgb(205, 125, 50)' }}>App Survey</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls='navigation'>
          </button>
          <ul className="navbar-nav ms-auto">
            <div className="navbar-nav">

            <Link to="/HomeAdmin" className="nav-link active" href="#" style={{ fontWeight: 'bold' }}>HomeAdmin</Link>
            <Link to="/AdminProfile" className="nav-link active" href="#" style={{ fontWeight: 'bold' }}>Profile</Link>
              <Link to="/Apps" className="nav-link active" aria-current="page" href="#" style={{ fontWeight: 'bold' }}>Apps</Link>
              <Link to="/AddNewApp" className="nav-link active" aria-current="page" href="#" style={{ fontWeight: 'bold' }}>RegisterApp</Link>
              <Link to="/EmailForm" className="nav-link active" href="#" style={{ fontWeight: 'bold'}}>Email</Link>
              <Link to="/RegisterAdmin" className="nav-link active" aria-current="page" href="#" style={{ fontWeight: 'bold' }}>RegisterAdmin</Link>
              <Link to="/Review" className="nav-link active" href="#" style={{ fontWeight: 'bold' }}>Logout</Link>
              
            </div>
          </ul>
        </div>
      </nav>
      

      <background img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuETpPyGuWEAegp-OOLTKXKHpRfIrkGLHLXw&usqp=CAU'
      style={{
        width: '1550px',   
        height: '700px',  
      }} />
       
      <Outlet />

      
    </div>
    
    
  );
}

export default NavbarA;
