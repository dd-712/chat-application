import * as React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Header(props) {
    return (
      <div className="header">
        <header className="d-flex  align-items-center justify-content-center justify-content-md-between  mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            <img src="https://cdn.dribbble.com/users/267404/screenshots/3713416/talkup.png" width="90" />
          </a>
  
          <div className="col-md-3 text-end btr">
            {!props.auth.isAuthenticated
              ?
              <span className="login"> 
                <Link to="/login" style={{ textDecoration: 'none',color:'white'}}>
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
                  <Link to="/signup" style={{ textDecoration: 'none',color:'white' }}>
                    Signup
                    {props.auth.isFetching ?
                      <span className="fa fa-spinner fa-pulse fa-fw"></span>
                      : null
                    }
                  </Link>
                </span>
              :
              <span>
                  <span className="logout" onClick={()=>props.logoutUser()}>
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