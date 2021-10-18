import axios from "axios";
// http://localhost:7542/2.0/
// https://neko-back.herokuapp.com/2.0
const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
})
// => /auth/register
export const regAPI = {
    regUser(email: string, password: string) {
        return instance.post(`/auth/register`, {email, password})
    }
}


// nya-admin@nya.nya
// 1qazxcvBG