import React, {useEffect} from 'react'
import './Registration.scss'
import {SuperButton} from "../SuperComponents/SuperButton/SuperButton";
import {Redirect} from 'react-router-dom';
import {PATH} from "../Routes";
import {useDispatch, useSelector} from "react-redux";
import {isRegMode, regUser_TC, updateConfirmedPwVal, updateEmailVal, updatePasswordVal} from "./registration-reducer";
import {SuperInputText} from "../SuperComponents/SuperInputText/SuperInputText";
import {AppRootStateType} from "../../app/store";
import {confirmPwValidation, eMailValidation, passWordValidation} from "../../utilites/validator";
import {CustomNavLink} from "../SuperComponents/CustomNavLink/CustomNavlink";

export const Registration = () => {

    const dispatch = useDispatch()

    const isLoading = useSelector<AppRootStateType, boolean>(state => state.registration.isLoading)
    const isReg = useSelector<AppRootStateType, boolean>(state => state.registration.isReg)
    const eMailValue = useSelector<AppRootStateType, string>(state => state.registration.email)
    const passWordValue = useSelector<AppRootStateType, string>(state => state.registration.password)
    const confirmedPassWordValue = useSelector<AppRootStateType, string>(state => state.registration.confirmedPass)

    useEffect(() => {
        return () => {
            dispatch(isRegMode(false))
        }
    }, [])

    const onChangeEmailVal = (value: string) => {
        dispatch(updateEmailVal(value))
    }
    const onChangePassWordVal = (value: string) => {
        dispatch(updatePasswordVal(value))
    }
    const onChangeConfirmedPwVal = (value: string) => {
        dispatch(updateConfirmedPwVal(value))
    }

    const regUserHandler = () => {
        if (!eMailValidation(eMailValue)
            && !passWordValidation(passWordValue)
            && !confirmPwValidation(confirmedPassWordValue)) {
            if (confirmedPassWordValue === passWordValue) {
                dispatch(regUser_TC(eMailValue, passWordValue))
            } else {
                alert('Password confirmation is incorrect')
            }
        } else {
            alert('Insert valid data')
        }
    }

    if (isReg) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={"register"}>
            {isLoading && <span className="register_loading">Loading...</span>}
            <h2 className={"register_title"}>Sign Up</h2>
            <div className={"register_emailInput"}>
                <span className={"register_emailInput-title"}>Email</span>
                <div>
                    <SuperInputText
                        onChangeText={onChangeEmailVal}
                        value={eMailValue}
                        type={'email'}
                    />
                </div>
                {eMailValidation(eMailValue) && <span className={"emailValidation"}>Insert valid email please</span>}
            </div>
            <div className={"register_passwordInput"}>
                <span className={"register_passwordInput-title"}>Password</span>
                <div>
                    <SuperInputText
                        onChangeText={onChangePassWordVal}
                        value={passWordValue}
                        type={'password'}/>
                </div>
                {passWordValidation(passWordValue) && <span className={"passwordValidation"}>Insert 5-15 symbols</span>}
            </div>
            <div className={"register_confirmPasswordInput"}>
                <span className={"register_confirmPasswordInput-title"}>Confirm Password</span>
                <div>
                    <SuperInputText
                        onChangeText={onChangeConfirmedPwVal}
                        value={confirmedPassWordValue}
                        type={'password'}/>
                </div>
                {confirmPwValidation(confirmedPassWordValue) &&
                <span className={"confirmPassValidation"}>Insert 5-15 symbols</span>}
            </div>
            <div className={"register_button"}>
                <SuperButton onClick={regUserHandler} disabled={isLoading}>Register</SuperButton>
            </div>
            <span className="register_haveAcc">Already have an account?</span>
            <div className="register_signIn">
                <CustomNavLink to={PATH.LOGIN} title={"Sign In"}/>
            </div>

        </div>
    )
}
