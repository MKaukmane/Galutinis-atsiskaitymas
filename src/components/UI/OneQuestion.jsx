import styled from "styled-components";

const StyledDiv = styled.div`
    border: 1px solid #ab5fc0;
    margin: 10px 0;
`;

const OneQuestion = ({data}) => {
    return ( 
        <StyledDiv>
            <h4>{data.topic}</h4>
            <h2>{data.question}</h2>
        </StyledDiv>
     );
}
 
export default OneQuestion;