import { Dispatch } from "redux"
import { AppRootStateType, ThunkType } from "../../app/store"
import { packsAPI } from "./packs-api"

const initialState: PacksInitialStateType = {
    cardPacks: [
        {
            _id: "",
            user_id: "",
            user_name: "",
            private: false,
            name: "first",
            cardsCount: 0,
            updated: new Date(),
        },
    ],
    minCardsCount: 0,
    maxCardsCount: 100,
    currentPage: 1,
    pageCount: 10,
    cardPacksTotalCount: 0,
    userId: "",
    packsId: "",
    searchPacks: "",
    myPage: false,
}

export const packsReducer = (state = initialState, action: ActionsPacksType): PacksInitialStateType => {
    switch (action.type) {
        case 'SET_PACKS': {
            return {
                ...state, 
                cardPacks: action.cardPacks
            }
        }
        case "SET_SEARCH_PACKS":
            return { ...state, searchPacks: action.searchValue };
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case "SET_PACKS_TOTAL_COUNT":
            return {
                ...state,
                cardPacksTotalCount: action.cardPacksTotalCount,
            };
        default:
            return state
    }
}

// Action 
export const setPacksAC = (cardPacks: PackType[]) => {
    return { type: "SET_PACKS", cardPacks } as const;
};
export const setSearchPacksAC = (searchValue: string) => {
    return { type: "SET_SEARCH_PACKS", searchValue } as const;
};
export const setPacksTotalCountAC = (cardPacksTotalCount: number) => {
    return { type: "SET_PACKS_TOTAL_COUNT", cardPacksTotalCount } as const;
};
export const setCurrentPageAC = (currentPage: number) => {
    return { type: "SET_CURRENT_PAGE", currentPage } as const;
};

//thunk

export const  setPacksTC = (): ThunkType => (dispatch, getState: () => AppRootStateType) => {
    const {
        currentPage,
        pageCount,
        searchPacks,
        minCardsCount,
        maxCardsCount,
        myPage,
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
            console.log(res)
        })
}

//types

export type ActionsPacksType = 
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setSearchPacksAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPacksTotalCountAC>

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
    myPage: boolean;
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