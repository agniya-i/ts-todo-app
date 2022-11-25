import React, { useState } from 'react';
import { ITodo } from '../types/types';
import { BsFillPencilFill, BsFillCaretRightFill, BsFillTrashFill } from "react-icons/bs";
import { FiMenu, FiTrash } from "react-icons/fi";
import { Draggable } from 'react-beautiful-dnd';

interface TodoItemProps {
    todo: ITodo;
    index: number;
    handleDone: (id: number) => void;
    handleDelete: (id: number) => void;
    handleEdit: (id: number, title: string) => void;

}

const TodoItem: React.FC<TodoItemProps> = ({ index, todo, handleDone, handleDelete, handleEdit }) => {

    const [editedTitle, setEditedTitle] = useState(todo.title);

    const editTitle = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEditedTitle(e.currentTarget.value);

    }

    const handleDisableToEdit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        handleEdit(todo.id, editedTitle);
    }


    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided) => (
                    <form className='todo'
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >

                        <form
                            className="todo-title"
                            onKeyPress={(e) => {
                                e.key === 'Enter' && e.preventDefault()
                            }}
                        >
                            <input
                                value={editedTitle}
                                onBlur={handleDisableToEdit}
                                onChange={editTitle}
                            />
                        </form>

                        <div className='settings'>
                            <span className='icon' onClick={() => handleDelete(todo.id)}><FiTrash color='grey' /></span>
                            <span className='icon' onClick={() => handleDone(todo.id)}><FiMenu color='grey' /></span>
                        </div>
                    </form >

                )
            }
        </Draggable>
    )
}

export default TodoItem;
