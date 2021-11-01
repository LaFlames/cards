import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const packsAPI = {
  getPacks(
      currentPage: number,
      pageCount: number,
      packName: string,
      userId: string | null,
      min: number,
      max: number
  ) {
    return instance.get<PacksResponseType>(`cards/pack?pageCount=${pageCount}&page=${currentPage}&packName=${packName}&user_id=${userId}&min=${min}&max=${max}`)
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

export const cardsAPI = {
  setCards(packId: string, currentPage: number, pageCount: number) {
      return instance.get<GetCardsResponseType>(
          `cards/card?cardsPack_id=${packId}&pageCount=${pageCount}&page=${currentPage}`
      );
  },
  addCard(cardsPack_id: string, question: string, answer: string) {
      return instance.post<AddedCardResponseType>(`cards/card`, {
          card: { cardsPack_id, question, answer },
      });
  },
  deleteCard(id: string) {
      return instance.delete<DeletedCardResponseType>(`cards/card?id=${id}`);
  },
  updateCard(_id: string, question: string, answer: string) {
      return instance.put<UpdatedCardResponseType>(`cards/card`, {
          card: { _id, question, answer },
      });
  },
  updateCardGrade(card_id: string, grade: number) {
      return instance.put<UpdatedGradeResponseType>(`cards/grade`, {
          card_id,
          grade,
      });
  },
};

//types

export type CardsPackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: false;
  name: string;
  cardsCount: 0;
  type: string;
  rating: 0;
  updated: Date;
};
export type PacksResponseType = {
  cardPacks: CardsPackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
};
export type RemovePackResponse = {
  deletedCardsPack: CardsPackType[]
  token: string
  tokenDeathTime: string
}
export type UpdateResponseType = {
  token: string
  tokenDeathTime: number
  updatedCardsPack: CardsPackType[]
}
export type GetCardsResponseType = {
  cards: CardType[];
  packUserId: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
};
export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  type: string;
  rating: number;
  updated: Date | string;
  more_id: string;
  created: Date | string;
};
export type AddedCardResponseType = {
  newCard: CardType;
};
export type DeletedCardResponseType = {
  deletedCard: CardType;
};
export type UpdatedCardResponseType = {
  updatedCard: CardType;
};
export type UpdatedGradeResponseType = {
  updatedGrade: CardType;
};