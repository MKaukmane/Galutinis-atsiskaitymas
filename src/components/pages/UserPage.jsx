import styled from "styled-components";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import OneQuestion from "../UI/OneQuestion";

const StyledSection = styled.section`
    text-align: center;
    margin: 20px;

    >h1{
        color: #ab5fc0;
    }
    >p{
        a{
            text-decoration: none;
            color: black;
        }
        >a:hover{
            text-decoration: underline;
            color: #e276fd;
        }
    }
`;

const UserPage = () => {

    const { loginUser } = useContext(UsersContext);
    const { questions } = useContext(QuestionsContext);
    const location = useLocation();
    const userQuestions = questions.filter(question => question.userId === loginUser.id);

    return ( 
        <StyledSection>
            <h1>{loginUser.userName} Qusetions</h1>
            <p><Link to='/addNew'>Add new question</Link></p>
            {
                userQuestions.length ?
                <div>
                    {
                        userQuestions.map(question => 
                        <OneQuestion 
                        key={question.id} 
                        data={question} 
                        location={location}
                        />
                        )
                    }
                </div> :
                <p>No questions</p>
            }
        </StyledSection>
     );
}
 
export default UserPage;