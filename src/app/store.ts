import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import {LoginActionsType, loginReducer} from "../Components/Login/login-reducer";
import {ActionsProfileType, profileReducer} from "../Components/Profile/profile-reducer";
import {ActionsRegisterType, registrationReducer} from "../Components/Registration/registration-reducer";
import {ActionsForgotType, passwordRecoveryReducer} from "../Components/PasswordRecovery/passwordRecovery-reducer";
import {enterNewPasswordReducer} from "../Components/EnterNewPassword/enterNewPassword-reducer";
import {ActionsPacksType, packsReducer} from "../Components/Packs/packs-reducer";
import {ActionsCardsTypes, cardsReducer} from "../Components/Cards/cards-reducer";
import { ActionsAppType } from './app-reducer';




const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    passwordRecovery: passwordRecoveryReducer,
    enterNewPassword: enterNewPasswordReducer,
    packs: packsReducer,
    cards: cardsReducer,
})



export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
    | LoginActionsType
    | ActionsProfileType
    | ActionsRegisterType
    | ActionsAppType
    | ActionsForgotType
    | ActionsPacksType
    | ActionsCardsTypes;

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, AppActionsType>;


// @ts-ignore
window.store = store;