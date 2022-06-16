import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton } from '@mui/material';
import { Nav } from '../../components/Nav';
import { Search } from '../../components/Search';
import { useSelector, useDispatch } from 'react-redux';
import { useTripsSlice } from './slice';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { BasicModal } from '../../components/modals';
import { useHistory } from 'react-router-dom';

interface Props {
  trip:any;
  clk:any;
  index:number;
  view?:string;
}

export function TripCard(props:Props) {
  const history = useHistory();

  const { actions } = useTripsSlice();
  const dispatch = useDispatch();

  const [trips, set_trips] = React.useState([]);
  const [activeBar, set_activeBar] = React.useState(0);
  const [tripDetailActive, set_tripDetailActive] = React.useState(false);



  function renderStatus(status:string) {
    let color = ""
    let icon = ""
    switch (true) {
      case status === "Pending":
        color = "blue"
        break;
      case status === "Confirmed":
        color = "#F2994A"
        icon = 'flag.svg'
        break;
      case status === "Completed":
        color = "#219653"
        icon = 'green-check.svg'
        break;
      case status === "Cancelled":
        color = "#FF0000"
        icon = 'close.svg'
        break;
      default:
        color = "blue"
        break;
    }
    return (<Box display={'flex'} alignItems={'center'}>
              <CardValues style={{color:color, paddingRight:8}}>{status ? status : "No status found"}</CardValues>
              {icon !== '' &&
                <img src={process.env.PUBLIC_URL+'/'+icon}/>
              }
            </Box>)
  }

  return (<>
    {props.view === "owner"
      ? (
        <MainCard>
          <CardTopSection>
            <Box display={'flex'} flexDirection={'column'} flex={1} justifyContent={'space-between'}>
              <CardProfile>
                  <AvatarImg src={props.trip.renter?.profileImage?props.trip.renter?.profileImage: 'https://sgmh.org/wp-content/uploads/2017/07/placeholder-user.png'}/>
                  <CardValues style={{marginTop:15, marginBottom:5}}>{props.trip.renter?.firstName? props.trip.renter?.firstName:"-"} {props.trip.renter?.lastName? props.trip.renter?.lastName:"-"}</CardValues>
              </CardProfile>
              <div>
                <Mail>
                    <img style={{paddingRight:5}} src={process.env.PUBLIC_URL+'/email-icon.svg'}/>
                    <span>{props.trip.renter?.email?props.trip.renter?.email: "No email found"}</span>
                </Mail>
                <Phone>
                    <img style={{paddingRight:5}} src={process.env.PUBLIC_URL+'/phone-icon.svg'}/>
                    <span>{props.trip.renter?.phoneNumber?props.trip.renter?.phoneNumber:"No Phone Number"}</span>
                </Phone>
              </div>
            </Box>
            <Box>
              <CardImage>
              <img src={(props.trip.listing?.images && props.trip.listing?.images.length > 0 && props.trip.listing?.images[0].location) || `https://westcoastdocs.com/wp-content/uploads/2018/06/image-placeholder-large.jpg`} />
              </CardImage>
            </Box>
          </CardTopSection>
          <CardMidSection>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'30%'} mt={2} style={{cursor:"pointer"}} onClick={()=>history.push(`/messages?renter_id=${props.trip?.renter_user_id}&listing_id=${props.trip?.list_id}`)}>
              <img style={{paddingRight:5}} src={process.env.PUBLIC_URL+'/message-bubble.svg'}/>
              <CardValues>Message Now</CardValues>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mt={2}>
              <img style={{paddingRight:5}} src={process.env.PUBLIC_URL+'/pin.svg'}/>
              <b><a href={`/listings/detail/${props.trip?.list_id}`}>{props.trip.listing?.marina_name? props.trip.listing?.marina_name :"No Location found."}</a></b>
            </Box>
          </CardMidSection>
          <CardMidSection>
            <Box display={'flex'} alignItems={'flex-start'} alignContent={'flex-start'} flexDirection={'column'} p={2}>
              <Label>Date:</Label>
              <CardValues>{props.trip.booking_dates ? props.trip.booking_dates : "No dates found"}</CardValues>
            </Box>
            <Box display={'flex'} alignItems={'flex-start'} alignContent={'flex-start'} flexDirection={'column'} p={2}>
              <Label>Duration:</Label>
              <CardValues>{props.trip.booking_duration ? props.trip.booking_duration : "No duration found"}</CardValues>
            </Box>
            <Box display={'flex'} alignItems={'flex-start'} alignContent={'flex-start'} flexDirection={'column'} p={2}>
              <Label>Payout:</Label>
              <CardValues>${props.trip.total ? props.trip.total : "No price found"}</CardValues>
            </Box>
          </CardMidSection>
          <CardDivider/>
          <CardFooterSection>
            <Box display={'flex'} alignItems={'center'}>
              <Label style={{marginBottom:0, paddingRight:10}}>Status:</Label>
              {renderStatus(props.trip.status)}
            </Box>
            <Box>
              <MoreDetails onClick={()=> props.clk(props.trip,props.index)}>
                  <a>More Details</a>
              </MoreDetails>
            </Box>
          </CardFooterSection>
        </MainCard>
      )
      : (
        <MainCard>
          <CardTopSection>
            <Box display={'flex'} flexDirection={'column'} flex={1} justifyContent={'space-between'}>
              <CardProfile>
                  <AvatarImg src={props.trip.owner?.profileImage?props.trip.owner?.profileImage: 'https://sgmh.org/wp-content/uploads/2017/07/placeholder-user.png'}/>
                  <CardValues style={{marginTop:15, marginBottom:5}}>{props.trip.owner?.firstName? props.trip.owner?.firstName:"-"} {props.trip.owner?.lastName? props.trip.owner?.lastName:"-"}</CardValues>
              </CardProfile>
              <div>
                <Mail>
                    <img style={{paddingRight:5}} src={process.env.PUBLIC_URL+'/email-icon.svg'}/>
                    <span>{props.trip.owner?.email?props.trip.owner?.email: "No email found"}</span>
                </Mail>
                <Phone>
                    <img style={{paddingRight:5}} src={process.env.PUBLIC_URL+'/phone-icon.svg'}/>
                    <span>{props.trip.owner?.phoneNumber?props.trip.owner?.phoneNumber:"No Phone Number"}</span>
                </Phone>
              </div>
            </Box>
            <Box>
              <CardImage>
              <img src={(props.trip.listing?.images && props.trip.listing?.images.length > 0 && props.trip.listing?.images[0].location) || `https://westcoastdocs.com/wp-content/uploads/2018/06/image-placeholder-large.jpg`} />
              </CardImage>
            </Box>
          </CardTopSection>
          <CardMidSection>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'30%'} mt={2} style={{cursor:"pointer"}} onClick={()=>history.push(`/messages?owner_id=${props.trip?.owner_id}&listing_id=${props.trip?.list_id}`)}>
              <img style={{paddingRight:5}} src={process.env.PUBLIC_URL+'/message-bubble.svg'}/>
              <CardValues>Message Now</CardValues>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mt={2}>
              <img style={{paddingRight:5}} src={process.env.PUBLIC_URL+'/pin.svg'}/>
              <b><a href={`/listings/detail/${props.trip?.list_id}`}>{props.trip.listing?.marina_name? props.trip.listing?.marina_name :"No Location found."}</a></b>
            </Box>
          </CardMidSection>
          <CardMidSection>
            <Box display={'flex'} alignItems={'flex-start'} alignContent={'flex-start'} flexDirection={'column'} p={2}>
              <Label>Date:</Label>
              <CardValues>{props.trip.booking_dates ? props.trip.booking_dates : "No dates found"}</CardValues>
            </Box>
            <Box display={'flex'} alignItems={'flex-start'} alignContent={'flex-start'} flexDirection={'column'} p={2}>
              <Label>Duration:</Label>
              <CardValues>{props.trip.booking_duration ? props.trip.booking_duration : "No duration found"}</CardValues>
            </Box>
            <Box display={'flex'} alignItems={'flex-start'} alignContent={'flex-start'} flexDirection={'column'} p={2}>
              <Label>Payment:</Label>
              <CardValues>${props.trip.total ? props.trip.total : "No price found"}</CardValues>
            </Box>
          </CardMidSection>
          <CardDivider/>
          <CardFooterSection>
            <Box display={'flex'} alignItems={'center'}>
              <Label style={{marginBottom:0, paddingRight:10}}>Status:</Label>
              {renderStatus(props.trip.status)}
            </Box>
            <Box>
              <MoreDetails onClick={()=> props.clk(props.trip,props.index)}>
                  <a>More Details</a>
              </MoreDetails>
            </Box>
          </CardFooterSection>
        </MainCard>
      )
    }
    </>
  );
}

