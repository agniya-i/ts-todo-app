import React from 'react';

interface Input {
    value: string,
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const InputField: React.FC<Input> = ({ value, handleChange, handleSubmit }) => {
    // const inputRef = useRef<HTMLInputElement>();

    return (
        <form className='input'>
            <input
                type='text'
                placeholder='Enter a task'
                className='input__box'
                value={value}
                onChange={handleChange}
            />
            <button type="submit" onClick={handleSubmit}>Go</button>
        </form>
    )
}

export default InputField;
