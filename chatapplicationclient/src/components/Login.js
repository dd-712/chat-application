import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import './styles.css';


function Login(props) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit = async e => {
        e.preventDefault();
        let message=await props.loginUser({
        username,
        password
        });
        let error = "";
        if(message==="Username Or Password is not valid")
        {
            error=message;
        }
        if(error.length !== 0) {
            error="*"+error;
            document.getElementById("errorDiv").innerHTML = error;
        }
      }
    return (
        <div className="login-form form">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="content">
                <div className='error' id='errorDiv'> &nbsp; <br/> &nbsp;</div>
                    <div className="input-field">
                        <input type="text" onChange={e => setUserName(e.target.value)} placeholder="Username"  id="userName" />
                    </div>
                    <div className="input-field">
                        <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"  id="password" />
                    </div>
                </div>
                <div className="action">
                    <Link to="/signup" style={{ textDecoration: 'none' }}><button>Signup</button></Link>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;