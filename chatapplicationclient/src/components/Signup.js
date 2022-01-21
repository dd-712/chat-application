import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Signup(props) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [firstname, setfirstName] = useState();
    const [lastname, setlastName] = useState();
    const [confPassword, setConfPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        let english = /^[A-Za-z0-9]*$/;
        let error = "";

        if (!english.test(username)) {
            error = "User Name should contain only english leter. "
        }
        if (password !== confPassword) {
            error += "Password and Confirm Password must be equal."
        }
        if (error.length === 0) {
            let message = await props.signupUser({ username, password, firstname, lastname });
            if (message === "Username Already Taken")
                error += "Username Already Taken";
        }
        if (props.errorMess.errMess !== "0") {
            error = props.errorMess.errMess;
        }
        if (error.length !== 0) {
            error = "*" + error;
            document.getElementById("errorDiv").innerHTML = error;
        }
    }

    return (
        <div className="login-form form">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="content">
                    <div className='error' id='errorDiv'> &nbsp; <br /> &nbsp;</div>
                    <div className="input-field">
                        <input type="text" onChange={e => setfirstName(e.target.value)} placeholder="First Name" autocomplete="off" id="firstName" />
                    </div>
                    <div className="input-field">
                        <input type="text" onChange={e => setlastName(e.target.value)} placeholder="Last Name" autocomplete="off" id="lastName" />
                    </div>
                    <div className="input-field">
                        <input type="text" onChange={e => setUserName(e.target.value)} placeholder="Username" autocomplete="off" id="userName" />
                    </div>
                    <div className="input-field">
                        <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" autocomplete="new-password" id="password" />
                    </div>
                    <div className="input-field">
                        <input type="password" onChange={e => setConfPassword(e.target.value)} placeholder="Confirm Password" autocomplete="new-password" id="confirmPass" />
                    </div>
                </div>
                <div className="action">
                    <Link to="/login" style={{ textDecoration: 'none' }}><button>Login</button></Link>
                    <button type='submit'>Signup</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;