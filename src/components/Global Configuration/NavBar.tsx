import { Outlet, Link } from 'react-router-dom';

export default function Navbar() {
return (
    <nav className="navbar navbar-custom">
    <div className="container-fluid">
     <Link 
        style={{ color: '#FFF', textDecoration: 'none', fontFamily: 'Poppins', fontSize: 20 }} 
        to='/'>
           {/* <img src='./LOGOS.png' alt="Logo" className="navbar-logo" /> */}
          <span className='navbar-title'>POS SALES MANAGEMENT SYSTEM</span>
      </Link>
    </div>
  </nav>
);
}