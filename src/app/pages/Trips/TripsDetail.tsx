import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton, Paper, Grid} from '@mui/material';
import { Nav } from '../../components/Nav';
import { Search } from '../../components/Search';
import { useSelector, useDispatch } from 'react-redux';
import { useTripsSlice } from './slice';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { BasicModal } from '../../components/modals';
import { useHistory, Link } from 'react-router-dom';

import imgadd from "../../assets/trips/add-cal.png";
import imgsharebooking from "../../assets/trips/share-booking.png";
import imgemailbooking from "../../assets/trips/email-booking.png";
import imguser from "../../assets/trips/dummy-img-trip.png";
import iconmsg from "../../assets/trips/trip-msg.png";
import iconphone from "../../assets/trips/trip-phone.png";
import icontick from "../../assets/trips/tripcard-completed.png";
import messenger from "../../assets/trips/messenger.png";
import loc from "../../assets/trips/tripcard-loc.png";
import cross from "../../assets/trips/cross.png";
import iconcon from '../../assets/trips/tripcard-confirm.png';
import iconcancel from '../../assets/trips/tripcard-cancel.png';
import './trips.scss';
import { CustomModal } from '../../components/modals';
import { Maps } from '../../components/Maps';


interface Props {
  trip:any;
  clk?:any;
  open:boolean;
  onClose:any;
}

const CardValues = styled.span`
  font-family: GilroyBold;
  font-size: 16px;
  line-height: 0;
  color: #000000;
`;

function formatDate(dateString) {
  return dateString.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,"$1-$2-$3T$4:$5:$6")
}

