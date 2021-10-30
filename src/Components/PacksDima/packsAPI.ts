import axios from "axios";

// nya-admin@nya.nya
// 1qazxcvBG

// zazazaza@zaza.zaza
// zazazaza

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})

export const packsAPI = {
    getPacks() {
        return instance.get<ReceivedCardsType_T>(`/cards/pack`)
    },
    rmPacks(id: string) {
        return instance.delete<RemovePackResponse>(`/cards/pack?id=${id}`)
    },
    // createCardsPack(payload: { name: string }) {
    //     return instance.post(`/cards/pack`, {cardsPack: payload})
    // },
    editPack(payload: {_id: string, name: string | null}) {
        return instance.put<UpdateResponseType>(`/cards/pack`, {cardsPack: payload})
    }
}

export type ReceivedCardsType_T = {
    cardPacks: SingleCard_T[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

type RemovePackResponse = {
    deletedCardsPack: SingleCard_T
    token: string
    tokenDeathTime: string
}

type UpdateResponseType = {
    token: string
    tokenDeathTime: number
    updatedCardsPack: SingleCard_T
}

export type SingleCard_T = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}



