import React from 'react';
import {SuperButton} from "../SuperComponents/SuperButton/SuperButton";
import {SuperCheckbox} from "../SuperComponents/SuperCheckbox/SuperCheckbox";
import {SuperInputText} from "../SuperComponents/SuperInputText/SuperInputText";



export const Test = () => {
    return (
        <div>
            <div>
                <SuperInputText/>
            </div>
            <div>
                <SuperButton>Button</SuperButton>
            </div>
            <div>
                <SuperCheckbox>
                    Heyy
                </SuperCheckbox>
            </div>
        </div>
    );
};