const MoreDetails = styled.div`
  font-family: GilroyMedium;
  font-size: 16px;
  line-height: normal;
  text-align: right;
  text-decoration-line: underline;
  color: #4285f4;
  cursor: pointer;
`;


const CardDivider = styled.div`
  border-top: 1px solid #E0E0E0;
  width:100%;
`;

const CardValues = styled.span`
  font-family: GilroyBold;
  font-size: 16px;
  line-height: 0;
  color: #000000;
`;


const CardImage = styled.div`
  width: auto;
  img{
    border-top-right-radius: 20px;
    width: 30vw;
    max-width:340px;
  }
`;

const Phone = styled.div`
  display: flex;
  align-items: center;
  border-top-style: dashed;
  border-top-width: thin;
  border-bottom-style: dashed;
  border-bottom-width: thin;
  border-color: #828282;
  padding: 10px 0px;
  padding-left: 0.9vw;
  line-height: 0;
`;

const Mail = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0px;
  line-height: normal;
  padding-left: 0.9vw;
`;

const CardProfile = styled.div`
  display: grid;
  margin-top: 15px;
  justify-items: center;
`;

const CenterBox = styled.div`
  display:flex;
  width:100%;
  justify-content:space-between;
  margin-top: 10px;
  padding-bottom: 30px;
`;

const MainCard = styled.div`
  width: calc((100% - 30px)/2);
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 20px;
  margin-bottom: 30px;
  marign-right:10px;
`;
const CardTopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardMidSection = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom:20px;
`;

const CardFooterSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding:20px;
`;

const Label = styled.span`
  font-family: GilroyRegular;
  font-size: 16px;
  line-height: normal;
  color: #828282;
  margin-bottom:15px;
`;

const CardText = styled.p`
  font-family: GilroyRegular;
  font-size: 16px;
  line-height: 19px;
  color: #828282;
`;

const AvatarImg = styled.img`
  height:80px;
  width:80px;
  border-radius:60px;
`
