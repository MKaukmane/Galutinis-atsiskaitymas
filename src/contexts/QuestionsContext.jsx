import { createContext, useEffect, useReducer } from "react";

const QuestionsContext = createContext();

export const QuestionsActionTypes = {
    getAll: 'fetch all data',
    addNew: 'addNew question to the data',
    delete: 'delete one specific question',
    edit: 'edit one specific question',
    addComment: 'add new comment to the specific question',
    deleteComment: 'delete one specific comment from the question',
    editComment: 'edit one specific comment from the question',
    likesQuestion: 'like one specific question',
    dislikeQuestion: 'dislike one specific question',
    mostComments: 'sort by most comments',
    lessComments: 'sort by less comments',
    noComment: 'filter by no comments',
    withComment: 'filter by with comments'
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

        case QuestionsActionTypes.editComment:
            const questionToEditComment = state.find(item => item.id === action.questionId);
            const editedComments = questionToEditComment.comments.map(comment => {
                if(comment.id === action.comment.id){
                    return action.comment;
                } else {
                    return comment;
                }
            });
            const editedQuestion = {
                ...questionToEditComment,
                comments: editedComments
            };
            fetch(`http://localhost:8080/questions/${action.questionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedQuestion)
            });
            return state.map(item => {
                if(item.id === action.questionId){
                    return editedQuestion;
                } else {
                    return item;
                }
            });

        case QuestionsActionTypes.likesQuestion:
            const questionToLike = state.find(item => item.id === action.id);
            if (!questionToLike.likes.includes(questionToLike.userId)) {
                const likedQuestion = {
                    ...questionToLike,
                    likes: [...questionToLike.likes, questionToLike.userId]
                };
                fetch(`http://localhost:8080/questions/${action.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(likedQuestion)
                });
                return state.map(item => item.id === action.id ? likedQuestion : item);
            } else {
                const likedQuestion = {
                    ...questionToLike,
                    likes: questionToLike.likes.filter((userId) => userId !== questionToLike.userId)
                };
                fetch(`http://localhost:8080/questions/${action.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(likedQuestion)
                });
                return state.map(item => item.id === action.id ? likedQuestion : item);
            }

        case QuestionsActionTypes.dislikeQuestion:
            const questionToDislike = state.find(item => item.id === action.id);
            if (!questionToDislike.dislikes.includes(questionToDislike.userId)) {
                const dislikedQuestion = {
                    ...questionToDislike,
                    dislikes: [...questionToDislike.dislikes, questionToDislike.userId]
                };
                fetch(`http://localhost:8080/questions/${action.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dislikedQuestion)
                });
                return state.map(item => item.id === action.id ? dislikedQuestion : item);
            } else {
                const dislikedQuestion = {
                    ...questionToDislike,
                    dislikes: questionToDislike.likes.filter((userId) => userId !== questionToDislike.userId)
                };
                fetch(`http://localhost:8080/questions/${action.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dislikedQuestion)
                });
                return state.map(item => item.id === action.id ? dislikedQuestion : item);
            }

        case QuestionsActionTypes.mostComments:
            return state?.sort((a, b) => b.comments.length - a.comments.length);
        case QuestionsActionTypes.lessComments:
            return state?.sort((a, b) => a.comments.length - b.comments.length);

        case QuestionsActionTypes.noComment:
            return state?.filter(item => item.comments.length === 0);
        case QuestionsActionTypes.withComment:
            return state?.filter(item => item.comments.length > 0);
            
        default:
            console.error(`Action type not found ${action.type}`);
            return state;
    }
}

const QuestionsProvider = ({children}) => {
         
        const [questions, setQuestions] = useReducer(reducer, []);

        const refetch = async () => {
            await fetch('http://localhost:8080/questions')
            .then(response => response.json())
            .then(data => setQuestions({
                type: QuestionsActionTypes.getAll,
                data: data
            }))
        }
    
        useEffect(() => {
            refetch();
        }, []);
    
        return (
            <QuestionsContext.Provider 
            value={{
                questions, 
                setQuestions,
                refetch
            }}>
                {children}
            </QuestionsContext.Provider>
        )
}
export {QuestionsProvider}
export default QuestionsContext;