import styled from 'styled-components/macro';
import * as React from 'react';

export const MenuTreeItemLink = styled.a<{isActive?:boolean}>`
  padding: 10px 20px;

  ${({ isActive }) => isActive && `
    color: #fff;
    background: linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.76) 51.04%, #00C2CB 100%);
    border-radius: 10px;
   `}

  &&:hover{
    color: #fff;
    background: linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.76) 51.04%, #00C2CB 100%);
    border-radius: 10px;
  }
`;

export const MenuTreeItemSecondary = styled.div`
  display:flex;
  align-items:center;
  background: #FFFFFF;
  padding: 5px 35px;
  justify-content:space-between;
  font-family: GilroyMedium;
  font-size: 20px;
  line-height: 20px;
  font-size: 20px;
  color: #828282;
  cursor:pointer;

  :first-child{
    border-radius:10px 10px 0px 0px;
  }
  :last-child{
    border-radius:0px 0px 10px 10px;
  }
`;

export const MenuTreeItem = styled.div`
  display:flex;
  align-items:center;
  min-height:60px;
  background: #FFFFFF;
  margin-bottom:5px;
  padding: 10px 35px;
  justify-content:flex-start;
  font-family: GilroyBold;
  font-size: 20px;
  line-height: 23px;
  font-size: 20px;
  color: #333333;
  cursor:pointer;

  &&:hover{
    color: #000;
  }
  :first-child{
    border-radius:10px 10px 0px 0px;
  }
  :last-child{
    border-radius:0px 0px 10px 10px;
  }
`;

export const MenuTreeFlex = styled.div`
  display:flex;
  margin-top:60px;
  flex-wrap:wrap;
`;

export const TreeContentCard = styled.div`
  display:flex;
  flex-direction:column;
  width: 100%;
  height: auto;
  min-height: auto;
  background: #F5F5F7;
  border-radius: 20px;
  padding:15px;
`;

export const TreeContentHeader = styled.div`
  display:flex;
  width: 100%;
  justify-content:space-between;
  align-items:center;
`;

export const TreeContentBox = styled.div`
  display:flex;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 15px;
  margin-bottom:10px;
  flex-direction:column;
  padding: 0px 25px;

`;

export const TreeContentLabel = styled.h2`
  font-family: GilroyBold;
  font-size: 20px;
  line-height: 23px;
  margin-bottom:5px;
`;

export const TreeContentText  = styled.p`
  font-family: GilroyRegular;
  font-size: 20px;
  line-height: 23px;
  margin-top:0px;
`;

export const AvatarImg = styled.img`
  height: 45px;
  width: 45px;
`;
export const AvatarImgContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  border-radius: 60px;
  /* Platinum */

  background: grey;
  opacity: 0.5;
  margin-right: 20px;
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  border: 1px solid #e0e0e0;
  opacity: 0.3;
`;

export const Card = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-bottom: 5px;
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(179, 179, 179, 0.25);
  border-radius: 20px;
`;

export const CardBase = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 5px;
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #E0E0E0;
`;

export const CardBaseHeaderFlex = styled.div`
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  flex-wrap:wrap;
  width:100%;
  align-items: center;
  padding: 0rem 1.5rem;
  min-height:60px;

  h1,h2,h3,h4,h5,h6{
    margin:0;
  }
`;

export const CardBaseBodyFlex = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  flex-wrap:wrap;
  width:100%;
  align-items: flex-start;
  padding: 1rem 2.5rem;
`;

export const DottedDivider = styled.div`
  border: 1px dashed #BDBDBD;
  width:100%;
  margin-bottom:5px;
`;
