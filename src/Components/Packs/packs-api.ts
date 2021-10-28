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
  }
}

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