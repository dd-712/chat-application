import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Signup(props) {

    return (
        <div class="login-form form">
            <form>
                <h1>Register</h1>
                <div class="content">
                    <div class="input-field">
                        <input type="text" placeholder="First Name" autocomplete="nope" id="firstName" />
                    </div>
                    <div class="input-field">
                        <input type="text" placeholder="Last Name" autocomplete="nope" id="lastName"/>
                    </div>
                    <div class="input-field">
                        <input type="text" placeholder="Username" autocomplete="nope" id="userName"/>
                    </div>
                    <div class="input-field">
                        <input type="password" placeholder="Password" autocomplete="new-password" id="password"/>
                    </div>
                    <div class="input-field">
                        <input type="password" placeholder="Confirm Password" autocomplete="new-password" id="confirmPass"/>
                    </div>
                </div>
                <div class="action">
                    <Link to="/login" style={{ textDecoration: 'none' }}><button>Login</button></Link>
                    <button>Signup</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;