
import React from 'react';
import './App.css';
import {IUser} from './types/types';
import List from './components/List';

const App = () => {

    const users: IUser[]= [
        { id: 12331, name: "Agniya Loves Cakes", email:"agniya@mail.com", address: { street: "St. No ", city: "Kyiv",zipcode: "u89", } }
    ]
    return (<div>
        <List users={users}/>

    </div>)
}

export default App;
