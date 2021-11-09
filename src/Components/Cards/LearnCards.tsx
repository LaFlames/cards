import React, {ChangeEvent, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { AppRootStateType } from '../../app/store'
import { PackType } from '../Packs/packs-reducer'
import {CardType, setCardsTC, updateCardsGradesTC} from './cards-reducer'
import s from './Cards.module.css'



export const LearnCards = () => {
    const dispatch = useDispatch()
    const packId = useSelector<AppRootStateType, string>(state => state.packs.packsId)
    const cardsPack = useSelector<AppRootStateType, PackType[]>(state => state.packs.cardPacks)
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)
    const [currentCard, setCurrentCard] = useState<CardType>({
        _id: "",
        cardsPack_id: "",
        answer: "answer fake",
        question: "question fake",
        grade: 0,
        shots: 0,
        rating: 0,
        updated: "",
    })
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [isViewed, setIsViewed] = useState<boolean>(false)
    const currentPack = cardsPack.filter(p => p._id === packId)
    const history = useHistory()



    useEffect(() => {
        dispatch(setCardsTC(packId))
    }, [dispatch])

    useEffect(() => {
        setCurrentCard(cards[0])
    }, [cards])

    const index = cards.indexOf(currentCard)

    const onNextButtonHandler = () => {
        if (isChecked) {
            if (cards.length === index + 1) {
                setIsViewed(true)
            } else {
                setCurrentCard(cards[index + 1])
                setIsChecked(false)
            }
        } else {
            setIsChecked(true)
        }
    }

    if (isViewed) {
        return <div className={s.wrapper}>
            <span>ok</span>
            <button onClick={() => {history.goBack()}}>cancel</button>
        </div>
    }

    const updateCardGradeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.dataset.grade) {
            const trigger: string = e.currentTarget.dataset.grade;
            if (trigger === "1") {
                dispatch(updateCardsGradesTC(currentCard._id, 1))
            }
            if (trigger === "2") {
                dispatch(updateCardsGradesTC(currentCard._id, 2))
            }
            if (trigger === "3") {
                dispatch(updateCardsGradesTC(currentCard._id, 3))
            }
            if (trigger === "4") {
                dispatch(updateCardsGradesTC(currentCard._id, 4))
            }
            if (trigger === "5") {
                dispatch(updateCardsGradesTC(currentCard._id, 5))
            }
        }
    }



    return (
        <div className={s.wrapper}>
            <h2>Learn: {currentPack[0].name}</h2>
            <h3>Question: {currentCard.question}</h3>
            {isChecked && <h3>Answer: {currentCard.answer}</h3>}
            {isChecked && <div>
                <h4>Rate yourself:</h4>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <span>
                        <input type={"radio"} onChange={updateCardGradeHandler} data-grade={'1'}/>Did not know
                    </span>
                    <span>
                        <input type={"radio"} onChange={updateCardGradeHandler} data-grade={'2'}/>Forgot
                    </span>
                    <span>
                        <input type={"radio"} onChange={updateCardGradeHandler} data-grade={'3'}/>A lot of thought
                    </span>
                    <span>
                        <input type={"radio"} onChange={updateCardGradeHandler} data-grade={'4'}/>Confused
                    </span>
                    <span>
                        <input type={"radio"} onChange={updateCardGradeHandler} data-grade={'5'}/>Knew the answer
                    </span>
                </div>
            </div>}
            <button onClick={onNextButtonHandler}>next</button>
            <button onClick={() => {history.goBack()}}>cancel</button>

        </div>
    )
}