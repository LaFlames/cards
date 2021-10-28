import React, { ChangeEvent, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import { Paginator } from '../Paginator/Paginator'
import { PackType, setCurrentPageAC, setPacksTC, setSearchPacksAC } from './packs-reducer'



export const Packs = () => {
    const dispatch = useDispatch()
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
        </div>
    )
}

