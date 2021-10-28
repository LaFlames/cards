import {Dispatch} from "redux";
import {loginAPI} from "../../app/app-api";



export const initialState: ProfileInitialStateType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: ''
}

export const profileReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'LOGIN/SET-USER-DATA': {
            return {
                ...state,
                ...action.userData
            }
        }
        case "LOGIN/UNSET-USER-DATA": {
            return {
                ...state,
                _id: '',
                email: '',
                name: '',
                avatar: '',
                publicCardPacksCount: 0,
                created: '',
                updated: '',
                isAdmin: false,
                verified: false,
                rememberMe: false,
                error: ''
            }
        }
        default:
            return state
    }
}

//actions
export const setUserData = (userData: ProfileInitialStateType) => ({type: 'LOGIN/SET-USER-DATA', userData} as const)
export const unsetUserData = () => ({type: 'LOGIN/UNSET-USER-DATA'} as const)


//thunk
export const getUserDataTC = () => (dispatch: Dispatch) => {
    loginAPI.me()
        .then((res) => {
            if (res.data._id) {
                dispatch(setUserData(res.data))
            }
        })
}

//types
export type ProfileInitialStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}
type ActionsType = ReturnType<typeof setUserData> | ReturnType<typeof unsetUserData>
