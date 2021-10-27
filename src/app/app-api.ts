import axios from 'axios'
import {PasswordRecoveryInitialStateType} from "../Components/PasswordRecovery/passwordRecovery-reducer";
import {ProfileInitialStateType} from "../Components/Profile/profile-reducer";


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})
//baseURL: 'https://neko-back.herokuapp.com/2.0'


//api
export const loginAPI = {
    loginUser(data: LoginRequestDataType) {
        return instance.post<LoginResponseType>(`/auth/login`, data)
    },
    me(){
        return instance.post<LoginResponseType>( '/auth/me',{})
    },
    logoutUser() {
        return instance.delete<UnLoginResponseType>(`/auth/me`)
    },
}

export const passwordAPI = {
    createNewPassword(data: PasswordRecoveryInitialStateType) {
        return instance.post<PassRequestResponseType>('auth/forgot', data)
    }
}

export const regAPI = {
    regUser(data: RegRequestPayloadData_T) {
        return instance.post<RegResponse_T>(`/auth/register`, data)
    }
}






//loginApi types
type LoginRequestDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type LoginResponseType = ProfileInitialStateType
type UnLoginResponseType = {
    info: string
    error?: string
}

//passwordApi types
export type PassRequestResponseType = {
    info: string
    error: string
}

//registrationApi types
type RegRequestPayloadData_T = {
    email: string
    password: string
}
type RegResponse_T = {
    addedUser: {
        _id: string
        email: string
        rememberMe: boolean
        isAdmin: boolean
        name: string
        verified: boolean
        publicCardPacksCount: number
        created: string
        updated: string
        __v: number
    }
}





