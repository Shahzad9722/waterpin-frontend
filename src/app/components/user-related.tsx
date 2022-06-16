import styled from 'styled-components/macro';
import * as React from 'react';
import {Box, IconButton, ListItemIcon, Menu, MenuItem} from '@mui/material';
import { BsThreeDots } from 'react-icons/bs';
import { FaCcMastercard } from 'react-icons/fa';

interface Props {
  verified:boolean;
  first_name:string;
  last_name?:string;
  avatar:string;
  rank:string;
  numOfReviews:number;
}

interface ReviewProps {
  first_name:string;
  last_name?:string;
  avatar:string;
  rank:string;
  date:string;
  review:string;
}

interface RankDisplayProps {
  rank:string;
  points?:string;
}


export const AvatarCircleWithRank: React.FC<{firstName:string, lastName:string, avatar:string, rank:string, w:string, h:string}> = ({avatar, rank, w, h, firstName,lastName}) => {

  function renderRankIcon(rankName:string) {
    let iconColor = ''
    switch (true) {
      case rankName === "new":
        iconColor = 'linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.76) 51.04%, #00C2CB 100%)'
        break;
      case rankName === "bronze":
        iconColor = 'linear-gradient(180deg, #D09E84 0%, #FFE6D9 48.96%, #986A55 100%)'
        break;
      case rankName === "silver":
        iconColor = 'linear-gradient(180deg, #D5D5D7 0%, #F5F5F5 48.96%, #A2A2A4 100%)'
        break;
      case rankName === "gold":
        iconColor = 'linear-gradient(180deg, #F3C63D 0%, #FFEBAD 54.17%, rgba(226, 176, 23, 0.94) 100%)'
        break;
      case rankName === "platinum":
        iconColor = "linear-gradient(180deg, #9815C3 0%, #CD2CFF 48.96%, #571670 100%)"
        break;
      default:
        iconColor = 'linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.76) 51.04%, #00C2CB 100%)'
        break;
    }
    return iconColor
  }

  return(
       <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} flexDirection={'column'} mt={1} justifyContent={'center'} textAlign={'center'}>
        <RankCircleForAvatar w={w} h={w} bgColor={renderRankIcon(rank)}>
          <AvatarIcon w={"92%"} h={"92%"} style={{padding:5, backgroundColor:"#fff"}} src={(avatar !== '' && avatar !== null) ? avatar : 'https://waterpin-images.s3.us-east-2.amazonaws.com/blank-profile-picture.png'}/>
        </RankCircleForAvatar>
        <h3 style={{marginBottom:"0.5rem"}}>{firstName} {lastName}</h3>
       </Box>
  )
}

export const RankDisplay: React.FC<RankDisplayProps> = ({rank, points}) => {

  function renderRankIcon(rankName:string) {
    let iconColor = ''
    switch (true) {
      case rankName === "new":
        iconColor = 'linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.76) 51.04%, #00C2CB 100%)'
        break;
      case rankName === "bronze":
        iconColor = 'linear-gradient(180deg, #D09E84 0%, #FFE6D9 48.96%, #986A55 100%)'
        break;
      case rankName === "silver":
        iconColor = 'linear-gradient(180deg, #D5D5D7 0%, #F5F5F5 48.96%, #A2A2A4 100%)'
        break;
      case rankName === "gold":
        iconColor = 'linear-gradient(180deg, #F3C63D 0%, #FFEBAD 54.17%, rgba(226, 176, 23, 0.94) 100%)'
        break;
      case rankName === "platinum":
        iconColor = "linear-gradient(180deg, #9815C3 0%, #CD2CFF 48.96%, #571670 100%)"
        break;
      default:
        iconColor = 'linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.76) 51.04%, #00C2CB 100%)'
        break;
    }
    return(
      <RankCircle w={"20px"} h={"20px"} bgColor={iconColor}/>
    )
  }

  return(
       <Box display={'flex'} alignItems={'center'} flexDirection={'row'}>
          <Box>
            {renderRankIcon(rank)}
          </Box>
          <Box pl={1}>
            {points} Points
          </Box>
       </Box>
  )
}

