import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {UserProfileType} from "../Login/login-api";
import {SuperButton} from "../SuperComponents/SuperButton/SuperButton";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {unLoginUserTC} from "../Login/login-reducer";



export const Profile = () => {

    let dispatch = useDispatch()

    let userProfile = useSelector<AppRootStateType, UserProfileType | null>(state => state.login.userProfile)
    let isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    let {name, email, avatar, ...restProps} = {...userProfile}


    const unLoginUseOnClick = () => {
        dispatch(unLoginUserTC())
    }


    if (isAuth === false) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        userProfile
            ?
                <div>
                    <img src={avatar} alt="user-photo"/>
                    <div>name: {name}</div>
                    <div>email: {email}</div>
                    <div>
                        <SuperButton onClick={unLoginUseOnClick}>Log out</SuperButton>
                    </div>
                </div>
            :
                <div></div>
    )
}

