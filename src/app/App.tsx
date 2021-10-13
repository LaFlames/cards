import React from 'react';
import { HashRouter } from 'react-router-dom'
import './App.css';
import Routes from "../Components/Routes";
import {Header} from "../Components/Header/Header";

export const App = () => {
    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <Routes />
            </HashRouter>
        </div>
    );
}


