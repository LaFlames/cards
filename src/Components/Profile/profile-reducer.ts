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
        default:
            return state
    }
}

//actions
const setUserDataAC = (userData: ProfileInitialStateType) => ({type: 'LOGIN/SET-USER-DATA', userData} as const)


//thunk
export const getUserDataTC = () => (dispatch: Dispatch) => {
    loginAPI.me().then((res) => {
        dispatch(setUserDataAC(res.data))
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
type ActionsType = ReturnType<typeof setUserDataAC>
