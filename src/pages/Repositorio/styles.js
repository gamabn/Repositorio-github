import styled from "styled-components";
import { Link } from "react-router-dom";

export const Buttonthre = styled.div`
margin: 15px 0;

button{
  outline: 0;
  border: 0;
  padding: 8px;
  border-radius: 4px;
  margin: 0 3px;

  &:nth-child(${props => props.active + 1}){
    background: #0071db;
    color: #fff;
  }
}
`;

export const Loading = styled.div`
 color: #fff;
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100vh;
 background: #2c2c2c;
`;
 export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  margin: 80px auto;
  padding:  30px;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
 `;

export const Owner = styled.header`
 display: flex;
 flex-direction: column;
 align-items: center;
  img{
    width: 150px;
    border-radius: 20%;
    margin: 20px 0;
  }
  h1{
    font-size: 30px;
    color: #0d2636;
  }
  p{
    margin-top: 10px;
    font-size: 20px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;
export const BackButton = styled(Link)`
display: flex;
justify-content: flex-start;
align-items: center;
background: transparent;
 border: 0;
 outline: 0;
 
 

`;

export const IssuesList = styled.ul`
margin-top: 30px;
padding-top: 30;
border-top: 1px solid #2c2c2c;
list-style: none;

li{
  display: flex;
  padding: 15px 10px;
}

& li{
  margin-top: 13px
}
img{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px dolid #0d2636
}
div{
  flex: 1;
  margin-left: 12px;

  p{
    margin-top: 10px;
    font-size: 12px;
    color: #000;
  }
}

strong{
  font-size: 15px;

  a{
    text-decoration: none;
    color: #2c2c2c;
    transform: 0.3;

    &:hover{
      color: #0071db
    }
  }
}
span{
  background: #2c2c2c;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 7px;
  margin-left: 10px
}
`;

export const PagesAction = styled.div`
display: flex;
justify-content:space-between;
align-items: center;

 button{
  outline: 0;
  border: 0;
  background: #222;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;

  &:disabled{
    cursor: not-allowed;
    opacity: 0.2
  }
   


  }

 
`;

