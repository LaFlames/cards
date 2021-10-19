import React from 'react'
import {SuperInputText} from "../SuperComponents/SuperInputText/SuperInputText";
import {SuperButton} from "../SuperComponents/SuperButton/SuperButton";
import './login.scss'
import {NavLink, Redirect} from "react-router-dom";
import {PATH} from "../Routes";



export const Login = () => {
    return (
        <div className="login">
            <h2 className="login_title">Sign In</h2>
            <div className="login_emailInput">
                <span className="login_emailInput-title">Email</span>
                <div>
                    <SuperInputText type="email"/>
                </div>
            </div>
            <div className="login_passwordInput">
                <span className="login_passwordInput-title">Password</span>
                <div>
                    <SuperInputText type="password"/>
                </div>
            </div>
            <NavLink to={PATH.ENTER_NEW_PASSWORD} className="login_forgetPassword">Forgot password</NavLink>
            <div className="login_button">
                <SuperButton>Login</SuperButton>
            </div>
            <div className="login_dontHaveAcc">Don't have an account?</div>
            <div className="login_signUp">
                <NavLink to={PATH.REGISTRATION} className={"header_linkList-item"}>Sign Up</NavLink>
            </div>
        </div>
    )
}

