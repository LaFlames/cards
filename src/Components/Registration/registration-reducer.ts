import { Dispatch } from "redux"
import {regAPI} from "./regAPI";

export type RegistrationInitialStateType = {
    isLoading: boolean
    email: string
    password: string
    confirmedPass: string
}

const initialState: RegistrationInitialStateType = {
    isLoading: false,
    email: '',
    password: '',
    confirmedPass: '',
}

export const registrationReducer = (state = initialState, action: ActionsType): RegistrationInitialStateType => {
    switch (action.type) {
        case 'REG/SET-EMAIL': {
            return {...state, email: action.emailText}
        }
        case 'REG/SET-PASSWORD': {
            return {...state, password: action.pwText}
        }
        case 'REG/CONFIRM-PW': {
            return {...state, confirmedPass: action.confirmedPass}
        }
        case 'REG/SET-LOADING-MODE': {
            return {...state, isLoading: action.isLoading}
        }
        default: return state
    }
}

export type LoadingMode_T = ReturnType<typeof loadingMode>
export const loadingMode = (isLoading: boolean) => {
    return {type: 'REG/SET-LOADING-MODE', isLoading} as const
}

export type UpdateConfirmedPwVal_T = ReturnType<typeof updateConfirmedPwVal>
export const updateConfirmedPwVal = (confirmedPass: string) => {
    return {type: 'REG/CONFIRM-PW', confirmedPass} as const
}

export type UpdateEmailVal_T = ReturnType<typeof updateEmailVal>
export const updateEmailVal = (emailText: string) => {
    return {type: 'REG/SET-EMAIL', emailText} as const
}

export type UpdatePassword_T = ReturnType<typeof updatePasswordVal>
export const updatePasswordVal = (pwText: string) => {
    return {type: 'REG/SET-PASSWORD', pwText} as const
}

type ActionsType = UpdateEmailVal_T
    | UpdatePassword_T
    | UpdateConfirmedPwVal_T
    | LoadingMode_T


export const regUser_TC = (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch(loadingMode(true))
    regAPI.regUser(email, password)
        .then(res => {
            console.log(res)
            dispatch(loadingMode(false))
        })
        .catch(err => {
            console.log(err)
            dispatch(loadingMode(false))
        })
}



