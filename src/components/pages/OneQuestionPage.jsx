import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import UsersContext from "../../contexts/UsersContext";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";
import Comment from "../UI/Comment";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';

const StyledSection = styled.section`
    >button{
        border: none;
        background-color: transparent;
        margin: 20px;
        font-size: 20px;
        >a >i{
            color: black;
        }
    }
    >div{
        border: 1px solid #ab5fc0;
        border-radius: 5px;
        margin: 10px 0;
        text-align: center;
        margin: 20px;
        padding: 15px;
        >h4{
            margin-top: 0;
        }
        >h2{
            border-bottom: 1px dashed #ab5fc0;
            padding-bottom: 10px;
        }
        >div:nth-child(1){
            display: flex;
            justify-content: space-between;
            >button{
                border: none;
                background-color: transparent;
                >i:hover{
                    text-decoration: underline;
                    color: #e276fd;
                }
            }
        }
        >div:nth-child(2){
            display: flex;
            flex-direction: column;
        }
        >form{
            display: flex;
            justify-content: center;
            >div{
                display: flex;
                align-items: center;
                gap: 10px;
                >textarea{
                    width: 400px;
                    height: 25px;
                    border-radius: 5px 0 0 5px;
                }
            }
            >button{
                border-radius: 0 5px 5px 0;
                border: 1px solid #ab5fc0;
                background-color: #ab5fc0;
                
            }
        }
    }
`;
const OneQuestionPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { loginUser } = useContext(UsersContext);
    const { setQuestions, questions } = useContext(QuestionsContext);
    const question = questions.find(question => question.id === id);

    const formik = useFormik({
        initialValues: {
            text: ''
        },
        validationSchema: Yup.object({
            text: Yup.string()
            .min(5, 'Must be 5 characters or more')
            .max(300, 'Must be 300 characters or less')
            .required('Required')
            .trim()
        }),
        onSubmit: (values) => {
            const newComment = {
                id: uuid(),
                questionId: question.id,
                userId: loginUser.id,
                text: values.text
            }
            setQuestions({
                type: QuestionsActionTypes.addComment,
                comment: newComment,
                questionId: question.id
            });
            formik.resetForm();
        }
    });

    return ( 
        <StyledSection>
        {
            questions.length &&
            <div>
                <div>
                {
                    loginUser.id === question.userId && 
                    <button onClick={() => 
                        navigate(`/${question.id}/edit`)}><i className="bi bi-pencil"></i></button>
                }
                {
                    loginUser.id === question.userId && 
                    <button onClick={() => {
                        setQuestions({
                            type: QuestionsActionTypes.delete,
                            id: question.id
                        });
                        navigate('-1');
                    }}><i className="bi bi-trash"></i></button>
                }
                </div>
                <h4>{question.topic}</h4>
                <h2>{question.question}</h2>
                <div>
                    {
                        question.comments?.map(comment => 
                            <Comment 
                            key={comment.id} 
                            comment={comment}
                            questionId={question.id}
                            />
                        )
                    }
                </div>
                {
                    loginUser && 
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="text">Comment:</label>
                            <textarea
                                name="text" id="text" 
                                placeholder="Write your comment here..." 
                                value={formik.values.text}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.text && formik.errors.text && 
                            <p>{formik.errors.text}</p>}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                }
            </div> 
        }
        </StyledSection>
     );
}
 
export default OneQuestionPage;