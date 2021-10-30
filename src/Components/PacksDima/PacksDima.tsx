import React, {useEffect} from 'react'
import './PacksDima.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {packsAPI_Dima, SingleCard_T} from "./packsAPI_Dima";
import {Redirect} from "react-router-dom";
import {PATH} from "../Routes";
import {editPackTC, removePackTC, setPacsDataTC} from "./packs-reducer-dima";
import {ProfileInitialStateType} from "../Profile/profile-reducer";

export const PacksDima = () => {

    const dispatch = useDispatch()

    let userProfile = useSelector<AppRootStateType, ProfileInitialStateType>(state => state.profile)
    const packs = useSelector<AppRootStateType, SingleCard_T[]>(state => state.packs)
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)

    useEffect(() => {
        dispatch(setPacsDataTC())
    }, [])

    const mappedPositions = packs.map((el) => {

        const removePack = () => {
            dispatch(removePackTC(el._id))
        }

        const editPack = () => {
            let editedPackName = prompt('Insert new pack name...')
            dispatch(editPackTC(el._id, editedPackName))
        }

        const LearnHandler = () => {
            alert('Here is gonna be logic for Learn btn...')
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

        </div>
    )
}

