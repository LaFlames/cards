import {setError, setIsAuth, setIsLoading} from "../Login/login-reducer";
import {Dispatch} from "redux";
import {loginAPI, passwordAPI} from "../../app/app-api";
import {setErrorMessageAC, setIsPasswordRecoverySucceededAC} from "../PasswordRecovery/passwordRecovery-reducer";



const initialState: EnterNewPassInitialStateType = {
    password: '',
    resetPasswordToken: ''
}

export const enterNewPasswordReducer = (state = initialState, action: EnterNewPassActionsType): EnterNewPassInitialStateType => {
    switch (action) {
        default:
            return state
    }
}


//types
export type EnterNewPassInitialStateType = {
    password: string;
    resetPasswordToken: string
}
export type EnterNewPassActionsType = ReturnType<typeof setNewPassword>

//action
export const setNewPassword = (newPassword: string) => ({ type: "PASSWORD-SET/SET_NEW_PASSWORD", newPassword } as const)

//thunk
export const setNewPasswordTC = (password: string, resetPasswordToken: string) => (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    passwordAPI.setNewPassword({password, resetPasswordToken})
        .then(res => {
            if (res.data) {
                dispatch(setIsPasswordRecoverySucceededAC(true))
                dispatch(setIsLoading(false))
            }
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setErrorMessageAC(error))
            dispatch(setIsLoading(false))
        })
}


