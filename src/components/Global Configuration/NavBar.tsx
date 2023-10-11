import { Outlet, Link } from 'react-router-dom';

export default function Navbar() {
return (
    <nav className="navbar navbar-custom">
    <div className="container-fluid">
     <Link 
        style={{ color: '#FFF', textDecoration: 'none', fontFamily: 'Poppins', fontSize: 20 }} 
        to='/cashier-main'>
          <li className='navbar-title'>POS SALES MANAGEMENT SYSTEM</li>
      </Link>
    </div>
  </nav>
);
}