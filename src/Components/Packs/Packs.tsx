import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import { Paginator } from '../Paginator/Paginator'
import SuperSelect from '../SuperComponents/SuperSelect/SuperSelect'
import { PackType, setCurrentPageAC, setPacksTC, setPageCountAC, setSearchPacksAC } from './packs-reducer'

const arr = [4, 5, 7]

export const Packs = () => {
    const dispatch = useDispatch()
    // const [value, onChangeOption] = useState(arr[1])
    const cardsPack = useSelector<AppRootStateType, PackType[]>(state => state.packs.cardPacks)
    const searchPack = useSelector<AppRootStateType, string>(state => state.packs.searchPacks)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.currentPage)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const totalPacksCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    

    useEffect(() => {
        dispatch(setPacksTC())
    }, [dispatch])

    const onChangePageHandler = useCallback(
        (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber));
            dispatch(setPacksTC());
        },
        [dispatch]
    );

    const setSearchPackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchPacksAC(e.currentTarget.value));
    };

    const onChangeOption = (value: string) => {
        dispatch(setPageCountAC(Number(value)))
        dispatch(setPacksTC());
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
            {cardsPack.map(el => {
                return <div>{el.name}</div>
            })}
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

