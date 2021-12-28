import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Signup(props) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [firstname, setfirstName] = useState();
    const [lastname, setlastName] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        props.signupUser({username,password,firstname,lastname});
        
      }

    return (
        <div class="login-form form">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div class="content">
                    <div class="input-field">
                        <input type="text" onChange={e => setfirstName(e.target.value)} placeholder="First Name" autocomplete="nope" id="firstName" />
                    </div>
                    <div class="input-field">
                        <input type="text" onChange={e => setlastName(e.target.value)} placeholder="Last Name" autocomplete="nope" id="lastName"/>
                    </div>
                    <div class="input-field">
                        <input type="text" onChange={e => setUserName(e.target.value)} placeholder="Username" autocomplete="nope" id="userName"/>
                    </div>
                    <div class="input-field">
                        <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" autocomplete="new-password" id="password"/>
                    </div>
                    <div class="input-field">
                        <input type="password" placeholder="Confirm Password" autocomplete="new-password" id="confirmPass"/>
                    </div>
                </div>
                <div class="action">
                    <Link to="/login" style={{ textDecoration: 'none' }}><button>Login</button></Link>
                    <button type='submit'>Signup</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;