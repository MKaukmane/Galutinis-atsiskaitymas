import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";

const Comment = ({comment, QuestionId}) => {

    const { loginUser, users } = useContext(UsersContext);
    const { setQuestions } = useContext(QuestionsContext);
    const author = users.find(user => user.id === comment.userId);

    return ( 
        <div>
            {
                users.length &&
                <div>
                    <p>Comment by: {author.userName}</p>
                    <p>{comment.text}</p>
                    {
                        loginUser.id === comment.authorId && 
                        <button 
                            onClick={() => setQuestions({
                                type: QuestionsActionTypes.deleteComment,
                                commentId: comment.id,
                                QuestionId: QuestionId
                            })}
                        ><i className="bi bi-trash"></i></button>
                    }
                </div>
            }
        </div>
     );
}
 
export default Comment;