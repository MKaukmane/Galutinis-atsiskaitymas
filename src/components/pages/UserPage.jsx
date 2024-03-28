import styled from "styled-components";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import OneQuestion from "../UI/OneQuestion";

const StyledSection = styled.section`
    margin: 20px;
    >button{
        border: none;
        background-color: transparent;
        margin-top: 20px;
        font-size: 20px;
        text-align: left;
        >a {
            >i{
                color: black;
            }
            >i:hover{
                color: #e276fd;
            }
        }
    }
    >div{
        text-align: center;
        >h1{
        color: #ab5fc0;
        margin-top: 0;
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
    }
`;

const UserPage = () => {

    const { loginUser } = useContext(UsersContext);
    const { questions } = useContext(QuestionsContext);
    const location = useLocation();
    const userQuestions = questions.filter(question => question.userId === loginUser.id);

    return ( 
        <StyledSection>
            <button><Link to="/"><i className="bi bi-arrow-left"></i></Link></button>
            <div>
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
            </div>
        </StyledSection>
     );
}
 
export default UserPage;