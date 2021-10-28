import React, { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import { PackType, setPacksTC, setSearchPacksAC } from './packs-reducer'



export const Packs = () => {
    const dispatch = useDispatch()
    const cardsPack = useSelector<AppRootStateType, PackType[]>(state => state.packs.cardPacks)
    const searchPack = useSelector<AppRootStateType, string>(state => state.packs.searchPacks)

    useEffect(() => {
        dispatch(setPacksTC())
    }, [dispatch])

    const setSearchPackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchPacksAC(e.currentTarget.value));
    };

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
            {cardsPack.map(el => {
                return <div>{el.name}</div>
            })}
        </div>
    )
}

