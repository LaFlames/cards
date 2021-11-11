import React from "react";
import st from './RemoveDataModal.module.css'
import {SuperButton} from "../../SuperComponents/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {removePackTC, setEditableFlag} from "../packs-reducer";

export const RemoveDataModal = ({id} : { id: string }) => {

    const dispatch = useDispatch()

    const onConfirm = () => {
        dispatch(removePackTC(id))
        dispatch(setEditableFlag('idle', id))
    }

    const onReject = () => {
        dispatch(setEditableFlag('idle', id))
    }

    return (
        <div>
        <div className={st.removeModalContainer}>
            <div className={st.borderFrame}>
                <div className={st.removeModalWrapper}>
                    <div>
                        <h1 className={st.headerStyles}>Are you sure ?</h1>
                    </div>

                    <div className={st.remoteWrapper}>
                        <SuperButton onClick={onReject}>
                            Cancel
                        </SuperButton>
                        <SuperButton onClick={onConfirm}>
                            Ok
                        </SuperButton>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}