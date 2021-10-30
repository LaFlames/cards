import axios from "axios";

// zazazaza@lala.lala
// lalalalalala

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
})

export const regAPI = {
    regUser(data: RegRequestPayloadData_T) {
        return instance.post<RegResponse_T>(`/auth/register`, data)
    }
}

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

// http://localhost:7542/2.0/
// https://neko-back.herokuapp.com/2.0

// data already exist
// nya-admin@nya.nya
// 1qazxcvBG