import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import { Paginator } from '../Paginator/Paginator'
import { ProfileInitialStateType } from '../Profile/profile-reducer'
import {Redirect} from "react-router-dom";
import { PATH } from '../Routes'
import SuperSelect from '../SuperComponents/SuperSelect/SuperSelect'
import {
    createPackTC,
    PackType,
    setCurrentPackIdAC,
    setCurrentPageAC, setEditableFlag,
    setPacksTC,
    setPageCountAC,
    setSearchPacksAC
} from './packs-reducer'
import { useHistory } from "react-router-dom";
import {SuperButton} from "../SuperComponents/SuperButton/SuperButton";
import {SetDataModal} from "./SetDataModal/SetDataModal";
import {EditDataModal} from "./EditDataModal/EditDataModal";
import {RemoveDataModal} from "./RemoveDataModal/RemoveDataModal";


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

    // dima
    const [creationPack, setCreationPack] = useState(false)

    const packAdditionHandler = () => {
        setCreationPack(true)
    }

    const addPackCallBack = (data: string) => {
        dispatch(createPackTC(data))
    }
    // /dima

    const getLocalTime = (value: Date | string) =>
        new Intl.DateTimeFormat().format(new Date(value));

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
            dispatch(setEditableFlag('remove', el._id))
        }

        const editPack = () => {
            dispatch(setEditableFlag('edit', el._id))
        }

        const LearnHandler = () => {
            dispatch(setCurrentPackIdAC(el._id))
            history.push(PATH.LEARN_CARDS);
        }

        const goToCardsList = () => {
            dispatch(setCurrentPackIdAC(el._id))
            history.push(PATH.CARDS);
        }

        return (
            <tr key={el._id} className={'tr2'} >
                {el.editableFlag === 'edit' && <EditDataModal id={el._id} />}
                {el.editableFlag === 'remove' && <RemoveDataModal id={el._id} />}
                <td
                    className={'td1'}
                    style={el.user_id === userProfile._id ? {cursor: 'pointer', color: 'deeppink'} : {cursor: 'default'}}
                    onClick={el.user_id === userProfile._id ? goToCardsList : () => {}}
                > {el.name} </td>
                <td className={'td1'}> {el.cardsCount} </td>
                <td className={'td1'}> {getLocalTime(el.updated)} </td>
                <td className={'td1'}> {el.user_name} </td>
                <td className={'td2'}>
                    {el.user_id === userProfile._id && <button onClick={removePack}>Delete</button>}
                    {el.user_id === userProfile._id && <button onClick={editPack}>Edit</button>}
                    <button disabled={el.cardsCount === 0} onClick={LearnHandler}>Learn</button>
                </td>
            </tr>
        )
    })

    if (!userProfile._id) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div style={ {position: 'relative'} }>
            {/*dima*/}

            {
                creationPack && <SetDataModal setCreationPack={setCreationPack}
                                           onConfirmCallBack={addPackCallBack}
                                           header={'Add new pack'}
                                />}
            <div style={{display: 'flex'}}>
                <div>
                    {/*not Dima*/}
                    {/*i did not changed this code... just placed it into a div*/}
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
                    {/*/not Dima*/}
                </div>
                <div>
                    <SuperButton onClick={packAdditionHandler}
                                 disabled={false}>
                        Add new pack
                    </SuperButton>
                </div>
            </div>

            {/*/dima*/}

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

