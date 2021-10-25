import { Dispatch } from "redux"
import { authAPI } from "./password-api"

const initialState: PasswordRecoveryInitialStateType = {
    isLoading: false,
    errorMessage: '',
    isRequestSucceeded: false,
    email: '',
    from: "test-front-admin",
    message: `<div style="background-color: lime; padding: 15px"> password recovery link: <a href='http://localhost:3000/friday-project#/add-new-password/$token$'> link</a></div>`		
}

export const passwordRecoveryReducer = (state: PasswordRecoveryInitialStateType = initialState, action: ActionsType): PasswordRecoveryInitialStateType => {
    switch (action.type) {
        case 'PASSWORD-RECOVERY/EMAIL-IS-CHANGING': 
            return {...state, email: action.email}
        case 'PASSWORD-RECOVERY/IS-REQUEST-SUCCEEDED':
            return {...state, isRequestSucceeded: action.isRequestSucceeded}
        case 'PASSWORD-RECOVERY/ERROR-MESSAGE':
            return {...state, errorMessage: action.errorMessage}
        case 'PASSWORD-RECOVERY/IS-LOADING':
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}

//actions

export const setPasswordRecoveryAC = (email: string) =>
    ({type: 'PASSWORD-RECOVERY/EMAIL-IS-CHANGING', email} as const)
export const setIsPasswordRecoverySucceededAC = (isRequestSucceeded: boolean) =>
    ({type: 'PASSWORD-RECOVERY/IS-REQUEST-SUCCEEDED', isRequestSucceeded} as const)

export const setIsLoadingAC = (isLoading: boolean) =>
    ({type: 'PASSWORD-RECOVERY/IS-LOADING', isLoading} as const)
export const setErrorMessageAC = (errorMessage: string) =>
    ({type: 'PASSWORD-RECOVERY/ERROR-MESSAGE', errorMessage} as const)


//thunk

export const setEmailForPasswordTC = (data: PasswordRecoveryInitialStateType) => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC(true))
    authAPI.createNewPassword(data)
        .then(res => {
            dispatch(setIsPasswordRecoverySucceededAC(true))
            dispatch(setIsLoadingAC(false))
        })
        .catch((e) => {
            const error = e.response 
                ? e.response.data.error 
                : (e.message + ', more details in the console')

            dispatch(setErrorMessageAC(error))
            dispatch(setIsLoadingAC(false))
        })
}

//types

type ActionsType = 
    | ReturnType<typeof setPasswordRecoveryAC>
    | ReturnType<typeof setIsPasswordRecoverySucceededAC>
    | ReturnType<typeof setErrorMessageAC>
    | ReturnType<typeof setIsLoadingAC>

export type PasswordRecoveryInitialStateType = {
    isLoading: boolean
    errorMessage: string
    isRequestSucceeded: boolean
    email: string
    from: string
    message: string
}