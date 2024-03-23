import { useReducer, createContext, useState, useEffect } from "react";

const UsersContext = createContext();

export const UsersActionTypes = {
    getAll: 'fetch all data',
    addNew: 'addNew user to the data'
}

const reducer = (state, action) => {
    switch(action.type){
        case UsersActionTypes.getAll:
            return action.data;
        case UsersActionTypes.addNew:
            fetch(`ttp://localhost:8080/users` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.data)
        });
        return [...state, action.data];
        default:
            console.error(`Action type not found ${action.type}`);
            return state;
    }
}

const UsersProvider = ({children}) => {

    const [users, setUsers] = useReducer(reducer, []);
    const [loginUser, setLoginUser] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => setUsers({
                    type: UsersActionTypes.getAll,
                    data: data
                }))
    }, []);
    
    return (
        <UsersContext.Provider 
        value={{
            users, 
            setUsers, 
            loginUser, 
            setLoginUser
        }}>
            {children}
        </UsersContext.Provider>
    )
}
export {UsersProvider}
export default UsersContext;