import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {loginReducer} from "../Components/Login/login-reducer";
import {profileReducer} from "../Components/Profile/profile-reducer";
import {registrationReducer} from "../Components/Registration/registration-reducer";
import {passwordRecoveryReducer} from "../Components/PasswordRecovery/passwordRecovery-reducer";
import {enterNewPasswordReducer} from "../Components/EnterNewPassword/enterNewPassword-reducer";




const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    passwordRecovery: passwordRecoveryReducer,
    enterNewPassword: enterNewPasswordReducer
})



export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;