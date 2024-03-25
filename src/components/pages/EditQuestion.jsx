import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import * as yup from 'yup';
import { useFormik } from "formik";

const StyledSection = styled.section`
margin-left: 50px;
    >h1{
        font-size: 1.8rem;
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
            border: 1px solid black;
        }
    }
`;

const EditQuestion = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { questions, setQuestions } = useContext(QuestionsContext);
    const [initialValues, setInitialValues] = useState({ id:'', topic: '', question: '' }); 

    useEffect(() => {
        const questionToEdit = questions.find(question => question.id === id);
        if (questionToEdit) {
            setInitialValues({
                id: id,
                userName: questionToEdit.userName,
                topic: questionToEdit.topic,
                question: questionToEdit.question
            });
        }
    }, [id, questions]);

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) =>{
            const editQuestion = questions.map(question => {
                if(question.id === id){
                    return {
                        ...question,
                        topic: values.topic,
                        question: values.question
                    }
                }
                return {...question};
            });
            setQuestions(editQuestion);
            navigate('/');
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
            <h1>Edit question</h1>
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
                    <div>{formik.errors.topic}</div>}
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
                    <div>{formik.errors.question}</div>}
                </div>
                <button type='submit'>Edit</button>
            </form>
        </StyledSection>
     );
}
 
export default EditQuestion;