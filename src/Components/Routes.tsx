import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {Test} from "./Test/Test";
import {Error404} from "./ErrorPage/Error404";
import {Login} from "./Login/Login";
import {Registration} from "./Registration/Registration";
import {Profile} from "./Profile/Profile";
import {PasswordRecovery} from "./PasswordRecovery/PasswordRecovery";
import {EnterNewPassword} from "./EnterNewPassword/EnterNewPassword";


export const PATH = {
    TEST: '/test',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password-recovery',
    ENTER_NEW_PASSWORD: '/add-new-password'
}

function Routes() {
    return (
        <div>
            <Switch>
                <Route path={'/'} exact render={() => <Redirect to={PATH.TEST}/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>

                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} render={() => <PasswordRecovery/>}/>
                <Route path={PATH.ENTER_NEW_PASSWORD} render={() => <EnterNewPassword/>}/>

                <Route render={() => <Error404/>}/>
            </Switch>
        </div>
    )
}

export default Routes