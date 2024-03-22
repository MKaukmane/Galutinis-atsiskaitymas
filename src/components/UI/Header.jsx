import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

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
                &:hover{
                    filter: invert(0.5);
                }
            }
        }
        >a:hover{
            text-decoration: underline;
            color: #e276fd
        }
    }
    >nav{
        >ul{
            display: flex;
            gap: 10px;
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
    }
`;

const Header = () => {
    return ( 
        <StyledHeader>
            <div><NavLink to='/addNew'>New question</NavLink></div>
            <div>
                <Link to="/">
                    <img src="https://iconape.com/wp-content/files/rl/183006/svg/183006.svg" alt="forum logo"/>
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/user/login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to='/user/register'>Register</NavLink>
                    </li>
                </ul>
            </nav>
        </StyledHeader>
     );
}
 
export default Header;