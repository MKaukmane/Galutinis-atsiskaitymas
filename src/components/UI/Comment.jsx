import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";
import styled from "styled-components";

const StyledComment = styled.div`
  >div{
    display: grid;
    grid-template-columns: 1fr 3fr;
    justify-items: start;
    margin: 0 150px;
    >p:nth-child(2){
      display: flex;
      gap: 30px;
    }
    >p{
      >button {
        border: none;
        background-color: transparent;
        >i:hover{
          text-decoration: underline;
          color: #e276fd;
        }
      }
    }
  }
`;

const Comment = ({comment, questionId}) => {

    const { loginUser, users } = useContext(UsersContext);
    const { setQuestions } = useContext(QuestionsContext);
    const user = users.find(user => user.id === comment.userId);

    return ( 
        <StyledComment>
            {
                users.length && 
                <div>
                  <p>{user.userName}: </p>
                  <p>{comment.text}
                  {
                    loginUser.id === comment.userId &&
                      <button 
                        onClick={() => setQuestions({
                          type: QuestionsActionTypes.deleteComment,
                          commentId: comment.id,
                          questionId: questionId
                        })}
                      ><i className="bi bi-trash"></i></button>
                  }
                  </p>
                </div>
            }
        </StyledComment>
     );
}
 
export default Comment;