import {packsAPI_Dima, SingleCard_T} from "./packsAPI_Dima";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";

export type PacksInitialStateType = SingleCard_T

const initialState: SingleCard_T[] = []

export const packsReducerDima = (state: PacksInitialStateType[] = initialState, action: ActionsType): PacksInitialStateType[] => {
    switch (action.type) {
        case 'packs/SET-CARDS-DATA': {
            return [...action.payload.data]
        }
        default:
            return state
    }
}

// AC
type SetCardsData_T = ReturnType<typeof setPacksDataAC>
const setPacksDataAC = (data: SingleCard_T[]) => {
    return {type: 'packs/SET-CARDS-DATA', payload: {data}} as const
}

type ActionsType = SetCardsData_T

// TC
export const setPacsDataTC = () => (dispatch: Dispatch) => {
    // let token = getCookie('token');
    packsAPI_Dima.getPacks()
        .then(res => {
            // console.log(res.data.cardPacks[0]._id)
            dispatch(setPacksDataAC(res.data.cardPacks))
        })
        .catch(err => {
            alert('some error has occurred...')
        })
}

export const removePackTC = (
    id: string
): ThunkAction<void, AppRootStateType, unknown, ActionsType> => async dispatch => {
    packsAPI_Dima.rmPacks(id)
        .then(() => {
            dispatch(setPacsDataTC())
        })
        .catch(err => {
            alert(err.message)
        })
}

export const editPackTC = (
    _id: string, name: string | null
): ThunkAction<void, AppRootStateType, unknown, ActionsType> => async dispatch => {
    packsAPI_Dima.editPack({_id, name})
        .then(() => {
            dispatch(setPacsDataTC())
        })
        .catch(err => {
            alert(err.message)
        })
}





