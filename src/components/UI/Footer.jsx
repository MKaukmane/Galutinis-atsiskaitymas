import styled from "styled-components";

const StyledFooter = styled.footer`
    text-align: center;
    font-size: 11px;
`;

const Footer = () => {
    return ( 
        <StyledFooter>
            <p>Copyrights &copy; 2024 by Fforum</p>
        </StyledFooter>
     );
}
 
export default Footer;