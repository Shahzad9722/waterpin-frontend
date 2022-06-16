/**
 *
 * Favorites
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { Helmet } from 'react-helmet-async';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { Maps } from '../../components/Maps';
import { Search } from '../../components/Search';
import { Carousels } from '../../components/Carousels';
import { Container, Stack, Divider, Box, Grid, Button, IconButton, Skeleton, Menu, MenuItem, Slider, Popper, TextField, Link, FormControlLabel, Checkbox, FormGroup, Pagination, CircularProgress } from '@mui/material';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useHistory, useParams, RouteComponentProps, withRouter, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useListingSlice } from '../Listings/slice';
import { SaveButton, FilterButton, ListingCard } from '../../components/Listings';
import '../../components/Listings/listings.scss'

import './favorites.scss'
import { useFavoritesSlice } from './slice';

import {
  selectLoading,
  selectPayload,
  selectError,
  selectResults,
  selectSuccess,
  selectPageNum,
  selectNumOfPages,
  selectFavoritesCollection
} from './slice/selectors';


interface Props {}

export function Favorites(props: Props) {

  const { t, i18n } = useTranslation();
  const { actions:listingActions } = useListingSlice();
  const { actions } = useFavoritesSlice();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading)
  // const errors = useSelector(selectError)
  // const success = useSelector(selectSuccess)
  const favorites = useSelector(selectFavoritesCollection)

  const history = useHistory();

  const [userFavs, set_userFavs]:any = React.useState(null);

  const [results, set_results] = React.useState([]);
  const [page_num, set_page_num] = React.useState(1);
  const [pages, set_pages] = React.useState(1);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorPrice, setAnchorPrice] = React.useState(null);
  const [anchorWaterToys, setAnchorWaterToys] = React.useState(null);
  const [anchorMore, setAnchorMore] = React.useState(null);

  const open = Boolean(anchorEl);
  const priceOpen = Boolean(anchorPrice);
  const toysOpen = Boolean(anchorWaterToys);
  const moreOpen = Boolean(anchorMore);

  const [value, setValue] = React.useState(30);

  React.useEffect(() => {
    setTimeout(() => dispatch(actions.getUserFavorites()), 100);
  },[])


  React.useEffect(() => {
    if (favorites !== undefined && favorites !== null) {
      set_userFavs(favorites)
    }
  },[favorites])


  //const query = useQuery();

  const handlePriceClick = (event:any) => {
    if (priceOpen) {
      setAnchorPrice(null);
    }else{
      setAnchorPrice(event.currentTarget);
      setAnchorEl(null);
      setAnchorWaterToys(null);
      setAnchorMore(null);

    }
  };

  const handleToysClick = (event:any) => {
    if (toysOpen) {
      setAnchorWaterToys(null);
    }else{
      setAnchorWaterToys(event.currentTarget);
      setAnchorEl(null);
      setAnchorPrice(null);
      setAnchorMore(null);
    }
  };

  const handleMoreClick = (event:any) => {
    if (moreOpen) {
      setAnchorMore(null);
    }else{
      setAnchorMore(event.currentTarget);
      setAnchorWaterToys(null);
      setAnchorEl(null);
      setAnchorPrice(null);
    }
  };

  const handleClick = (event:any) => {
    if (open) {
      setAnchorEl(null);
    }else{
      setAnchorEl(event.currentTarget);
      setAnchorWaterToys(null);
      setAnchorMore(null);
      setAnchorPrice(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function renderListings(user_favorites:any) {
    let renderList:any = []

    //console.log(user_favorites)
    if (user_favorites !== null && user_favorites.length > 0) {
      user_favorites.forEach(listing => {
        renderList.push(<ListingCard listing={listing} user_favorites={user_favorites}/>)
      });
    }


    // let activeCenter = {lat:0.00, lng:0.00}
    //
    // if (map_data !== null && map_data.length > 0) {
    //   activeCenter = {lat:map_data[0].latitude, lng:map_data[0].longitude}
    // }

    return(<div className="listing-wrapper">
      <Box width={"100%"}>
        {loading || user_favorites === null
          ? (
            <CircularProgress />
          )
          : (<>
            {renderList.length !== 0
              ? (
                <>{renderList}</>
              )
              : <Box justifyContent={'center'}><h3>No listings found that matched your criteria, please adjust your search.</h3></Box>

            }
            </>
          )

        }
      </Box>
      <Box width={"80%"}>

      </Box>
    </div>
    )
  }


  return (
    <>
      <Helmet>
        <title>My Favorites</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Nav/>
      <Container>
        <div className="search-flex">
          <Search/>
        </div>
        <div className="listing-filter-header">
          <div className="listing-filter-title">
            My Favorites

          </div>
        </div>

        {loading || userFavs === null
          ? (
            <CircularProgress />
          )
          : (
            <>
              {renderListings(userFavs)}
            </>
          )
        }
        <div className="pagination-flex">

        </div>
      </Container>
      <Footer/>
    </>
  );
}

const Div = styled.div``;
