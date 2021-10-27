import { Dispatch } from "redux";
import {loginAPI} from "../../app/app-api";



const loginInitialState: LoginInitialStateType = {
    isLoading: false,
    isAuth: false,
    errorMessage: ""
}

export const loginReducer = (state = loginInitialState, action: LoginActionsType): LoginInitialStateType => {
    switch (action.type) {
        case "LOGIN/SET-IS-LOADING": {
            return {
                ...state, isLoading: action.isLoading
            }
        }
        case "LOGIN/SET-ERROR": {
            return {
                ...state, errorMessage: action.error
            }
        }
        case "LOGIN/SET-IS-AUTH": {
            return {
                ...state, isAuth: action.isAuth
            }
        }
        default:
            return state
    }
}


//types
export type LoginActionsType =
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof setError>
    | ReturnType<typeof setIsAuth>


export type LoginInitialStateType = {
    isLoading: boolean
    errorMessage: string
    isAuth: boolean
}


//actions
export const setError = (error: string) => {
    return {type: 'LOGIN/SET-ERROR', error} as const
}
export const setIsLoading = (isLoading: boolean) => {
    return {type: 'LOGIN/SET-IS-LOADING', isLoading} as const
}
export const setIsAuth = (isAuth: boolean) => {
    return {type: 'LOGIN/SET-IS-AUTH', isAuth} as const
}



//thunks
export const loginUserTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    dispatch(setError(""))
    loginAPI.loginUser({email, password, rememberMe})
        .then(res => {
            if (res.data._id) {
                dispatch(setIsAuth(true))
                dispatch(setIsLoading(false))
            }
        })
        .catch(err => {
            if (err.response) {
                dispatch(setError(err.response.data.error))
                dispatch(setIsLoading(false))
            }
        })
}
export const logoutUserTC = () => (dispatch: Dispatch) => {
    loginAPI.logoutUser()
        .then(res => {
            if (res.data) {
                dispatch(setIsAuth(false))
            }
        })
}