export const AvatarCardWithReviews: React.FC<Props> = ({first_name, last_name, avatar, rank, numOfReviews, verified}) => {
  return(
       <Box display={'flex'} alignItems={'center'}>
          <Avatar src={(avatar !== '' && avatar !== null) ? avatar : 'https://waterpin-images.s3.us-east-2.amazonaws.com/blank-profile-picture.png'}/>
          <Box pl={2}>
            <UserName>{first_name} {last_name}</UserName>
            <Box display={'flex'} alignItems={'center'}>
              <Box display={'flex'} alignItems={'center'}>
                <AvatarIcon w={'20px'} h={'20px'} src={process.env.PUBLIC_URL + '/icons/listing/gold-star.svg'}/>
                <AvatarText>{numOfReviews} Reviews</AvatarText>
              </Box>
              <Box display={'flex'} alignItems={'center'} pl={2}>
                <AvatarIcon w={'20px'} h={'20px'} src={process.env.PUBLIC_URL + '/icons/listing/verified.svg'}/>
                <AvatarText>{verified === true ? "Identity Verified" : "Not Verified"}</AvatarText>
              </Box>
            </Box>
          </Box>
       </Box>
  )
}


export const ReviewCard: React.FC<ReviewProps> = ({first_name, last_name, avatar, rank, date, review}) => {
  return(
       <Box display={'flex'} alignItems={'flex-start'} flexDirection={'column'} mt={1}>
          <Box display={'flex'} alignItems={'center'}>
          <Avatar src={(avatar !== '' && avatar !== null) ? avatar : 'https://waterpin-images.s3.us-east-2.amazonaws.com/blank-profile-picture.png'}/>
          <Box pl={2}>
            <UserName>{first_name} {last_name}</UserName>
            <Box display={'flex'} alignItems={'center'}>
              <AvatarText style={{marginTop:10}}>{date}</AvatarText>
            </Box>
          </Box>
          </Box>
          <Box>
            <p>{review}</p>
          </Box>
       </Box>
  )
}


export const EditIconComponent: React.FC<{onClick:any}> = ({onClick}) => {
  return(
    <EditIcon onClick={onClick}>
      <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
    </EditIcon>
  )
}


export const UploadNewIconComponent: React.FC<{onClick:any}> = ({onClick}) => {
  return(
    <EditIcon onClick={onClick}>
      <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
    </EditIcon>
  )
}




export const PaymentMethodActionsMenu: React.FC<{pm_method:any}> = ({children, pm_method}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, set_open] = React.useState(false);
  const handleClick = (event) => {
    if (open) {
      set_open(false);
    }else{
      setAnchorEl(event.currentTarget)
      set_open(true);
    }
  };
  const handleClose = () => {
    set_open(false);
  };

  const handleMenuClick = (event) => {
    // if (open) {
    //   set_open(false);
    // }else{
    //   setAnchorEl(event.currentTarget)
    //   set_open(true);
    // }
  };

  return (
    <>
    <IconButton onClick={handleClick} size="medium" sx={{ ml: 2 }}>
      <BsThreeDots/>
    </IconButton>

    <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClick}
        onClick={handleClick}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            borderRadius: 2,
            width: 235,
            mt: 4,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
          <CustomMenuItem onClick={handleMenuClick}>
            Edit
          </CustomMenuItem>
          <CustomMenuItem onClick={handleMenuClick}>
            Make Default
          </CustomMenuItem>
          <CustomMenuItem onClick={handleMenuClick}>
            Remove
          </CustomMenuItem>
      </Menu>
    </>
  );
}


