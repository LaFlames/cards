import React, {useEffect, useState} from 'react'
import {SuperInputText} from "../SuperComponents/SuperInputText/SuperInputText";
import {NavLink, Redirect, useParams} from "react-router-dom";
import {PATH} from "../Routes";
import {SuperButton} from "../SuperComponents/SuperButton/SuperButton";
import {loginUserTC} from "../Login/login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import './newPassword.scss'
import {setNewPasswordTC} from "./enterNewPassword-reducer";
import {SuccessfulMessage} from "../PasswordRecovery/SuccesfulMessage/SuccesfulMessage";
import {passWordValidation} from "../../utilites/validator";
import {setErrorMessageAC} from "../PasswordRecovery/passwordRecovery-reducer";



export const EnterNewPassword = () => {

    let dispatch = useDispatch()

    let isLoading = useSelector<AppRootStateType, boolean>(state => state.login.isLoading)
    let errorMessage = useSelector<AppRootStateType, string>(state => state.passwordRecovery.errorMessage)
    let isRequestSucceeded = useSelector<AppRootStateType, boolean>(state => state.passwordRecovery.isRequestSucceeded)

    let {token}: {token: string} = useParams()
    let [newPassword, setNewPassword] = useState<string>("")

    useEffect(() => {
        return () => {
            dispatch(setErrorMessageAC(''))
        }
    })

    const onChangePassword = (value: string) => {
        setNewPassword(value)
    }
    const setNewPasswordHandler = () => {
        dispatch(setNewPasswordTC(newPassword, token))
    }

    if (isRequestSucceeded) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className="newPass">
            <h2 className="newPass_title">Create new password</h2>
            <div className="newPass_input">
                <SuperInputText onChangeText={onChangePassword} placeholder={"Password"} type="password"/>
            </div>
            {passWordValidation(newPassword) && <span className={"passwordError"}>Insert more than 7 symbols</span>}
            <span className="newPass_descr">Create new password and we will send you further instructions to email</span>
            {isLoading && <span className="newPass_loading">Loading...</span>}
            {errorMessage && <span className="newPass_error">{errorMessage}</span>}
            <div className="newPass_button">
                <SuperButton onClick={setNewPasswordHandler} disabled={isLoading}>Create new password</SuperButton>
            </div>
        </div>
    )
}

