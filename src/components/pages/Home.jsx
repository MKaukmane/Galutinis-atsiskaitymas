import styled from "styled-components";
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import OneQuestion from "../UI/OneQuestion";
import { useLocation, useNavigate } from "react-router-dom";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";

const StyledSection = styled.section`
    text-align: center;
    margin: 20px;

    >h1{
        color: #ab5fc0;
    }
    >button{
        border: 1px solid #ab5fc0;
        border-radius: 5px;
        background-color: transparent;
        padding: 5px 10px;
        margin: 2px 10px;
    }
`;

const Home = () => {

    const {questions, setQuestions} = useContext(QuestionsContext);
    const location = useLocation();
    const navigate = useNavigate();

    return ( 
        <StyledSection>
            <h1>All questions</h1>
            <button onClick={() => {
                setQuestions({
                    type: QuestionsActionTypes.mostComments
                });
                navigate('/');  
            }}
            >Most comments</button>
            <button onClick={() => {
                setQuestions({
                    type: QuestionsActionTypes.lessComments
                });
                navigate('/');
            }}
            >Less comments</button>
            <div>
                {
                    questions.map(question => 
                        <OneQuestion 
                        key={question.id} 
                        data={question} 
                        location={location}
                        />
                    )
                }
            </div>
        </StyledSection>
     );
}
 
export default Home;
