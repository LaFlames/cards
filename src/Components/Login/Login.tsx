import React, {useState} from 'react'
import {SuperInputText} from "../SuperComponents/SuperInputText/SuperInputText";
import {SuperButton} from "../SuperComponents/SuperButton/SuperButton";
import './login.scss'
import {NavLink, Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {loginUserTC} from "./login-reducer";


export const Login = () => {

    let dispatch = useDispatch()

    let isLoading = useSelector<AppRootStateType, boolean>(state => state.login.isLoading)
    let isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    let errorMessage = useSelector<AppRootStateType, string>(state => state.login.errorMessage)

    let [email, setEmail] = useState<string>("")
    let [password, setPassword] = useState<string>("")

    const onChangeEmail = (value: string) => {
        setEmail(value)
    }
    const onChangePassword = (value: string) => {
        setPassword(value)
    }

    const loginUserOnClick = () => {
        dispatch(loginUserTC(email, password, false))
    }


    if (isAuth) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div className="login">
            {isLoading && <span className="login_loading">Loading...</span>}
            <h2 className="login_title">Sign In</h2>
            {errorMessage && <span className="login_errorMessage">{errorMessage}</span>}
            <div className="login_emailInput">
                <span className="login_emailInput-title">Email</span>
                <div>
                    <SuperInputText onChangeText={onChangeEmail} type="email"/>
                </div>
            </div>
            <div className="login_passwordInput">
                <span className="login_passwordInput-title">Password</span>
                <div>
                    <SuperInputText onChangeText={onChangePassword} type="password"/>
                </div>
            </div>
            <NavLink to={PATH.ENTER_NEW_PASSWORD} className="login_forgetPassword">Forgot password</NavLink>
            <div className="login_button">
                <SuperButton onClick={loginUserOnClick} disabled={isLoading}>Login</SuperButton>
            </div>
            <div className="login_dontHaveAcc">Don't have an account?</div>
            <div className="login_signUp">
                <NavLink to={PATH.REGISTRATION} className={"header_linkList-item"}>Sign Up</NavLink>
            </div>
        </div>
    )
}

