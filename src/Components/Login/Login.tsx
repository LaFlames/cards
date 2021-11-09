import React, {useEffect, useState} from 'react'
import {SuperInputText} from "../SuperComponents/SuperInputText/SuperInputText";
import {SuperButton} from "../SuperComponents/SuperButton/SuperButton";
import './login.scss'
import {NavLink, Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {loginUserTC, setError} from "./login-reducer";
import {ProfileInitialStateType} from "../Profile/profile-reducer";
import {CustomNavLink} from "../SuperComponents/CustomNavLink/CustomNavlink";


export const Login = () => {

    let dispatch = useDispatch()

    let isLoading = useSelector<AppRootStateType, boolean>(state => state.login.isLoading)
    let errorMessage = useSelector<AppRootStateType, string>(state => state.login.errorMessage)
    let userProfile = useSelector<AppRootStateType, ProfileInitialStateType>(state => state.profile)

    let [email, setEmail] = useState<string>("nya-admin@nya.nya")
    let [password, setPassword] = useState<string>("1qazxcvBG")

    useEffect(() => {
        return () => {
            dispatch(setError(''))
            setEmail('')
            setPassword('')
        }
    }, [])

    const onChangeEmail = (value: string) => {
        setEmail(value)
    }
    const onChangePassword = (value: string) => {
        setPassword(value)
    }
    const loginUserHandler = () => {
        dispatch(loginUserTC(email, password, true))
    }


    if (userProfile._id) {
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
                    <SuperInputText
                        onChangeText={onChangeEmail}
                        type="email"
                        value={email}
                    />
                </div>
            </div>
            <div className="login_passwordInput">
                <span className="login_passwordInput-title">Password</span>
                <div>
                    <SuperInputText
                        onChangeText={onChangePassword}
                        type="password"
                        value={password}
                    />
                </div>
            </div>
            <NavLink to={PATH.PASSWORD_RECOVERY} className="login_forgetPassword">Forgot password?</NavLink>
            <div className="login_button">
                <SuperButton onClick={loginUserHandler} disabled={isLoading}>Login</SuperButton>
            </div>
            <span className="login_dontHaveAcc">Don't have an account?</span>
            <div className="login_signUp">
                <CustomNavLink to={PATH.REGISTRATION} title={"Sign Up"}/>
            </div>
        </div>
    )
}

