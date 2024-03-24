import styled from "styled-components";
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import UsersContext from "../../contexts/UsersContext";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";

const StyledDiv = styled.div`
    border: 1px solid #ab5fc0;
    margin: 10px 0;
`;

const OneQuestion = ({data}) => {

    const { setQuestions } = useContext(QuestionsContext);
    const { loginUser } = useContext(UsersContext);

    return ( 
        <StyledDiv>
            <h4>{data.topic}</h4>
            <h2>{data.question}</h2>
            {
                loginUser.id === data.userId && 
                <button onClick={() => {
                    setQuestions({
                        type: QuestionsActionTypes.delete,
                        id: data.id
                    })
                }}><i className="bi bi-trash"></i></button>
            }
        </StyledDiv>
     );
}
 
export default OneQuestion;