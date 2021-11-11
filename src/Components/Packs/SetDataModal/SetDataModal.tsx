import React, {useState} from "react";
import st from './SetDataModal.module.css'
import {SuperInputText} from "../../SuperComponents/SuperInputText/SuperInputText";
import {SuperButton} from "../../SuperComponents/SuperButton/SuperButton";

export const SetDataModal = ({
    setCreationPack,
    onConfirmCallBack,
    header,
} : {
    setCreationPack: (creationPack: boolean) => void
    onConfirmCallBack: (data: string) => void
    header: string
}) => {

    const [inputVal, setInputVal] = useState<string>('')

    const inputValHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setInputVal(e.currentTarget.value)
    }

    const acceptOperationHandler = () => {
        onConfirmCallBack(inputVal)
        setCreationPack(false)
    }

    const RejectOperationHandler = () => {
        setCreationPack(false)
    }

    return(
        <div className={st.allWidow}>
            <div className={st.additionModalContainer}>
                <div>
                    <h3 style={{margin: '0'}}>
                        {header}
                    </h3>
                </div>
                <div className={st.dividedLine} />
                <div>
                    <SuperInputText value={inputVal}
                                    onChange={inputValHandler}
                    />
                </div>
                <div className={st.remoteWrapper}>
                    <SuperButton onClick={RejectOperationHandler}>Cancel</SuperButton>
                    <SuperButton onClick={acceptOperationHandler}>Ok</SuperButton>
                </div>
            </div>
        </div>
    )
}