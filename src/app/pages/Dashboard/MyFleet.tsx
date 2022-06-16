import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Stack,
  Box,
  Button,
  IconButton,
  CircularProgress,
  Pagination
} from '@mui/material';
import { Nav } from '../../components/Nav';
import { Search } from '../../components/Search';
import { AvatarImg, AvatarImgContainer, Divider, Card} from '../../components/layout';
import { DefaultButton } from '../../components/buttons';

import { DashboardLayout, DashboardButton, DashboardSectionText, DashboardHeaderIcon, DashboardVerticalDivider, DashboardHeaderText} from '../../components/DashboardLayout';
import { Footer } from '../../components/Footer';
import { paginate } from '../../components/utils';

import { FleetGridView } from './MyFleet/FleetGridView';
import { FleetListView } from './MyFleet/FleetListView';


import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useDashboardSlice } from './slice';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './MyFleet/fleet.scss';


import {
selectFleetList
} from './slice/selectors';

import {
  selectLoading,
  selectPayload,
  selectError,
  selectUser,
  selectToken,
  selectSuccess,
  selectLoginSuccess,
  selectActiveViewMode,
} from '../../slice/selectors';

import { useAppSlice } from '../../slice';

export function MyFleet() {
  const history = useHistory();
  const { actions } = useDashboardSlice();

  const { actions: appActions } = useAppSlice();

  const dispatch = useDispatch();

  const authUser = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const errors = useSelector(selectError);
  const success = useSelector(selectSuccess);
  const payload = useSelector(selectPayload);
  const view_mode = useSelector(selectActiveViewMode);
  const fleet_list = useSelector(selectFleetList);

  const [user, set_user] = React.useState({
    username: '',
    firstName: '',
    lastName: '',
    profile_image: '',
    notifications: [],
    role_id: 1,
    is_owner: false,
  });

  const [activeListIndex, set_activeListIndex] = React.useState(1);


  const [myFleet, set_myFleet] = React.useState<any[]>([]);
  const [activeList, set_activeList] = React.useState<any[]>([]);

  const [viewGridTable, setViewGridTable] = React.useState('grid');
  const [searchTerm, setSearchTerm] = React.useState('');


  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    if (authUser !== null && authUser !== undefined) {
      set_user(authUser);
      setTimeout(() => dispatch(actions.loadFleetList({user_id:authUser.id})), 100);
    }
  }, [authUser]);

  React.useEffect(() => {
    if (fleet_list !== null && fleet_list !== undefined) {
      const fleetList:any = [...fleet_list]
      set_myFleet(fleetList.sort())
    }
  }, [fleet_list]);

  React.useEffect(() => {
    if (activeListIndex !== null && activeListIndex !== undefined) {
      if (viewGridTable == 'grid') {
        set_activeList(paginate(myFleet,activeListIndex, 3).data)
      }else{
        set_activeList(paginate(myFleet,activeListIndex, 10).data)

      }
    }
  }, [activeListIndex, myFleet]);


  React.useEffect(() => {
    if (searchTerm !== null && searchTerm !== undefined && searchTerm !== '') {
      const fleetList:any = [...authUser.listings]
      const filteredItems = fleetList.filter(item => item.listing_name && item.listing_name.toLowerCase().includes(searchTerm.toLowerCase()));
      set_myFleet(filteredItems.sort().reverse())
    }
  }, [searchTerm]);

  const handlePagePrev = () => {
    if (activeListIndex === 1) {
      return null;
    }
    let newIndex = activeListIndex - 1
    set_activeListIndex(newIndex)
  };

  const handlePageNext = () => {

    let newIndex = activeListIndex + 1
    set_activeListIndex(newIndex)
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    set_activeListIndex(value)
  };


  return (
    <>
      <Helmet>
        <title>My Fleet</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
          <DashboardLayout user={user} title="My Fleet">
          <>
            <Box display={'flex'} flexWrap={'wrap'} minHeight={'325px'}>
              <Box flex={1} flexWrap={'wrap'}>
                <Card>
                  <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} p={"1rem 3rem"}>
                    <DashboardHeaderText>Fleet List</DashboardHeaderText>
                    <Box display={'flex'} alignItems={'center'}>
                      <div className='fleet-view'>
                        <div
                          className='menu-container'
                          onClick={() => {
                            setViewGridTable('table');
                          }}
                        >
                          <div className='menu-bar'></div>
                          <div className='menu-bar'></div>
                          <div
                            className='menu-bar'
                            style={{ marginBottom: '0px' }}
                          ></div>
                        </div>
                        <div
                          style={{
                            height: 'inherit',
                            width: '2px',
                            backgroundColor: '#BDBDBD',
                            margin: '0px 15px',
                          }}
                        ></div>
                        <div
                          className='button-container'>
                          <img
                            src={process.env.PUBLIC_URL + `/icons/grid.svg`}
                            onClick={() => {
                              setViewGridTable('grid');
                            }}
                          />
                        </div>
                      </div>
                      <DefaultButton onClick={()=>history.push('/create-listing/')} text="New Listing" type="owner"/>
                    </Box>
                  </Box>
                  <Divider />
                  <Box display={'flex'} justifyContent={'flex-start'} width={'100%'} pt={"1.5rem"} pl={"3rem"} pr={"3rem"}>
                      <div className='search-bar'>
                        <img src={process.env.PUBLIC_URL + `/icons/search.svg`} />
                        <input placeholder='Search By Listing Name...' onChange={(e)=>setSearchTerm(e.target.value)}/>
                      </div>
                      <div className='select-container'>
                        <select>
                          <option selected disabled>Select a filter...</option>
                          <option>Boats</option>
                          <option>Yachts</option>
                          <option>Water Activities</option>

                        </select>
                      </div>
                  </Box>
                  <Box width={'100%'} pt={"1.5rem"} pl={"3rem"} pr={"3rem"}>
                  {viewGridTable === 'grid'
                    ? ((loading === false || myFleet !== null) ? <FleetGridView listings={paginate(myFleet,activeListIndex, 3).data}/> :<CircularProgress />)
                    : viewGridTable === 'table'
                    ? ((loading === false || myFleet !== null) ? <FleetListView listings={paginate(myFleet,activeListIndex, 10).data}/> :<CircularProgress />)
                    : null
                  }

                  </Box>

                  <PaginationFlex>
                    <Box>
                      {viewGridTable === 'grid'
                        ? <p>Showing {myFleet && myFleet.indexOf(activeList[0] || 0) + 1} to {myFleet && myFleet.indexOf(activeList[activeList.length-1] || 0) + 1} of {myFleet && myFleet.length} entries</p>
                        : viewGridTable === 'table'
                        ? <p>Showing 1 to 10 of {myFleet && myFleet.length} entries</p>
                        : null
                      }
                    </Box>
                    {viewGridTable === 'grid'
                      ? <Pagination size="large" shape="rounded" count={paginate(myFleet,activeListIndex, 3).totalPages} page={activeListIndex} onChange={handlePageChange} />
                      : viewGridTable === 'table'
                      ? <Pagination size="large" shape="rounded" count={paginate(myFleet,activeListIndex, 10).totalPages} page={activeListIndex} onChange={handlePageChange} />
                      : null
                    }

                  </PaginationFlex>
                </Card>
              </Box>
            </Box>

            </>
          </DashboardLayout>
          <Footer no_margin={true}/>
    </>
  );
}

const PaginationFlex = styled.div`
  padding: 0rem 3rem;
  display:flex;
  width:100%;
  justify-content:space-between;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const MessageText = styled.p`
  font-family: GilroyMedium;
  font-size: 0.85vw;
  color: #000000;
`;

export const MessageContainer = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 10px;
  height: 78px;
  width: 100%;
  margin-bottom: 10px;

  &&:hover {
    background: #f7f7f7;
  }
`;
