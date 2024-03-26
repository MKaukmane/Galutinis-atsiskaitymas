import { createContext, useEffect, useReducer } from "react";

const QuestionsContext = createContext();

export const QuestionsActionTypes = {
    getAll: 'fetch all data',
    addNew: 'addNew question to the data',
    delete: 'delete one specific question',
    edit: 'edit one specific question',
    addComment: 'add new comment to the specific question',
    deleteComment: 'delete one specific comment from the question'
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
        case QuestionsActionTypes.delete:
            fetch(`http://localhost:8080/questions/${action.id}`, {
                method: 'DELETE'
            });
            return state.filter(item => item.id !== action.id);
        case QuestionsActionTypes.edit:
            fetch(`http://localhost:8080/questions/${action.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.data)
            });
            return state.map(item => item.id === action.id ? action.data : item);
        case QuestionsActionTypes.addComment:
            const questionToAddComment = state.find(item => item.id === action.questionId);
            const commentedQuestion = {
                ...questionToAddComment,
                comments: questionToAddComment.comments ? [...questionToAddComment.comments, action.comment] : [action.comment]
            };
            fetch(`http://localhost:8080/questions/${action.questionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentedQuestion)
            });
            return state.map(item => {
                if(item.id === action.questionId){
                    return commentedQuestion;
                } else {
                    return item;
                }
            });
        case QuestionsActionTypes.deleteComment:
            const questionToChange = state.find(item => item.id === action.questionId);
            const changedQuestion = {
                ...questionToChange,
                comments: questionToChange.comments.filter(comment => comment.id !== action.commentId)
            };
            fetch(`http://localhost:8080/questions/${action.questionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(changedQuestion)
            });
            return state.map(item => {
                if(item.id === action.questionId){
                    return changedQuestion;
                } else {
                    return item;
                }
            });
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