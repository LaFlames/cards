import React, {useEffect} from 'react'
import './Registration.scss'
import {SuperButton} from "../SuperComponents/SuperButton/SuperButton";
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from "../Routes";
import {useDispatch, useSelector} from "react-redux";
import {isRegMode, regUser_TC, updateConfirmedPwVal, updateEmailVal, updatePasswordVal} from "./registration-reducer";
import {SuperInputText} from "../SuperComponents/SuperInputText/SuperInputText";
import {AppRootStateType} from "../../app/store";
import {confirmPwValidation, eMailValidation, passWordValidation} from "./validator";

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
        <div>
            {isLoading && <h1>Loading...</h1>}
            <div className={"registrationCardContainer"}>
                <div className={"cardWrapper"}>
                    <h2>Registration</h2>
                    <div>
                        TEAM 151021
                    </div>
                    <div className={"dataContainer"}>
                        <div className={"dataInputBlock"}>
                            <span>Email</span>
                            <SuperInputText onChangeText={onChangeEmailVal} value={eMailValue}/>
                            {eMailValidation(eMailValue) &&
                            <div className={"validatorStyles"}>Insert valid Email please...</div>}
                        </div>
                        <div className={"dataInputBlock"}>
                            <span>Password</span>
                            <SuperInputText onChangeText={onChangePassWordVal} value={passWordValue} type={'password'}/>
                            {passWordValidation(passWordValue) &&
                            <div className={"validatorStyles"}>Insert 5-15 symbols</div>}
                        </div>
                        <div className={"dataInputBlock"}>
                            <span>Confirm Password</span>
                            <SuperInputText onChangeText={onChangeConfirmedPwVal} value={confirmedPassWordValue} type={'password'}/>
                            {confirmPwValidation(confirmedPassWordValue) &&
                            <div className={"validatorStyles"}>Insert 5-15 symbols</div>}
                        </div>
                    </div>
                    <div className={"buttonContainer"}>
                        <SuperButton onClick={regUserHandler} disabled={isLoading}>{isLoading ? 'Loading...' : 'Reg'}</SuperButton>
                        {/*<SuperButton onClick={regUserHandler}>Sign up</SuperButton>*/}
                    </div>
                    <NavLink to={PATH.LOGIN}>Login</NavLink>
                </div>
            </div>
        </div>
    )
}
