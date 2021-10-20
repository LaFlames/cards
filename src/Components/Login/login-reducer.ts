import { Dispatch } from "redux";
import {loginAPI, UserProfileType} from "./login-api";


const initialState: LoginInitialStateType = {
    isLoading: false,
    rememberMe: false,
    isAuth: false,
    userProfile: null,
    errorMessage: ""
}

export const loginReducer = (state = initialState, action: ActionsType): LoginInitialStateType => {
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
        case "LOGIN/SET-USER-PROFILE": {
            return {
                ...state, userProfile: action.userProfile
            }
        }
        default:
            return state
    }
}


//types
type ActionsType =
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setError>
    | ReturnType<typeof setIsAuth>


export type LoginInitialStateType = {
    isLoading: boolean
    rememberMe: boolean
    errorMessage: string
    isAuth: boolean
    userProfile: UserProfileType | null
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
export const setUserProfile = (userProfile: UserProfileType | null) => {
    return {type: 'LOGIN/SET-USER-PROFILE', userProfile} as const
}



//thunks
export const loginUserTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    dispatch(setError(""))
    loginAPI.loginUser({email, password, rememberMe})
        .then(res => {
            if (res.data) {
                dispatch(setUserProfile(res.data))
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
export const unLoginUserTC = () => (dispatch: Dispatch) => {
    dispatch(setIsAuth(false))
    /*loginAPI.unLoginUser()
        .then(res => {
            if (res.data) {
                dispatch(setUserProfile(null))
                dispatch(setIsAuth(false))
            }
        })*/
}