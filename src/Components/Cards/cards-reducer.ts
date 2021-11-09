import { AppRootStateType, ThunkType } from "../../app/store";
import { cardsAPI } from "../Packs/packs-api";

const initialState: CardsInitialStateType = {
    cards: [
        {
            _id: "",
            cardsPack_id: "",
            answer: "",
            question: "",
            grade: 0,
            shots: 0,
            rating: 0,
            updated: new Date(),
        },
    ],
    cardPackId: "",
    cardId: "",
    minCardsCount: 0,
    maxCardsCount: 0,
    currentPage: 1,
    pageCount: 10,
    cardsCount: 0,
    packUserId: "",
    cardGrade: 0,
};

export const cardsReducer = (state: CardsInitialStateType = initialState, action: ActionsCardsTypes): CardsInitialStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            return {
                ...state,
                cards: action.payload.cards.map((p) => p),
            };
        case "cards/SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.payload.currentPage,
            };
        case "cards/SET-CARDS-TOTAL-COUNT":
            return {
                ...state,
                cardsCount: action.payload.cardsCount,
            };
        case "cards/SET-PAGE-COUNT":
            return {
                ...state,
                pageCount: action.payload.pageCount,
            };
        default:
            return state;
    }
};

// Action Creators
export const setCardsAC = (cards: CardType[]) => {
    return { type: "cards/SET-CARDS", payload: { cards } } as const;
};

export const setCardsPackIdAC = (cardPackId: string) => {
    return { type: "cards/SET-CARDS-PACK-ID", payload: { cardPackId } } as const;
};

export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: "cards/SET-CURRENT-PAGE",
        payload: {
            currentPage,
        },
    } as const;
};
export const setCardsCountAC = (cardsCount: number) => {
    return {
        type: "cards/SET-CARDS-TOTAL-COUNT",
        payload: {
            cardsCount,
        },
    } as const;
};

export const setPageCountAC = (pageCount: number) => {
    return { 
        type: "cards/SET-PAGE-COUNT", 
        payload: {
            pageCount
        } 
    } as const;
};

// Thunks
export const setCardsTC =
    (cardsPackId: string): ThunkType =>
    (dispatch, getState: () => AppRootStateType) => {
        const cards = getState().cards;
        const currentPage = cards.currentPage;
        const pageCount = cards.pageCount;

        cardsAPI
            .setCards(cardsPackId, currentPage, pageCount)
            .then((res) => {
                dispatch(setCardsAC(res.data.cards));
                dispatch(setCardsCountAC(res.data.cardsTotalCount));
            })
    };

export const updateCardsGradesTC =
    (card_id: string, grade: number): ThunkType =>
        (dispatch, getState: () => AppRootStateType) => {
            cardsAPI.updateCardGrade(card_id, grade)
        };


// Types
export type ActionsCardsTypes =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setCardsCountAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setCardsPackIdAC>
    
export type CardsInitialStateType = {
    cards: CardType[];
    currentPage: number;
    pageCount: number;
    cardsCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    packUserId: string;
    cardId: string;
    cardPackId: string;
    cardGrade: number;
};
export type CardType = {
    _id: string;
    cardsPack_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    rating: number;
    updated: Date | string;
};