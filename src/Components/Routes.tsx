import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {Test} from "./Test/Test";
import {Error404} from "./ErrorPage/Error404";
import {Login} from "./Login/Login";
import {Registration} from "./Registration/Registration";
import {Profile} from "./Profile/Profile";
import {PasswordRecovery} from "./PasswordRecovery/PasswordRecovery";
import {EnterNewPassword} from "./EnterNewPassword/EnterNewPassword";
import {Cards} from './Cards/Cards';
import { Packs } from './Packs/Packs';
import {LearnCards} from "./Cards/LearnCards";


export const PATH = {
    TEST: '/test',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password-recovery',
    ENTER_NEW_PASSWORD: '/add-new-password',
    PACKS: '/packs',
    CARDS: '/cards',
    LEARN_CARDS: '/learn-cards'
}

function Routes() {
    return (
        <div>
            <Switch>
                <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>

                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.PACKS} render={() => <Packs/>}/>
                <Route path={PATH.CARDS} render={() => <Cards/>}/>
                <Route path={PATH.LEARN_CARDS} render={() => <LearnCards/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} render={() => <PasswordRecovery/>}/>
                <Route path={`${PATH.ENTER_NEW_PASSWORD}/:token`} render={() => <EnterNewPassword/>}/>

                <Route render={() => <Error404/>}/>
            </Switch>
        </div>
    )
}

export default Routes