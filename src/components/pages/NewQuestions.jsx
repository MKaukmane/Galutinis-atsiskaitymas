import styled from 'styled-components';
import UsersContext from '../../contexts/UsersContext';
import QuestionContext from '../../contexts/QuestionsContext';
import { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { QuestionsActionTypes } from '../../contexts/QuestionsContext';

const StyledSection = styled.section`
margin-left: 50px;
    >button{
        border: none;
        background-color: transparent;
        margin-top: 20px;
        font-size: 20px;
        >a {
            >i{
                color: black;
            }
            >i:hover{
                color: #e276fd;
            }
        }
    }
    >h2{
        font-size: 1.8rem;
        color: #ab5fc0;
    }
    >form{
        display: flex;
        flex-direction: column;
        gap: 10px;
        >div{
            width: 400px;
            display: grid;
            grid-template-columns: 1fr 3fr;
            >label{
                padding: 5px 0;
            }
            >input{
                border-radius: 5px;
                border: 1px solid black;
                padding: 5px;
            }
            >p{
                grid-column: span 2;
                color: #e276fd;
                text-align: center;
            }
        }
        >button{
            width: 100px;
            margin-left: 300px;
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #ab5fc0;
            background-color: transparent;
        }
        >button:hover{
            color: #e276fd;
        }
    }
`;

const NewQuestions = () => {

    const navigate = useNavigate();
    const { loginUser } = useContext(UsersContext);
    const { setQuestions } = useContext(QuestionContext);

    const formik = useFormik({
        initialValues: {
            topic: '',
            question: ''
        },
        onSubmit: values => {
            const newCard = {
                id: uuid(),
                userId: loginUser.id,
                topic: values.topic,
                question: values.question,
                likes: [],
                dislikes: [],
                comments: []
            }
            setQuestions({
                type: QuestionsActionTypes.addNew,
                data: newCard
            });
            navigate(-1);
        },
        validationSchema: yup.object({
            topic: yup.string()
                .min(3, 'Topic must be at least 3 characters')
                .max(20, 'Topic must be at most 20 characters')
                .required('Topic is required')
                .trim(),
            question: yup.string()
                .min(10, 'Question must be at least 10 characters')
                .max(100, 'Question must be at most 100 characters')
                .required('Question is required')
                .trim()
        })
    });

    return ( 
        <StyledSection>
            <button><Link to="/"><i className="bi bi-arrow-left"></i></Link></button>
            <h2>Add new question</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor='topic'>Topic:</label>
                    <input 
                    type='text' 
                    id='topic' name='topic' 
                    onChange={formik.handleChange} 
                    value={formik.values.topic} 
                    onBlur={formik.handleBlur}
                    />
                    {formik.touched.topic && formik.errors.topic && 
                    <p>{formik.errors.topic}</p>}
                </div>
                <div>
                    <label htmlFor='question'>Question:</label>
                    <input 
                    type='text' 
                    id='question' name='question' 
                    onChange={formik.handleChange} 
                    value={formik.values.question} 
                    onBlur={formik.handleBlur}
                    />
                    {formik.touched.question && formik.errors.question && 
                    <p>{formik.errors.question}</p>}
                </div>
                <button type='submit'>Add question</button>
            </form>
        </StyledSection>
     );
}
 
export default NewQuestions;