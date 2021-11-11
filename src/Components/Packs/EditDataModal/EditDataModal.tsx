import React, {useState} from "react";
import st from './EditDataModal.module.css'
import {SuperInputText} from "../../SuperComponents/SuperInputText/SuperInputText";
import {SuperButton} from "../../SuperComponents/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {EditableFlagTypes, editPackTC, setEditableFlag} from "../packs-reducer";

export const EditDataModal = ({
    id,
} : {
    id: string
}) => {

    const [inputVal, setInputVal] = useState<string>('')

    const dispatch = useDispatch()

    const changeInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.currentTarget.value)
    }

    const onConfirm = () => {
        dispatch(setEditableFlag('idle', id))
        dispatch(editPackTC(id, inputVal))
    }

    const onReject = () => {
        dispatch(setEditableFlag('idle', id))
    }

    return (
            <div className={st.editionModalContainer}>
                <div className={st.borderFrame}>
                <div className={st.editionModalWrapper}>
                    <div>
                        <h1 className={st.headerStyles}>Edit pack</h1>
                    </div>
                    <div>
                        <SuperInputText value={inputVal} onChange={changeInputVal}/>
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
    )
}