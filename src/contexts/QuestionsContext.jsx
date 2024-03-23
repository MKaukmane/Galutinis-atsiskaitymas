import { createContext, useEffect, useReducer } from "react";

const QuestionsContext = createContext();

export const QuestionsActionTypes = {
    getAll: 'fetch all data',
    addNew: 'addNew question to the data'
} 

const reducer = (state, action) => {
    switch(action.type){
        case QuestionsActionTypes.getAll:
            return action.data;
        case QuestionsActionTypes.addNew:
            fetch(`http://localhost:8080/questions` , {
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

const QuestionsProvider = ({children}) => {
         
        const [questions, setQuestions] = useReducer(reducer, []);
    
        useEffect(() => {
            fetch('http://localhost:8080/questions')
                .then(response => response.json())
                .then(data => setQuestions({
                    type: QuestionsActionTypes.getAll,
                    data: data
                }))
        }, []);
    
        return (
            <QuestionsContext.Provider 
            value={{
                questions, 
                setQuestions
            }}>
                {children}
            </QuestionsContext.Provider>
        )
}
export {QuestionsProvider}
export default QuestionsContext;