export const PaymentMethodComponent: React.FC<{method:any}> = ({method}) => {
  return(
    <PaymentMethodContainer>
      <Box display={'flex'}>
        <Box mr={2}>
          <CCIcon >
            <img src={process.env.PUBLIC_URL + '/mastercard.svg'}/>
          </CCIcon>
        </Box>
        <Box>
          <PaymentMethodCardNumber>
          {method.card_type} * * * * * {method.cardNumber}
          </PaymentMethodCardNumber>
          <PaymentMethodCardExpiration>
          Expiration: {method.exp_month}/{method.exp_year}
          </PaymentMethodCardExpiration>
        </Box>
      </Box>
      <Box display={'flex'}>
        {method.active &&
          <PaymentMethodDefault>Default</PaymentMethodDefault>
        }
        <PaymentMethodActionsMenu pm_method={null}/>
      </Box>
    </PaymentMethodContainer>
  )
}

export function renderPaymentMethods(pms:any[]) {
  if (pms === undefined || pms === null) {
    return null
  }
  let renderList:any = []
  pms.forEach(method => {
    renderList.push(
      <PaymentMethodComponent method={method}/>
    )
  });
  return(<>
    {renderList}
  </>
  )
}


const CustomMenuItem = styled(MenuItem)`
  && {
    min-height:40px;
  }
`;


const CCIcon = styled.div`
  width:60px;
  height:50px;
  background-color:#fff;
  padding:10px;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
`;


const PaymentMethodDefault = styled.p`
  font-family: GilroyBold;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  text-transform: uppercase;
  color: #007CFF;

`;

const PaymentMethodCardExpiration = styled.div`
  font-family: GilroyMedium;
  font-size: 14px;
  line-height: 16px;
  color: #828282;
  margin-top:10px;
`;


const PaymentMethodCardNumber = styled.div`
  font-family: GilroyBold;
  font-size: 16px;
  line-height: 19px;
  color: #333333;
`;

const PaymentMethodContainer = styled.div`
  display:flex;
  width:100%;
  justify-content:space-between;
  flex-direction:row;
  padding:25px;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top:10px;
  align-items:center;
`;



export const EditIcon = styled.div`
  width:45px;
  height:45px;
  cursor:pointer;
  float:right;
  img{
    width:100%;
    height:100%;
  }

  &:hover{
    opacity: 0.70;
  }
`;

export const ActionIcon = styled.div`
  width:120px;
  height:45px;
  cursor:pointer;
  float:right;
  img{
    width:100%;
    height:100%;
  }

  &:hover{
    opacity: 0.70;
  }
`;


export const AvatarIcon = styled.img<{w:string, h:string}>`
  background-color:#BDBDBD;
  border-radius:50%;
  ${({ w }) => w && `
    width: ${w};
   `}

   ${({ h }) => h && `
     height: ${h};
    `}

`;



export const Avatar = styled.img`
  width:70px;
  height:70px;
  border-radius:120px;
`;


const AvatarText = styled.p`
  font-family: GilroyMedium;
  font-size: 16px;
  color: #6D6D6D;
`;

export const RankCircle = styled.div<{w:string, h:string, bgColor:string}>`
  background-color:#BDBDBD;
  border-radius:100%;
  ${({ w }) => w && `
    width: ${w};
   `}

   ${({ h }) => h && `
     height: ${h};
    `}

  ${({ bgColor }) => bgColor && `
    background: ${bgColor};
   `}

`;

export const RankCircleForAvatar = styled.div<{w:string, h:string, bgColor:string}>`
  display:flex;
  justify-content:center;
  flex-direction: row;
  align-items:center;
  text-align:center;
  background-color:#BDBDBD;
  border-radius:100%;
  ${({ w }) => w && `
    width: ${w};
   `}

   ${({ h }) => h && `
     height: ${h};
    `}

  ${({ bgColor }) => bgColor && `
    background: ${bgColor};
   `}
`;


const UserName = styled.p`
  font-family: GilroyBold;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  margin-bottom:0px;
`;

export const ModalTitle = styled.h1`
  font-family: GilroyBold;
  font-size: 1vw;
  line-height: 36px;
  text-align: center;
  color: #000;
`;

export const Divider = styled.div`
  border-bottom: 1.5px solid #e0e0e0;
  height:1px;
  width:100%;
`;


export const ModalBody = styled.div`
  padding: 2.604vw;
  max-height: 600px;
  overflow-y: auto;
  width:100%;
`;
