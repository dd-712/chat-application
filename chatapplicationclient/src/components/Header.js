import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import jwt from 'jwt-decode';
import logo from './logo/ChatApp.png';
import './styles.css';

function Header(props) {
  const [user, setUser] = useState(JSON.stringify(localStorage.getItem('token')));
  const location = useLocation();
  const logout = () => {
    props.logoutUser();
    setUser(null);
  }

  useEffect(() => {
    const token = user;
    if (token !== "null") {
      const decodedToken = jwt(token)
      if (decodedToken.exp * 1000 < new Date().getTime())
        logout();
    }
    setUser(JSON.stringify(localStorage.getItem('token')));
  }, [location])
  return (
    <div className="header">
      <header className=" align-items-center justify-content-md-between  mb-4">
        <a href="/">
          <img src={logo} className='logoImg' alt='logo' />
        </a>

        <div className="col-md-3 text-end btr buttons">
          {!props.auth.isAuthenticated
            ?
            <span className="login">
              <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                Login
                {props.auth.isFetching ?
                  <span className="fa fa-spinner fa-pulse fa-fw"></span>
                  : null
                }
              </Link>
            </span>
            :
            <span>
              <span className="usname">{props.auth.user.username}</span>
            </span>
          }
          {!props.auth.isAuthenticated
            ?

            <span className="signup">
              <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
                Signup
                {props.auth.isFetching ?
                  <span className="fa fa-spinner fa-pulse fa-fw"></span>
                  : null
                }
              </Link>
            </span>
            :
            <span>
              <span className="logout" onClick={() => props.logoutUser()}>
                Logout
                {props.auth.isFetching ?
                  <span className="fa fa-spinner fa-pulse fa-fw"></span>
                  : null
                }
              </span>
            </span>
          }
        </div>
      </header>
    </div>
  );
}

export default Header;