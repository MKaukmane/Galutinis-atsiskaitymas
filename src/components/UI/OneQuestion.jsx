import styled from "styled-components";
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import UsersContext from "../../contexts/UsersContext";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";
import { Link, NavLink, useNavigate } from "react-router-dom";

const StyledDiv = styled.div`
    border: 1px solid #ab5fc0;
    border-radius: 5px;
    margin: 10px 0;
    padding-bottom: 15px;
    >a{
        text-decoration: none;
        color: black;
    }
    >a:hover{
        text-decoration: underline;
        color: #e276fd;
    }
    >div{
        >button{
            border: none;
            background-color: transparent;
            margin-top: 10px;
            >i:hover{
                color: #e276fd;
            }

        }
    }
`;

const OneQuestion = ({data, location}) => {

    const { setQuestions } = useContext(QuestionsContext);
    const { loginUser } = useContext(UsersContext);
    const navigate = useNavigate();

    return ( 
        <StyledDiv>
            <h4>{data.topic}</h4>
            <h2>{data.question}</h2>
            <Link to={`/${data.id}`}>More info...</Link>
                <div>
                    
                    <button onClick={() => {
                        setQuestions({
                            type: QuestionsActionTypes.likesQuestion,
                            id: data.id
                        })
                    }}>
                        <i className="bi bi-hand-thumbs-up"></i>
                        {loginUser ? 
                        data.likes.length
                        : <div><NavLink to='/user/login'></NavLink></div>}
                    </button>
                    <button onClick={() => {
                        setQuestions({
                            type: QuestionsActionTypes.dislikeQuestion,
                            id: data.id
                        })
                    }}>
                        <i className="bi bi-hand-thumbs-down"></i>
                        {loginUser ? 
                        data.dislikes.length
                        : <div><NavLink to='/user/login'></NavLink></div>}
                    </button>
                </div>

            
        </StyledDiv>
     );
}
 
export default OneQuestion;