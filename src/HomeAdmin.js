
import NavbarA from "./NavbarA";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Layout from "./NavbarA";
 
function HomeAdmin() {
  return (
    <div>
    <Layout />
    <div style={{ display: 'flex', marginTop: '80px' }}>
      {/* Left Section with Image */}
      
      <div
        style={{
          flex: '1',
          padding: '20px',
          backgroundColor: 'white', // Light Blue
        }}
      >
        
        <img
          src="https://media.istockphoto.com/id/1388936211/photo/text-on-notepad-with-reading-glasses-pen-and-alarm-clock-on-yellow-background-we-value-your.jpg?s=612x612&w=0&k=20&c=JmGmkJsK7azc4Myp8XuaHhmng67SHxlvGxO9wOMmJEQ="
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '600px',
          }}
          alt="Home Image"
        />
      </div>
 
      {/* Right Section with App Reviews */}
      <div
        style={{
          flex: '1',
          textAlign: 'center',
          padding: '20px',
          backgroundColor: 'white', // Light Pink
        }}
      >
        <h2>TRUSTSPOT APPSURVEY</h2>
        <br></br>
     
        {/* Review 1 Card */}
        <div className="card mb-4" style={{ backgroundColor: 'white', marginBottom: '30px' }}>
          <div className="card-body">
            <h3 className="card-text">"Every app review is a story, and within each narrative lies the opportunity to create a better, more engaging chapter."</h3>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
       
        {/* Review 2 Card */}
        <div className="card" style={{ backgroundColor: 'white' }}>
 
          <div className="card-body">
            <h2 className="card-text"> "In the symphony of technology, your app reviews are the notes that shape the melody of progress and innovation."</h2>
          </div>
        </div>
 
        {/* Add more cards as needed */}
      </div>
    </div>
    </div>
  );
}
 
export default HomeAdmin;
 