import React, {useEffect} from 'react';
import {HashRouter} from 'react-router-dom'
import './App.css';
import Routes from "../Components/Routes";
import {Header} from "../Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {getUserDataTC, ProfileInitialStateType} from "../Components/Profile/profile-reducer";

export const App = () => {

    let dispatch = useDispatch()
    let isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    let userProfile = useSelector<AppRootStateType, ProfileInitialStateType>(state => state.profile)

    useEffect(() => {
        if (userProfile._id) {
            return
        }
        dispatch(getUserDataTC())
    }, [isAuth])

    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <Routes />
            </HashRouter>
        </div>
    );
}


