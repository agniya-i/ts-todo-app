// export interface IUser {
//     id: number,
//     name: string,
//     email: string,
//     address: IAddress
// }

export interface ITodo {
    id: number;
    title: string;
    status: string;
}

export interface IColumn {
    index: number;
    title: string;
    items: number[];
}

// type Actions =
//     | { type: 'add', payload: string }
//     | { type: 'edit', payload: number }
//     | { type: 'remove', payload: number }