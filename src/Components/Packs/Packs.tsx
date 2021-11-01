import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import { Paginator } from '../Paginator/Paginator'
import { ProfileInitialStateType } from '../Profile/profile-reducer'
import {Redirect} from "react-router-dom";
import { PATH } from '../Routes'
import SuperSelect from '../SuperComponents/SuperSelect/SuperSelect'
import { editPackTC, PackType, removePackTC, setCurrentPageAC, setPacksTC, setPageCountAC, setSearchPacksAC } from './packs-reducer'
import { setCardsPackIdAC, setCardsTC } from '../Cards/cards-reducer'
import { useHistory } from "react-router-dom";


const arr = [4, 5, 7]

export const Packs = () => {
    const dispatch = useDispatch()
    let history = useHistory()
    const cardsPack = useSelector<AppRootStateType, PackType[]>(state => state.packs.cardPacks)
    const searchPack = useSelector<AppRootStateType, string>(state => state.packs.searchPacks)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.currentPage)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const totalPacksCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const userProfile = useSelector<AppRootStateType, ProfileInitialStateType>(state => state.profile)
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    

    useEffect(() => {
        dispatch(setPacksTC())
    }, [])

    const onChangePageHandler = useCallback(
        (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber));
            dispatch(setPacksTC());
        },
        []
    );

    const setSearchPackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchPacksAC(e.currentTarget.value));
    };

    const onChangeOption = (value: string) => {
        dispatch(setPageCountAC(Number(value)))
        dispatch(setPacksTC());
    }

    const mappedPositions = cardsPack.map((el) => {

        const removePack = () => {
            dispatch(removePackTC(el._id))
        }

        const editPack = () => {
            let editedPackName = prompt('Insert new pack name...')
            dispatch(editPackTC(el._id, editedPackName))
        }

        const LearnHandler = () => {
            dispatch(setCardsTC(el._id))
            history.push(PATH.CARDS);
        }

        return (
            <tr key={el._id} className={'tr2'}>
                <td className={'td1'}> {el.name} </td>
                <td className={'td1'}> {el.cardsCount} </td>
                <td className={'td1'}> {el.updated} </td>
                <td className={'td1'}> {el.user_name} </td>
                <td className={'td2'}>
                    {el.user_id === userProfile._id && <button onClick={removePack}>Delete</button>}
                    {el.user_id === userProfile._id && <button onClick={editPack}>Edit</button>}
                    <button onClick={LearnHandler}>Learn</button>
                </td>
            </tr>
        )
    })

    if (!isAuth) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>
            <input 
                type="text"
                placeholder="Search..."
                value={searchPack}
                onChange={
                    setSearchPackHandler
                }
            />
            <button onClick={() => dispatch(setPacksTC())}>
                Search
            </button>

            <div className={'tableWrapper'}>
                <table>
                    <tr className={'tr1'}>
                        <th>Name</th>
                        <th>Cards</th>
                        <th>LastUpdate</th>
                        <th>CreatedBy</th>
                        <th>Actions</th>
                    </tr>
                    {mappedPositions}
                </table>
            </div>

            <Paginator 
                    currentItem={currentPage}
                    itemCount={pageCount}
                    totalItemCount={totalPacksCount}
                    portionSize={10}
                    onChangeItemHandler={onChangePageHandler}/>
            <SuperSelect 
                    options={arr}
                    value={pageCount}
                    onChangeOption={onChangeOption}
            />
        </div>
    )
}

