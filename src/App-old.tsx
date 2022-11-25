
import React, { useEffect, useState} from 'react';
import './App.css';
import {ITodo, IUser} from './types/types';
import List from './components-old/List';
import axios from 'axios';
import UserItem from './components-old/UserItem';
import TodoItem from './components-old/TodoItem';

const App = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [todos, setTodos] = useState<ITodo[]>([]);
   
    useEffect(() => {
        fetchUsers();
        fetchTodos();
    },[]);


    async function fetchUsers(){
        
        try{
            const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
            setUsers(response.data);
        }catch(e){
            console.log(e);
        }
    }

    async function fetchTodos() {
        try {
            const response = await axios.get<ITodo[]>("https://jsonplaceholder.typicode.com/todos?_limit=10");
            setTodos(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (<div>
        <List 
            items={users}
            renderItem = {(user: IUser) => <UserItem user={user} key={user.id} />}
        />
        <List 
            items={todos} 
            renderItem = {(todo: ITodo) => <TodoItem todo={todo} key={todo.id} /> }
        />
    </div>)
}

export default App;
