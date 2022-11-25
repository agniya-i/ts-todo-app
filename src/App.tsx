
import React, { useState, FC, useEffect } from 'react';
import './App.css';
import InputField from './components/InputField';
import { ITodo, IColumn } from './types/types';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import useLocalStorage from './hooks/useLocalStorage';

const INITIAL_COLUMNS = [
    {
        index: 1,
        title: "To Do",
        items: [],
    },
    {
        index: 2,
        title: "In Progress",
        items: [],
    },
    {
        index: 3,
        title: "Done",
        items: [],
    }
]

const App: FC = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useLocalStorage<ITodo[]>('todos', []);
    const [completedTodos, setCompletedTodos] = useState<ITodo[]>([]);
    //const [columns, setColumns] = useState<IColumn[]>([]);
    const [columns, setColumns] = useLocalStorage<IColumn[]>('columns', []);

    useEffect(() => {
        console.log(columns);
        if (!columns.length) {
            setColumns(INITIAL_COLUMNS);
        }

    }, [])

    const handleChangeTodo = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setTodo(e.currentTarget.value);

    }
    const handleSubmitTodo = (e: React.FormEvent): void => {
        e.preventDefault();
        if (todo) {
            const newToDo = { id: Date.now(), title: todo, status: columns[0].title };

            const updatedColumns = columns.map((column, index) => {
                if (index === 0) {
                    column = {
                        ...column,
                        items: [...column.items, newToDo.id]
                    }

                }
                return column;
            })

            setColumns(updatedColumns);
            setTodos([newToDo, ...todos]);
            setTodo("");
        }
    }

    const handleEditTodo = (todos: ITodo[]) => {
        setTodos(todos);
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId) return;

        //let currentItem = todos.find(item => item.id.toString() === draggableId);
        // let sourceColumn = columns; // удалить отсюда 
        // let destinationColumn = columns.find(item => item.title === destination.droppableId); // добавить сюда


        let updatedSourceColumn = columns.map(column => {
            let index = column.items.indexOf(parseInt(draggableId));
            if (column.title === source.droppableId) {
                column.items.splice(index, 1);
            }
            if (column.title === destination.droppableId) {
                console.log(destination.index);
                column.items.splice(destination.index, 0, parseInt(draggableId));
            }

            return column;
        });
        console.log('updated source', updatedSourceColumn);
        setColumns(updatedSourceColumn);

    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='App'>
                <div className='heading'>
                    <div className='heading__icon'>🦖</div>
                    <div className='heading__title'> Task List</div>
                </div>
                <div className='input-wrapper'>
                    <InputField value={todo} handleChange={handleChangeTodo} handleSubmit={handleSubmitTodo} />
                </div>
                <div>
                    <TodoList
                        columns={columns}
                        todos={todos}
                        handleChange={handleEditTodo}
                    />
                </div>
            </div>
        </DragDropContext>
    )
}

export default App;
