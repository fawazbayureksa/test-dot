import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Login = () => {


    return (
        <div >
            <form className="form">
                <span className="input-span">
                    <label className="label">Email</label>
                    <input type="email" name="email" id="email" /></span>
                <span className="input-span">
                    <label className="label">Password</label>
                    <input type="password" name="password" id="password" /></span>
                <button className="submit" type='button' value="Log in" />
                <span className="span">Don't have an account? <a href="#">Sign up</a></span>
            </form>
        </div>
    );
}

export default Login;
