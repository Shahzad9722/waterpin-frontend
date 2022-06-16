import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Stack,
  Divider,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { Nav } from '../../../components/Nav';
import { Search } from '../../../components/Search';

import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';

export function ListWaterActivity() {
  const [likeToDo, setLikeToDo] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [upperIndex, setUpperIndex] = React.useState(0);
  const [lowerIndex, setLowerIndex] = React.useState(0);
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
    // if (upperIndex === 0 && lowerIndex === 0) {
    //   history.push('/list-your-yacht');
    // } else if (upperIndex === 0 && lowerIndex === 1) {
    //   history.push('/list-your-boat');
    // } else if (upperIndex === 0 && lowerIndex === 2) {
    //   history.push('/list-your-water-activity');
    // }
  };
  const [search, setSearch]: any = React.useState('');

  return (
    <>
      <Helmet>
        <title>Create Listing</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Nav searchValue={search} handleSearch={setSearch} />
      <Box display={'flex'}>
        <h2>What Would You Like To Do?</h2>
      </Box>
    </>
  );
}

export const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 5px;
  width: 100%;
  height: 768px;
  background: #fff;
  transition: transform 250ms;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${process.env.PUBLIC_URL + '/home-hero-2.svg'});
`;

export const ButtonFlex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const ListingCreateButton = styled.div<{ isActive: boolean }>`
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

  ${({ isActive }) =>
    isActive &&
    `
    border: 3px solid #333333;
   `}
`;
