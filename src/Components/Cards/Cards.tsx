import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import { CardType, setCardsTC } from './cards-reducer'



export const Cards = () => {
    const dispatch = useDispatch()
    const packId = useSelector<AppRootStateType, string>(state => state.packs.packsId)
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)
    const getLocalTime = (value: Date | string) =>
        new Intl.DateTimeFormat().format(new Date(value));

    useEffect(() => {
        dispatch(setCardsTC(packId))
    }, [dispatch])

    const mappedPositions = cards.map((el) => {


        return (
            <tr key={el._id} className={'tr2'}>
                <td className={'td1'}> {el.answer} </td>
                <td className={'td1'}> {el.grade} </td>
                <td className={'td1'}> {el.question} </td>
                <td className={'td1'}> {getLocalTime(el.updated)} </td>
                <td className={'td2'}>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <div className={'tableWrapper'}>
                <table>
                    <tr className={'tr1'}>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                    </tr>
                    {mappedPositions}
                </table>
            </div>
        </div>
    )
}



