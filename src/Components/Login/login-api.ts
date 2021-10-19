import axios from "axios";


export const loginAPI = {
    loginUser(data: LoginRequestDataType) {
        return axios.post<LoginResponseType>(`http://localhost:7542/2.0/auth/login`, data)
    },
    unLoginUser() {
        return axios.delete<UnLoginResponseType>(`http://localhost:7542/2.0/auth/me`)
    },
}

type LoginRequestDataType = {
    email: string
    password: string
    rememberMe: boolean
}
export type UserProfileType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
type LoginResponseType = UserProfileType
type UnLoginResponseType = {
    info: string
    error?: string
}
