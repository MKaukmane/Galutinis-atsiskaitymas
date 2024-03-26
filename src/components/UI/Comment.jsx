import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";

const Comment = ({comment, questionId}) => {

    const { loginUser, users } = useContext(UsersContext);
    const { setQuestions } = useContext(QuestionsContext);
    const user = users.find(user => user.id === comment.userId);

    return ( 
        <>
        {
          users.length &&
          <div>
            <p>Comment by: {user.userName}</p>
            <p>{comment.text}</p>
            {
              loginUser.id === comment.userId &&
              <button 
                onClick={() => setQuestions({
                  type: QuestionsActionTypes.deleteComment,
                  commentId: comment.id,
                  questionId: questionId
                })
              }>Delete</button>
            }
          </div>
        }      
       </>
     );
}
 
export default Comment;