import React, { useEffect, useState } from 'react'
import s from './PasswordRecovery.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import { SuperButton } from '../SuperComponents/SuperButton/SuperButton'
import { SuperInputText } from '../SuperComponents/SuperInputText/SuperInputText'
import { PasswordRecoveryInitialStateType, setEmailForPasswordTC, setErrorMessageAC, setIsPasswordRecoverySucceededAC, setPasswordRecoveryAC } from './passwordRecovery-reducer'
import { NavLink } from 'react-router-dom'
import { eMailValidation } from '../../utilites/validator'
import { SuccessfulMessage } from './SuccesfulMessage'



export const PasswordRecovery = () => {

    const dispatch = useDispatch()
    const email = useSelector<AppRootStateType, string>(state => state.passwordRecovery.email)
    const state = useSelector<AppRootStateType, PasswordRecoveryInitialStateType>(state => state.passwordRecovery)
    const isRequestSucceeded = useSelector<AppRootStateType, boolean>(state => state.passwordRecovery.isRequestSucceeded)
    const errorMessage = useSelector<AppRootStateType, string>(state => state.passwordRecovery.errorMessage)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.passwordRecovery.isLoading)


    useEffect(() => {
        return () => {
            dispatch(setPasswordRecoveryAC(''))
            dispatch(setErrorMessageAC(''))
            dispatch(setIsPasswordRecoverySucceededAC(false))
        }
    }, [])

    const onChange = (value: string) => {
        dispatch(setPasswordRecoveryAC(value))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        dispatch(setErrorMessageAC(''))
        e.preventDefault()
        if (eMailValidation(email) || email.length === 0) {
            dispatch(setErrorMessageAC('Email address is not valide'))
        } else {
            dispatch(setEmailForPasswordTC(state))
        }
    }

    if (isRequestSucceeded) {
        return <SuccessfulMessage />
    }

    return (
        <div className={s.mainBlock}>
            {isLoading && <span className={s.loading}>loading</span>}
            <h2 className={s.title}>Forgot your password?</h2>
            {errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
            <form onSubmit={handleSubmit}>
                <div className={s.emailInput}>
                    <div>
                        <SuperInputText type='email' placeholder='Email' onChangeText={onChange} value={email}/>
                    </div>
                </div>
                <div className={s.info}> 
                    <span >Enter your email address and we will send you further instructions</span>
                </div>
                <div className={s.button}>
                    <SuperButton disabled={isLoading}>Send Instructions</SuperButton>
                </div>
            </form>
            
            <p className={s.secondInfo}>Did you remember your password?</p>
            <div className={s.loginRedirect}>
                <NavLink to='/login'>login</NavLink>
            </div>
        </div>
    )
}

