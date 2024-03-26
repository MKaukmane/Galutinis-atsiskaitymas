import styled from "styled-components";
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import OneQuestion from "../UI/OneQuestion";
import { useLocation } from "react-router-dom";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";

const StyledSection = styled.section`
    text-align: center;
    margin: 20px;

    >h1{
        color: #ab5fc0;
    }
`;

const Home = () => {

    const {questions, setQuestions} = useContext(QuestionsContext);
    const location = useLocation();

    return ( 
        <StyledSection>
            <h1>All questions</h1>
            <button onClick={() => {
                setQuestions({
                    type: QuestionsActionTypes.mostComments
                })  
            }}
            >Most comments</button>
            <button onClick={() => {
                setQuestions({
                    type: QuestionsActionTypes.lessComments
                })  
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
