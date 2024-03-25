import styled from "styled-components";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import * as Yup from 'yup';
import UsersContext from "../../contexts/UsersContext";
import { UsersActionTypes } from "../../contexts/UsersContext";
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

const StyledRegister = styled.div`
    margin-left: 50px; 
    >button{
        border: none;
        background-color: transparent;
        margin-top: 20px;
        font-size: 20px;
        >a >i{
            color: black;
        }
    }
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

const Register = () => {

    const navigate = useNavigate();
    const { users, setUsers, setLoginUser } = useContext(UsersContext);
    const [sameNameError, setSameNameError] = useState(false);

    const formik = useFormik({ 
        initialValues:{
            userName: "",
            email: "",
            password: "",
            passwordRepeat: ""
        },
        onSubmit: (values) => {
            if(users.find(user => user.userName === values.userName)){
               setSameNameError(true);
            } else {
                const newUser = {
                    id: uuid(),
                    userName: values.userName,
                    email: values.email,
                    password: bcrypt.hashSync(values.password, 10),
                    passwordNoHash: values.password
                };
                setUsers({
                    type: UsersActionTypes.addNew,
                    data: newUser
                });
                setLoginUser(newUser);
                navigate('/');
            }
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .min(5, 'Must be at least 5 characters')
                .max(25, 'Must be 25 characters or less')
                .required('Required')
                .trim(),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required')
                .trim(),
            password: Yup.string()
                .min(6, 'Must be at least 6 characters')
                .required('Required')
                .trim(),
            passwordRepeat: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Required')
                .trim()
        })
    });

    return ( 
        <StyledRegister>
            <button><Link to="/"><i className="bi bi-arrow-left"></i></Link></button>
            <h1>Register</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="userName">User name:</label>
                    <input 
                        type="text" 
                        id="userName" name="userName"
                        placeholder="Create your user name..."
                        value={formik.values.userName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.userName && formik.errors.userName && 
                    <p>{formik.errors.userName}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" name="email"
                        placeholder="Enter your email..."
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email && 
                    <p>{formik.errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" name="password"
                        placeholder="Create your password..."
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password &&
                    <p>{formik.errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="passwordRepeat">Repeat password:</label>
                    <input 
                        type="password" 
                        id="passwordRepeat" name="passwordRepeat"
                        placeholder="Repeat your password..."
                        value={formik.values.passwordRepeat}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.passwordRepeat && formik.errors.passwordRepeat &&
                    <p>{formik.errors.passwordRepeat}</p>}
                </div>
                <button type="submit">Register</button>
                {sameNameError && <div>User name already exists</div>}
            </form>
        </StyledRegister>
     );
}
 
export default Register;