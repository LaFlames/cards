import React, {useState} from 'react'
import {SuperInputText} from "../SuperComponents/SuperInputText/SuperInputText";
import {NavLink} from "react-router-dom";
import {PATH} from "../Routes";
import {SuperButton} from "../SuperComponents/SuperButton/SuperButton";
import {loginUserTC} from "../Login/login-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import './newPassword.scss'



export const EnterNewPassword = () => {

    let isLoading = useSelector<AppRootStateType, boolean>(state => state.login.isLoading)
    let errorMessage = useSelector<AppRootStateType, string>(state => state.login.errorMessage)
    let [newPassword, setNewPassword] = useState<string>("")

    const onChangePassword = (value: string) => {
        setNewPassword(value)
    }

    const setNewPasswordHandler = () => {

    }

    return (
        <div className="newPass">
            <h2 className="newPass_title">Create new password</h2>
            <div className="newPass_input">
                <SuperInputText onChangeText={onChangePassword} placeholder={"Password"} type="password"/>
            </div>
            <span className="newPass_descr">Create new password and we will send you further instructions to email</span>
            <div className="newPass_button">
                <SuperButton onClick={setNewPasswordHandler} disabled={isLoading}>Create new password</SuperButton>
            </div>
        </div>
    )
}

