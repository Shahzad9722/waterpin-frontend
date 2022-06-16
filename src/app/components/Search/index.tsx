/**
 *
 * ListView
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import {
  Container,
  Stack,
  Divider,
  Box,
  Button,
  IconButton,
  InputBase,
  Autocomplete,
  Popper,
  Link,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectLoading,
  selectLocation,
  selectError,
  selectDuration,
  selectStartCharter,
  selectEndCharter,
  selectAutoCompleteResults,
} from '../../pages/Listings/slice/selectors';
import { useListingSlice } from '../../pages/Listings/slice';
import './search.css';
import { weeks, dayTrips, days } from './extraObjects';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment, { Moment } from 'moment';
import { DatePicker } from './datePicker';

interface Props {}

export function Search(props: Props) {
  const { actions } = useListingSlice();
  const dispatch = useDispatch();

  const autoCompleteResults = useSelector(selectAutoCompleteResults);

  const startCharter = useSelector(selectStartCharter);
  const endCharter = useSelector(selectEndCharter);
  const location = useSelector(selectLocation);

  const [duration_tab_index, set_duration_tab_index] = React.useState(0);

  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [durationDays, setDurationDays] = React.useState(
    JSON.parse(JSON.stringify(days)),
  );
  const [durationWeeks, setDurationWeeks] = React.useState(
    JSON.parse(JSON.stringify(weeks)),
  );
  const [durationDayTrips, setDurationDayTrips] = React.useState(dayTrips);
  const [day_trips, set_day_trips]: any = React.useState([]);
  const [stay_week, set_stay_week]: any = React.useState([]);
  const [stay_day, set_stay_day]: any = React.useState([]);
  const [location_results, set_location_results] = React.useState<any>([]);

  const locationRef = React.useRef<HTMLInputElement>(null);
  const starterDateRef = React.useRef<HTMLInputElement>(null);
  const endDateRef = React.useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [lowerAnchorEl, setLowerAnchorEl] = React.useState(null);
  const lowerOpen = Boolean(lowerAnchorEl);
  const open = Boolean(anchorEl);

  const history = useHistory();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const location_query = query.get('location');
  const start_charter_query = query.get('start_charter');
  const end_charter_query = query.get('end_charter');
  const duration_query = query.get('duration');

  React.useEffect(() => {
    if (autoCompleteResults !== undefined && autoCompleteResults !== null) {
      let optionsList: any = [];
      autoCompleteResults.forEach((element: any) => {
        if (element.province !== null) {
          let obj: any = {
            label: `${element.city}, ${element.province}`,
            value: element.city,
          };
          optionsList.push(obj);
        } else {
          let obj: any = {
            label: `${element.city}, ${element.country}`,
            value: element.city,
          };
          optionsList.push(obj);
        }
      });
      set_location_results(optionsList.splice(0, 5));
    }
  }, [autoCompleteResults]);

  function handleLocationEdit(e: any) {
    locationRef.current?.focus();
  }

  function handleStartCharterEdit(e: any) {
    starterDateRef.current?.focus();

    if (open) {
      setAnchorEl(null);
    }

  }

  function handleEndCharterEdit(e: any) {
    endDateRef.current?.focus();
  }

  const handleClick = (event: any) => {
    if (open) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleLowerPopperClick = (event: any) => {
    if (lowerOpen) {
      setLowerAnchorEl(null);
    } else {
      setLowerAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDatePicker = (startDate, endDate) => {
    if (startDate) {
      setTimeout(
        () =>
          dispatch(
            actions.setStart_charter({
              startDate: moment(startDate).format('YYYY-MM-DD'),
            }),
          ),
        0,
      );
    }
    if (endDate) {
      setTimeout(
        () =>
          dispatch(
            actions.setEnd_charter({
              endDate: moment(endDate).format('YYYY-MM-DD'),
            }),
          ),
        0,
      );
    }
  };
  const handleClearDates = () => {
    dispatch(actions.setEnd_charter({ endDate: null }));
    dispatch(actions.setStart_charter({ startDate: null }));
  };
  const handleCloseDatePicker = () => {
    setOpenDatePicker(!openDatePicker);
    // handleLowerPopperClick()
  };
  const selectDay = selectedDay => {
    const index = durationDays.findIndex(
      durationDay => durationDay.value === selectedDay.value,
    );
    const newDurationDays = JSON.parse(JSON.stringify(days));
    newDurationDays[index].checked = !selectedDay.checked;
    set_stay_day(objectFindByKeyArr(newDurationDays, 'checked', true));
    setDurationDays(newDurationDays);
  };
  const selectWeek = selectedWeek => {
    const index = durationWeeks.findIndex(
      durationWeek => durationWeek.value === selectedWeek.value,
    );
    const newDurationWeeks = JSON.parse(JSON.stringify(weeks));
    newDurationWeeks[index].checked = !selectedWeek.checked;
    set_stay_week(objectFindByKeyArr(newDurationWeeks, 'checked', true));
    setDurationWeeks(newDurationWeeks);
  };
  const selectDayTrips = dayTrip => {
    const index = durationDayTrips.findIndex(
      durationDayTrip => durationDayTrip.id === dayTrip.id,
    );
    const newDurationDayTrips = [...durationDayTrips];
    newDurationDayTrips[index].checked = !dayTrip.checked;
    set_day_trips(objectFindByKeyArr(newDurationDayTrips, 'checked', true));
    setDurationDayTrips(newDurationDayTrips);
  };

  const objectFindByKeyArr = (array, key, value) => {
    const arr: any[] = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        arr.push(arr.length > 2 ? array[i].value + ',' : array[i].value);
      }
    }
    return arr;
  };

  return (
    <>
      <SearchContainer>
        <Popper open={open} anchorEl={anchorEl}>
          <Box
            sx={{
              p: 3,
              bgcolor: 'background.paper',
              marginTop: '5px',
              width: '400px',
              borderRadius: 10,
              boxShadow: '0px 0px 20px rgba(179, 179, 179, 0.25)',
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <h3>Day Trips</h3>
                {durationDayTrips.map(dayTrip => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          sx={{
                            '&.Mui-checked': {
                              color: '#00C2CB',
                            },
                          }}
                        />
                      }
                      label={dayTrip.name}
                      checked={dayTrip.checked}
                      onChange={() => {
                        selectDayTrips(dayTrip);
                      }}
                    />
                  );
                })}
              </Grid>
              <Grid
                item
                xs={1}
                style={{ borderLeft: '1px dashed #BDBDBD' }}
              ></Grid>
              <Grid item xs={6}>
                <div>
                  <h3>Overnight Stays</h3>
                  <Grid item xs={12}>
                    <h4>Days</h4>
                  </Grid>
                  <Grid container xs={12} spacing={0}>
                    {durationDays.map((day, key) => {
                      return (
                        <Grid xs={3}>
                          <DurationButton
                            onClick={() => selectDay(day)}
                            style={{
                              background: !day.checked ? '#fff' : '#00C2CB',
                              color: !day.checked ? 'black' : 'white',
                            }}
                          >
                            {day.value}
                          </DurationButton>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Grid item xs={12}>
                    <h4>Weeks</h4>
                  </Grid>
                  <Grid container xs={12} spacing={0}>
                    {durationWeeks.map(week => {
                      return (
                        <Grid xs={3}>
                          <DurationButton
                            onClick={() => selectWeek(week)}
                            style={{
                              background: !week.checked ? '#fff' : '#00C2CB',
                              color: !week.checked ? 'black' : 'white',
                            }}
                          >
                            {week.value}
                          </DurationButton>
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              </Grid>
            </Grid>
            <AddNowButton onClick={handleClick}>Done</AddNowButton>
          </Box>
        </Popper>
        <Box>
          <SearchSection
            style={{
              cursor: 'text',
              paddingLeft: '40px',
              paddingBottom: '10px',
            }}
            onClick={handleLocationEdit}
          >
            <SearchLabelHeader>Location</SearchLabelHeader>
            <Autocomplete
              freeSolo
              id="combo-box-demo"
              options={location_results}
              inputValue={location}
              sx={{ width: 225 }}
              onChange={(event: any, newValue: any) => {
                if (newValue && newValue.value !== null) {
                  dispatch(
                    actions.autocompleteLocation({ location: newValue.value }),
                  );
                }
                console.log(event);
              }}
              getOptionLabel={(location: any) => `${location.label}`}
              renderInput={params => {
                const { InputLabelProps, InputProps, ...rest } = params;
                return (
                  <InputBase
                    sx={{ mt: 0, mb: 1 }}
                    placeholder="Where To Next?"
                    {...params.InputProps}
                    {...rest}
                    autoFocus
                    inputRef={locationRef}
                    onChange={e =>
                      dispatch(
                        actions.autocompleteLocation({
                          location: e.target.value,
                        }),
                      )
                    }
                    style={{
                      fontFamily: 'GilroyRegular',
                      fontSize: '14px',
                      paddingTop: '10px',
                    }}
                  />
                );
              }}
            />
          </SearchSection>
        </Box>
        <SearchDivider />
        <Box>
          <SearchSection style={{ cursor: 'pointer' }} onClick={handleClick}>
            <SearchLabelHeader>Duration</SearchLabelHeader>
            <SearchLabelSubHeader>Trip Length</SearchLabelSubHeader>
          </SearchSection>
        </Box>
        <SearchDivider />
        <Box
          onClick={e => {
            handleCloseDatePicker();
            handleLowerPopperClick(e);
          }}
        >
          <SearchSection
            style={{ cursor: 'pointer' }}
            onClick={handleStartCharterEdit}
          >
            <SearchLabelHeader>Start Charter</SearchLabelHeader>
            <SearchLabelSubHeader
              style={{
                color: !startCharter ? '#BDBDBD' : '#333333',
              }}
            >
              {!startCharter ? 'YY-MM-DD' : startCharter}
            </SearchLabelSubHeader>
          </SearchSection>
        </Box>
        <SearchDivider />
        <Box display={'flex'} flex={1} justifyContent={'center'}>
          <SearchSection
            style={{ cursor: 'pointer' }}
            onClick={handleEndCharterEdit}
          >
            <SearchFlex>
              <Grid container>
                <Grid xs={11}>
                  <Box
                    onClick={e => {
                      handleCloseDatePicker();
                      handleLowerPopperClick(e);
                    }}
                  >
                    <SearchLabelHeader>End Charter</SearchLabelHeader>
                    <SearchLabelSubHeader
                      style={{
                        color: !endCharter ? '#BDBDBD' : '#333333',
                      }}
                    >
                      {!endCharter ? 'YY-MM-DD' : endCharter}
                    </SearchLabelSubHeader>
                  </Box>
                </Grid>
                <Grid xs={1}>
                  <Box>
                    <IconButton
                      color="primary"
                      aria-label="search"
                      component="span"
                      style={{ marginRight: '10px', marginTop:'6px' }}
                    >
                      <SearchButtonContainer
                        onClick={() =>
                          history.push(
                            `/listings/overnights?location=${location}&&start_charter=${startCharter}&&end_charter=${endCharter}&&day_trips=${JSON.stringify(
                              day_trips,
                            )}&&weeks=${stay_week}&&days=${stay_day}`,
                          )
                        }
                      >
                        <FaSearch
                          color="white"
                          style={{ transform: 'rotate(90deg)' }}
                        />
                      </SearchButtonContainer>
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </SearchFlex>
          </SearchSection>
        </Box>
      </SearchContainer>
      {openDatePicker && (
        <Popper
          style={{ margin: '30px' }}
          open={lowerOpen}
          anchorEl={lowerAnchorEl}
          className={
            window.location.href.includes('listings')
              ? 'date-popper-url'
              : 'date-popper'
          }
        >
          <DatePicker
            handleOpenDatePicker={handleOpenDatePicker}
            handleClearDates={handleClearDates}
            handleCloseDatePicker={handleCloseDatePicker}
          />
        </Popper>
      )}
    </>
  );
}

const SaveButton = styled(Button)`
  && {
    width: 80px;
    height: 40px;
    color: #000;
    background: #ffffff;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 8px;
  }
`;

const SearchFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const SearchSection = styled.div`
  border-radius: 50px;
  padding: 2px 75px 10px 20px;

  &&:hover {
    background: #f8f8f8;
  }
`;

const Div = styled.div``;

export const SearchButton = styled(Button)`
  border-radius: 72px;
  background: linear-gradient(
    180deg,
    #00c2cb 0%,
    rgba(0, 194, 203, 0.76) 51.04%,
    #00c2cb 100%
  );
`;

export const SearchButtonContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    #00c2cb 0%,
    rgba(0, 194, 203, 0.76) 51.04%,
    #00c2cb 100%
  );
`;

export const SearchDivider = styled.div`
  border: 1px solid #e0e0e0;
  height: 40px;
`;

export const SearchLabelHeader = styled.h3`
  font-family: GilroyMedium;
  font-size: clamp(16px, 0.95vw, 16px);
  line-height: 21px;
  color: #333333;
  margin-bottom: 0px;
`;

export const SearchLabelSubHeader = styled.p`
  font-family: GilroyRegular;
  font-size: clamp(16px, 0.95vw, 16px);
  line-height: 16px;
  color: #333333;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap:wrap;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
  max-width: 970px;
  min-height: 100px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(101, 101, 101, 0.25);
  border-radius: 50px;
`;
export const DateCharter = styled.button`
  color: #333333;
  background: none;
  border: none;
  font-family: GilroyMedium;
  font-size: 15px;
`;

export const DurationButton = styled.button`
  background: #00c2cb;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  width: 35px;
  height: 30px;
  color: white;
  margin-top: 5px;
  font-family: GilroyBold;
  cursor: pointer;

  &&:hover {
    background: #f8f8f8 !important;
    color: black !important;
  }
`;

export const AddNowButton = styled.button`
  width: 350px;
  height: 50px;
  left: 70px;
  top: 364px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 15px;
  font-family: GilroyBold;
  cursor: pointer;
`;
