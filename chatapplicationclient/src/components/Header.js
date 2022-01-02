import * as React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Header(props) {
    return (
      <div className="header">
        <header className="d-flex  align-items-center justify-content-md-between  mb-4">
          <a href="/" className="logo">
            <img src="https://cdn.dribbble.com/users/267404/screenshots/3713416/talkup.png" className='logoImg'/>  
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