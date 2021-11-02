import { AppRootStateType, ThunkType } from "../../app/store"
import { packsAPI } from "./packs-api"

const initialState: PacksInitialStateType = {
    cardPacks: [
        {
            _id: "",
            user_id: "",
            user_name: "",
            private: false,
            name: "",
            cardsCount: 0,
            updated: new Date(),
        },
    ],
    minCardsCount: 0,
    maxCardsCount: 100,
    currentPage: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    userId: "",
    packsId: "",
    searchPacks: "",
}

export const packsReducer = (state = initialState, action: ActionsPacksType): PacksInitialStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS': {
            return {
                ...state, 
                cardPacks: action.cardPacks
            }
        }
        case "packs/SET-SEARCH-PACKS":
            return { ...state, searchPacks: action.searchValue };
        case "packs/SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case "packs/SET-PACKS-TOTAL-COUNT":
            return {
                ...state,
                cardPacksTotalCount: action.cardPacksTotalCount,
            };
        case "packs/SET-PAGE-COUNT":
            return {
                ...state,
                pageCount: action.pageCount,
            };
        case "packs/SET-CURRENT-PACK-ID": 
            return {
                ...state,
                packsId: action.payload.packId,
            }
        default:
            return state
    }
}

// Action 
export const setPacksAC = (cardPacks: PackType[]) => {
    return { type: "packs/SET-PACKS", cardPacks } as const;
};
export const setSearchPacksAC = (searchValue: string) => {
    return { type: "packs/SET-SEARCH-PACKS", searchValue } as const;
};
export const setPacksTotalCountAC = (cardPacksTotalCount: number) => {
    return { type: "packs/SET-PACKS-TOTAL-COUNT", cardPacksTotalCount } as const;
};
export const setCurrentPageAC = (currentPage: number) => {
    return { type: "packs/SET-CURRENT-PAGE", currentPage } as const;
};
export const setPageCountAC = (pageCount: number) => {
    return { type: "packs/SET-PAGE-COUNT", pageCount } as const;
};
export const setCurrentPackIdAC = (packId: string) => {
    return {
        type: "packs/SET-CURRENT-PACK-ID",
        payload: {
            packId,
        },
    } as const;
};

//thunk

export const  setPacksTC = (): ThunkType => (dispatch, getState: () => AppRootStateType) => {
    const {
        currentPage,
        pageCount,
        searchPacks,
        minCardsCount,
        maxCardsCount,
        userId
    } = getState().packs

    packsAPI.getPacks(
        currentPage,
        pageCount,
        searchPacks,
        userId,
        minCardsCount,
        maxCardsCount
    )
        .then(res => {
            dispatch(setPacksAC(res.data.cardPacks))
            dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount));
        })
}

export const removePackTC = (id: string): ThunkType => (dispatch, getState: () => AppRootStateType) => {
    packsAPI.rmPacks(id)
        .then(() => {
            dispatch(setPacksTC())
        })
        .catch(err => {
            alert(err.message)
        })
}

export const editPackTC = (
    _id: string, name: string | null
): ThunkType => (dispatch, getState: () => AppRootStateType) => {
    packsAPI.editPack({_id, name})
        .then(() => {
            dispatch(setPacksTC())
        })
        .catch(err => {
            alert(err.message)
        })
}

//types

export type ActionsPacksType = 
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setSearchPacksAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPacksTotalCountAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setCurrentPackIdAC>

export type PacksInitialStateType = {
    cardPacks: PackType[];
    currentPage: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    userId: string;
    packsId: string;
    searchPacks: string;
}

export type PackType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: false;
    name: string;
    cardsCount: 0;
    updated: Date;
};