import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton } from '@mui/material';
import { Nav } from '../../../components/Nav';
import { Search } from '../../../components/Search';

import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { DuplicateListing } from './DuplicateListing';
import { InProgress } from './InProgress';
import { useHistory } from 'react-router-dom';
import { useListcreationSlice } from "./slice";
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "./slice/selectors";

export function CreateListing() {

  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const creationState = useSelector(selectListcreation)


  const [likeToDo, setLikeToDo] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [upperIndex, setUpperIndex] = React.useState(0);
  const [lowerIndex, setLowerIndex] = React.useState(0);

  const history = useHistory();

  const buttonsArray1 = [
    { title: 'New Listing' },
    { title: 'In Progress' },
    { title: 'Duplicate a Listing' },
  ];
  const buttonsArray2 = [
    { title: 'Yacht', categoryProps: "36' +" },
    { title: 'Boat', categoryProps: "5'-35'" },
    {
      title: 'Water Activities',
      categoryProps: 'Jet Ski, Tiki Bars and More',
    },
  ];

  const getStartedClickHandler = () => {
    if (upperIndex === 0 && lowerIndex === 0) {
      setTimeout(() => dispatch(actions.setListingType({type:'Yacht'})), 0);
      history.push('/create-listing/yacht/');
    } else if (upperIndex === 0 && lowerIndex === 1) {
      setTimeout(() => dispatch(actions.setListingType({type:'Boat'})), 0);
      history.push('/create-listing/boat/');
    } else if (upperIndex === 0 && lowerIndex === 2) {
      setTimeout(() => dispatch(actions.setListingType({type:'Water Activity'})), 0);
      history.push('/create-listing/water-activity/');
    }
};


  return (
    <>
      <Helmet>
        <title>Create Listing</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Nav/>
      <Container>
        <Box display={'flex'}>
            <h2>What Would You Like To Do?</h2>
        </Box>
        <ButtonFlex>
        {buttonsArray1.map((element, index) => {
          return (
            <Box flex={1} pr={2}>
              <ListingCreateButton
                isActive={upperIndex === index}
                key={index}
                onClick={() => {
                  setUpperIndex(index);
                }}
              >
                {element.title}
              </ListingCreateButton>
            </Box>
          );
        })}
        </ButtonFlex>

        {upperIndex === 0 ? (
            <>
              <Box>
                <h2>What Category Best Describes Your Listing?</h2>
              </Box>
              <ButtonFlex>
              {buttonsArray2.map((element, index) => {
                return (
                  <Box flex={1} pr={2}>
                    <ListingCreateButton
                      isActive={lowerIndex === index}
                      key={index}
                      onClick={() => {
                        setLowerIndex(index);
                      }}
                    >
                      {element.title}
                      <p style={{margin:0}}>{element.categoryProps}</p>
                    </ListingCreateButton>
                  </Box>
                );
              })}
              </ButtonFlex>
              <GetStartedButtonFlex>
                <GetStartedButton onClick={getStartedClickHandler}>
                  Get Started
                </GetStartedButton>
              </GetStartedButtonFlex>
            </>
          ) : null}
          {upperIndex === 1 ? <InProgress /> : null}
          {upperIndex === 2 ? <DuplicateListing /> : null}

      </Container>
    </>
  );
}

export const GetStartedButtonFlex = styled.div`
  display:flex;
  justify-content: flex-end;
  align-items:center;
  flex-direction:row;
  flex-wrap:wrap;
  width:100%;
  margin-top: 4.167vw;
  text-align: right;
`;

export const GetStartedButton = styled.div`
  font-family: GilroyBold;
  font-size: 20px;
  color: #ffffff;
  padding: 15px 45px;
  text-align: center;
  background: linear-gradient(0deg, #4285f4, #4285f4);
  border-radius: 10px;
  width:auto;
`;

export const HeroContainer = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  flex-direction:column;
  padding:20px;
  margin-bottom:5px;
  width: 100%;
  height: 768px;
  background: #fff;
  transition:  transform 250ms;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${process.env.PUBLIC_URL + '/home-hero-2.svg'});
`;


export const ButtonFlex = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items:center;
  flex-direction:row;
  flex-wrap:wrap;
  width:100%;
`;

export const ListingCreateButton = styled.div<{isActive?:boolean}>`
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
