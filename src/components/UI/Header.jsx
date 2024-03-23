import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    font-size: 1.2rem;
    background-color: #f3f3f3;
    padding: 0 20px;
    >div{
        >a {
            text-decoration: none;
            color: black;
            >img{
                height: 50px;
            }
        }
        >a:hover{
            text-decoration: underline;
            color: #e276fd;
        }
    }
    >nav{
        >ul{
            list-style-type: none;
            >li{
                >a{
                    text-decoration: none;
                    color: black;

                }
                >a:hover{
                    text-decoration: underline;
                    color: #e276fd
                }
            }
        }
        >div{
            display: flex;
            gap: 10px;
            >p{
                >a{
                    text-decoration: none;
                    color: #e276fd;
                }
            }
            >button{
                border: none;
            }
        }
    }
`;

const Header = () => {

    const navigate = useNavigate();
    const { loginUser, setLoginUser } = useContext(UsersContext);

    return ( 
        <StyledHeader>
            <div><NavLink to='/addNew'>New question</NavLink></div>
            <div>
                <Link to="/">
                    <img src="https://iconape.com/wp-content/files/rl/183006/svg/183006.svg" alt="forum logo"/>
                </Link>
            </div>
            <nav>
                {
                    loginUser ?
                <div>
                    <p>
                        <Link to={`/user/${loginUser.userName}`}>{loginUser.userName}</Link>
                    </p>
                    <button 
                    onClick={() => {
                        setLoginUser(null);
                        navigate('/');
                    }}
                    ><i className="bi bi-box-arrow-right"></i></button>
                </div>:
                <ul>
                    <li>
                        <NavLink to='/user/login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to='/user/register'>Register</NavLink>
                    </li>
                </ul>
                }
            </nav>
        </StyledHeader>
     );
}
 
export default Header;