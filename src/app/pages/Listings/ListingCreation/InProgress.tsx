import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton, CircularProgress, InputBase} from '@mui/material';
import { Nav } from '../../../components/Nav';
import { Search } from '../../../components/Search';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useListingSlice } from '../slice';

import {
  selectUserListings,
  selectLoading,
} from '../slice/selectors';


import {
  selectUser,
} from '../../../slice/selectors';

export function InProgress() {
  const { actions } = useListingSlice();
  const dispatch = useDispatch();
  const history = useHistory();

  const authUser = useSelector(selectUser)
  const userListings = useSelector(selectUserListings)

  const [likeToDo, setLikeToDo] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [upperIndex, setUpperIndex] = React.useState(0);
  const [lowerIndex, setLowerIndex] = React.useState(0);

  const [myFleet, setMyFleet] =  React.useState<any>(null);

  const [searchTerm, set_searchTerm] = React.useState('');
  const [searchType, set_searchType] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => dispatch(actions.getAllUserListings({id:authUser.id})), 0);
  },[])

  React.useEffect(() => {
    if(userListings !== undefined && userListings !== null){
      let inProgressArray = userListings.filter(element => element.listing_status === 1)
      setMyFleet(inProgressArray)
    }
  },[userListings])

  React.useEffect(() => {
    if(myFleet !== undefined && myFleet !== null){
      let filteredArray:any = []
      switch (true) {
        case searchType === "boat":
          filteredArray = userListings.filter(element => element.listing_type_id === 1 && element.listing_status === 1)
          break;
        case searchType === "yacht":
          filteredArray = userListings.filter(element => element.listing_type_id === 2 && element.listing_status === 1)
          break;
        case searchType === "water-activity":
          filteredArray = userListings.filter(element => element.listing_type_id === 3 && element.listing_status === 1)
          break;
        default:
          filteredArray = userListings
          break;
      }

      //console.log(filteredArray)
      let searchTermFilter = filteredArray.filter(element => element.listing_name.includes(searchTerm))
      setMyFleet(searchTermFilter)
    }
  },[searchTerm, searchType])

  const handleListingDetailRedirect = (listing:any) => {
      if (listing.listing_type_id === 1) {
        history.push('/create-listing/boat/'+listing.listing_id);
      } else if (listing.listing_type_id === 2) {
        history.push('/create-listing/yacht/'+listing.listing_id);
      } else if (listing.listing_type_id === 3) {
        history.push('/create-listing/water-activity/'+listing.listing_id);
      }
  };

  const favoriteImages = (images) => {
    return images
  };


  return (
    <Box>
      <FleetListCard>
          <FleetCardHeader>
            <h3>Fleet List</h3>
          </FleetCardHeader>
          <MyFleetContainer>
          <Box display={'flex'} mb={5} mt={2}>
            <SearchBarContainer>
              <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Your Boat"
                  inputProps={{ 'aria-label': 'Search Your Boat' }}
                  onChange={(e)=>set_searchTerm(e.target.value)}
                />
            </SearchBarContainer>
            <SearchFilter value={searchType} onChange={(e)=>set_searchType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="yacht">Yachts</option>
              <option value="boat">Boats</option>
              <option value="water-activity">Water Activities</option>
            </SearchFilter>
          </Box>
          {myFleet ?
              <FleetFlex>
                  {myFleet.map((item:any, index) => (
                    <ListingFleetItem onClick={()=> handleListingDetailRedirect(item)}>
                      <Box display={'flex'} alignItems={'center'}>
                        <div>
                          <ListingImage src={item.images !== null ? favoriteImages(item.images) : `${process.env.PUBLIC_URL+'/pin.svg'}`} />
                        </div>
                        <ListingName>{item.listing_name}</ListingName>
                      </Box>
                    </ListingFleetItem>
                  ))}
              </FleetFlex>
              : <CircularProgress
                 size={30}
                 sx={{
                   color: "#00c2cb",
                 }}
               />
            }
          </MyFleetContainer>
      </FleetListCard>
    </Box>
  );
}



export const ListingName = styled.a`
  color:black;
  font-family: GilroyRegular;
  margin-left:10px;
`;

export const SearchFilter = styled.select`
  width: 170px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 25px;
  margin-left:10px;
  padding: 0px 10px;
`;


export const SearchBarContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 25px;
`;


export const FleetCardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 30px;
  border-bottom: 1.5px solid #e0e0e0;
`;

export const FleetListCard = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items:center;
  flex-direction:column;
  width:100%;
  height:auto;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(179, 179, 179, 0.25);
  border-radius: 20px;
  margin-top:20px;
`;


export const ListingFleetItem = styled.div`
  transition: all ease-in-out .3s;
  cursor:pointer;

  &&:hover{
    color:#00c2cb;
    transform: scale(1.08);
  }
`;


export const ListingImage = styled.img`
  width:85px;
  height:65px;
  background-color:grey;
  border-radius:10px;
  padding:5px;
`;

export const MyFleetContainer = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items:flex-start;
  flex-direction:column;
  width:100%;
  padding:15px 60px;
`;


export const FleetFlex = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  width:100%
`;

export const ListingCreateButton = styled.div<{isActive:boolean}>`
  background: #ffffff;
  color: #333333;
  font-family: GilroyBold;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  font-size: 1.042vw;
  padding: 1.563vw 0px;
  transition: 0.2s;

  ${({ isActive }) => isActive && `
    border: 3px solid #333333;
   `}
`;
