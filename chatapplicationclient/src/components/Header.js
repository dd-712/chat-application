import * as React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Header() {
    return (
      <div class="">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            <img src="https://cdn.dribbble.com/users/267404/screenshots/3713416/talkup.png" width="90" />
          </a>
  
          <div class="col-md-3 text-end btr">
            <button type="button" class=" btn  me-2">
              <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
            </button>
            <button type="button" class=" btn">
              <Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link>
            </button>
          </div>
        </header>
      </div>
    );
  }
  
  export default Header;