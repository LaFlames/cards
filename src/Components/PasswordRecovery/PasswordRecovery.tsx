import React, { useEffect, useState } from 'react'
import s from './PasswordRecovery.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import { SuperButton } from '../SuperComponents/SuperButton/SuperButton'
import { SuperInputText } from '../SuperComponents/SuperInputText/SuperInputText'
import { PasswordRecoveryInitialStateType, setEmailForPasswordTC, setErrorMessageAC, setIsPasswordRecoverySucceededAC, setPasswordRecoveryAC } from './passwordRecovery-reducer'



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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPasswordRecoveryAC(e.currentTarget.value))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e.target)
        dispatch(setEmailForPasswordTC(state))
    }

    if (isRequestSucceeded) {
        return <div className={s.mainBlock}>
            <p>Success!<br/>click the link in the message in your email</p>
        </div>
    }

    return (
        <div className={s.mainBlock}>
            <div className={s.title}>
                <h1>Forgot your password?</h1>
            </div>

            <div>
            <div className={s.loading}>
                {isLoading ? <span>loading</span> : errorMessage}
            </div>
            <form onSubmit={handleSubmit}>
                    <div>
                        <SuperInputText type='email' placeholder='Email' onChange={onChange} value={email}/>
                    </div>
                    <div>
                        <p>Enter your email address and we will send you futher instructions</p>
                    </div>
                    <div>
                        <SuperButton disabled={isLoading}>Send Instructions</SuperButton>
                    </div>
                </form>
            </div>

            <div>
                <p>Did you remember your password?</p>
                <a href='/login'>Try logging in</a>
            </div>
        </div>
    )
}

