import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {SuperButton} from "../SuperComponents/SuperButton/SuperButton";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {logoutUserTC} from "../Login/login-reducer";
import {ProfileInitialStateType} from "./profile-reducer";

export const Profile = () => {

    let dispatch = useDispatch()

    let userProfile = useSelector<AppRootStateType, ProfileInitialStateType>(state => state.profile)
    let isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    let {name, email, avatar, ...restProps} = userProfile


    const logoutUserHandler = () => {
        dispatch(logoutUserTC())
    }


    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>
            <img src={avatar} alt="user-photo"/>
            <div>name: {name}</div>
            <div>email: {email}</div>
            <div>
                <SuperButton onClick={logoutUserHandler}>Log out</SuperButton>
            </div>
        </div>
    )
}

