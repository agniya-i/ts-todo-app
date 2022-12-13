import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { IColumn, ITodo } from '../types/types';
import TodoItem from './TodoItem';


interface List {
    todos: ITodo[],
    columns: IColumn[],
    handleChange: (arr: ITodo[]) => void;
}

const TodoList: React.FC<List> = ({ columns, todos, handleChange }) => {

    const handleDone = (id: number) => {
        const updated = todos.map((todo) => {
            if (todo.id === id) {
                todo = { ...todo, status: 'in progress' }
            }

            return todo;
        });

        handleChange(updated);
    }

    const handleDelete = (id: number) => {
        const updated = todos.filter((item) => item.id !== id);
        handleChange(updated);
    }

    const handleEdit = (id: number, title: string) => {
        const updated = todos.map(todo => {
            if (todo.id === id) {
                todo = {
                    ...todo,
                    title: title
                }
            }

            return todo
        })

        handleChange(updated);
    }

    const renderItem = (todoId: number, index: number) => {
        const todo = todos.find(todo => todo.id === todoId);

        return (todo && <TodoItem
            key={todo.id}
            todo={todo}
            handleDone={handleDone}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            index={index}
        />)
    }

    return (
        <div className="list">
            {columns.map(((column, index) =>
                <Droppable droppableId={column.title} key={index}>
                    {
                        (provided) =>
                        (<div className='column'
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <div className='column-header'>{column.title}</div>
                            <div className="todos">
                                {
                                    column.items.map((todoId, index) => renderItem(todoId, index))
                                }
                            </div>
                            {provided.placeholder}
                        </div>

                        )
                    }
                </Droppable>
            ))}
        </div>

    )
}

export default TodoList;