export function TripsDetail(props:Props) {
  const history = useHistory();

  const { actions } = useTripsSlice();
  const dispatch = useDispatch();

  const [listingArr, set_listingArr] = React.useState<any>([]);
  const [activeBar, set_activeBar] = React.useState(0);
  const [tripDetailActive, set_tripDetailActive] = React.useState(false);

  React.useEffect(() => {
    if(props !== undefined && props !== null){
      if (props.trip && props.trip.listing) {
        let arr:any = []
        arr.push(props.trip.listing)
        set_listingArr(arr)
      }
    }
  },[props])

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
    return (<Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
              <CardValues style={{color:color, paddingRight:8}}>{status ? status : "No status found"}</CardValues>
              {icon !== '' &&
                <img src={process.env.PUBLIC_URL+'/'+icon}/>
              }
            </Box>)
  }

  function handleCreateiCalendar(e:any) {
    // const newEvent = {
    //     BEGIN: 'VCALENDAR',
    //     PRODID: 'www.website.com',
    //     UID: 'info@website.com',
    //     CATEGORIES: 'APPOINTMENT',
    //     DTSTART: '20140321T153010Z',
    //     DTEND: '',
    //     SUMMARY: 'My great event',
    //     DESCRIPTION: 'Great event in your town',
    //     END: 'VCALENDAR',
    // }
    //
    // let formattedDate = formatDate(newEvent.DTSTART)
    //
    // cal = ics()
    // cal.addEvent(newEvent.SUMMARY, newEvent.DESCRIPTION, newEvent.PRODID, formattedDate, formattedDate)
    // cal.download("my_calendar")

  }

  return (
    <CustomModal open={props.open} onClose={props.onClose} header_children={
      <div className="detail-head">
          <span className="heading">Booking Details</span>
          <div className="top-head-btns">
              <div className="head-btn-add" onClick={handleCreateiCalendar}>
                  <span>Add Calendar</span>
                  <img src={imgadd} />
              </div>
              <div className="head-btn-share">
                  <span>Share Booking</span>
                  <img src={imgsharebooking} />
              </div>
              <div className="head-btn-email">
                  <span>Email Booking</span>
                  <img src={imgemailbooking} />
              </div>
          </div>
      </div>
    }>
    <Grid container spacing={0} mt={1}>
      <Grid item xs={12} >
               <div className="trip-detail">
                    <div className="detail-card-main">

                        <div className="detail-body">
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                  <img className="user-img" src={props.trip?.owner?.profileImage} />
                                  <span className="user-name">{props.trip?.owner?.firstName} {props.trip?.owner?.lastName}</span>
                                  <div className="contact">
                                      <div className="email">
                                          <img src={iconmsg} />
                                          <span>{props.trip?.owner?.email}</span>
                                      </div>
                                      <div className="phone">
                                          <img src={iconphone} />
                                          <span>{props.trip?.owner?.phoneNumber}</span>
                                      </div>
                                  </div>
                                  <div className="description">
                                      <span>{props.trip?.booking_message}</span>
                                  </div>
                                  <div className="owner-status">
                                      <div className="owner">
                                          <img src={messenger}/>
                                          <span>Message Owner</span>
                                      </div>
                                      <div className="status">
                                          <span className="stat-label">Status:   </span>
                                          <>{renderStatus(props.trip?.status)}  </>
                                      </div>
                                  </div>
                                  <div className="bottom-card">
                                      <div className="heading">
                                          <span>Confirmation Number: {props.trip?.confirmation_id || '-'}</span>
                                      </div>
                                      <div className="bottom-table-info">
                                          <div className="table-info-head border-r">
                                              <span className="head-label">Dates:</span>
                                              {/*11/25/21 - 11/28/21*/}
                                              <span className="head-info">{props.trip?.booking_dates}</span>
                                          </div>
                                          <div className="table-info-head border-r">
                                              <span className="head-label">Times:</span>
                                              <span className="head-info">{props.trip?.booking_times || 'No given time...'}</span>
                                          </div>
                                          <div className="table-info-head border-r">
                                              <span className="head-label">Duration:</span>
                                              <span className="head-info">{props.trip?.booking_duration}</span>
                                          </div>
                                          <div className="table-info-head border-l">
                                              <span className="head-label">Guests:</span>
                                              <span className="head-info">{props.trip?.booking_guests}</span>
                                          </div>
                                      </div>
                                      <div className="adrs-sec">
                                          <span className="adrs-label">Address:</span>
                                          <span className="adrs-value">{props.trip?.listing?.street_address} {props.trip?.listing?.city}, {props.trip?.listing?.province} {props.trip?.listing?.country}</span>
                                      </div>
                                      <div className="terms-sec">
                                          <span className="terms-label">Terms of Services:</span>
                                          <div className="terms-val-sec">
                                              <span className="terms-value">Cancelation Policy</span>
                                              <span className="terms-info">For more informtion click: <Link to="/help-center/">“Terms of Services”</Link></span>
                                          </div>
                                      </div>
                                      <div className="faq-sec">
                                          <span>FAQ</span>
                                      </div>
                                      <div className="question-sec">
                                          <span className="question">What do I do next?</span>
                                          <span className="ans">Get in contact with the owner to confirm boarding instructions & any further accommodations.</span>

                                          <span className="question">When do I get my security deposit back?</span>
                                          <span className="ans">We hold your security deposit up to 24 hours post charter start time. If issues occur, we can hold the deposit, investigate, and resolve the issue. <br/><br/>Once resolved, either you or the owner will get the deposit. Always be sure to save messages to support your claim. </span>
                                      </div>
                                  </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                  <div className="right-card">
                                      <div className="heading">
                                          <img src={loc}/>
                                          <span>{props.trip?.listing?.listing_name} in {props.trip?.listing?.city}, {props.trip?.listing?.province}</span>
                                      </div>
                                      <div className="map-sec">
                                        {listingArr && listingArr.length > 0 &&
                                          <Maps listings={listingArr}/>
                                        }
                                      </div>
                                      <div className="payment-sec">
                                          <span>Payment</span>
                                      </div>
                                      <div className="payment-body">
                                          <div className="payment-row">
                                              <span className="payment-label">Duration:</span>
                                              <span className="payment-val">{props.trip?.booking_duration || '-'}</span>
                                          </div>
                                          <div className="payment-row">
                                              <span className="payment-label">Taxes:</span>
                                              <span className="payment-val">${props.trip?.taxes || '-'}</span>
                                          </div>
                                          <div className="payment-row">
                                              <span className="payment-label">Service Fees:</span>
                                              <span className="payment-val">${props.trip?.fees || '-'}</span>
                                          </div>
                                          <div className="payment-row">
                                              <span className="payment-label">Chef</span>
                                              <span className="payment-val">${props.trip?.other_fees || '-'}</span>
                                          </div>
                                          <div className="total-sec">
                                              <span className="payment-label">Total:</span>
                                              <span className="payment-val">${props.trip?.total || '-'}</span>
                                          </div>
                                      </div>
                                  </div>
                            </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
      </Grid>
    </Grid>
    </CustomModal>
  );
}
