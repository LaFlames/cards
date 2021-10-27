


const initialState: LoginInitialStateType = {
    isLoading: false,
    errorMessage: ""
}

export const appReducer = (state = initialState, action: ActionsType): LoginInitialStateType => {
    switch (action.type) {
        case "APP/SET-IS-LOADING": {
            return {
                ...state, isLoading: action.isLoading
            }
        }
        case "APP/SET-ERROR": {
            return {
                ...state, errorMessage: action.error
            }
        }
        default:
            return state
    }
}


//types
type ActionsType =
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof setError>


export type LoginInitialStateType = {
    isLoading: boolean
    errorMessage: string
}


//actions
export const setError = (error: string) => {
    return {type: 'APP/SET-ERROR', error} as const
}
export const setIsLoading = (isLoading: boolean) => {
    return {type: 'APP/SET-IS-LOADING', isLoading} as const
}




