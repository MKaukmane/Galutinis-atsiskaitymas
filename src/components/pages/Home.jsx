import styled from "styled-components";
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import OneQuestion from "../UI/OneQuestion";

const StyledSection = styled.section`
    text-align: center;
    margin: 20px;

    >h1{
        color: #ab5fc0;
    }
`;

const Home = () => {

    const {questions} = useContext(QuestionsContext);

    return ( 
        <StyledSection>
            <h1>All questions</h1>
            <div>
                {
                    questions.map(question => 
                        <OneQuestion 
                        key={question.id} 
                        data={question} 
                        />
                    )
                }
            </div>
        </StyledSection>
     );
}
 
export default Home;
