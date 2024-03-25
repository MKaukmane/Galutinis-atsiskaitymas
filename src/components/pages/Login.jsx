import styled from "styled-components";
import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

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

const Login = () => {

    const navigate = useNavigate();
    const [wrongInfo, setWrongInfo] = useState(false);
    const { users, setLoginUser } = useContext(UsersContext);

    const formik = useFormik({
        initialValues:{
            userName: "",
            password: ""
        },
        onSubmit: (values) => {
            const loginUser = users.find(user => user.userName === values.userName &&  bcrypt.compareSync(values.password, user.password));

            if(loginUser === undefined){
                setWrongInfo(true);
            } else {
                setLoginUser(loginUser);
                navigate('/');
            }

        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required("Username is required")
                .trim(),
            password: Yup.string()
                .required("Password is required")
                .trim()
        })
    });
    return ( 
        <StyledSection>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}> 
                <div>
                    <label htmlFor="userName">Username:</label>
                    <input 
                        type="text" 
                        id="userName" name="userName"
                        placeholder="Enter your user name..."
                        value={formik.values.userName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.userName && formik.errors.userName && 
                        <p>{formik.errors.userName}</p>
                    }
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" name="password"
                        placeholder="Enter your password..."
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange} 
                    />
                    {
                        formik.touched.password && formik.errors.password && 
                        <p>{formik.errors.password}</p>
                    }
                </div>
                <button type="submit">Login</button>
                {
                    wrongInfo && <p>Wrong username or password</p>
                }
            </form>
        </StyledSection>
     );
}
 
export default Login;