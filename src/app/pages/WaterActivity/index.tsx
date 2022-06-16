/**
 *
 * WaterActivity
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Footer } from 'app/components/Footer';
import { Nav } from 'app/components/Nav';
import { Box, CircularProgress, Container } from '@mui/material';
import drIcon from '../../assets/wateractivity/wae-BackIcon.png'
import SearchIcon from '../../assets/wateractivity/search-icon.png'
import sliderImage from '../../assets/wateractivity/wt-ex-slideImg.png'


import { Carousels } from 'app/components/Carousels';

// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from 'react-router-dom';
import  './wateractivity.scss';

import { Sidebar } from './sidebard';


interface Props {}

export function WaterActivity(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const options :any = {
    margin: 10,
    responsiveClass: true,
    nav: true,
    autoplay: true,
    navText: [, "<i class='fa fa-arrow-right' ></i>"],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 4,
      },
      1000: {
        items: 4,
      },
    },
  };


  return (
    <Div>
      <Helmet>
        <title>Water Activity</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Nav/>
        {/* <topHeader> */}
          <h1 className='water-activity-title'>Water Activity</h1>
       <>
         <div className="wae-container">
           <div className="wae-sidebar">
              <div className="top-title">
                <img className="back-icon" src={drIcon} />
                <span>Water Activities</span>
              </div>
              <Sidebar />
           </div>
        <div className="wae-body">
          <div className="wae-search-filter">
            <input
              type="text"
              placeholder="Search by location"
              className="search-location"
              // onChange={}
            />
            <span>
              <img src={SearchIcon} />
            </span>
            <input type="text" placeholder="Date" className="search-Date" />
            <input type="text" placeholder="Price" className="search-price" />
            <input type="text" placeholder="Guests" className="search-Guests" />
          </div>
          {/* {filterAllData.length !== 0  && !loading ? ( */}

            <>
              <div className="popular-sec-body">
                <div className="wae-search-in-slider">
                  <div className="most-popular">Most Popular</div>
                  <form>
                    <input
                      type="text"
                      placeholder="Dockside Dining"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Hotel On Water"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Fishing"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Tours"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Lessons"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Water Jetpack"
                      className="search-Guests"
                    />
                  </form>
                  <a href="#" className="link-view-all">
                    View All
                  </a>
                </div>
                <div className="wae-owl-slider">
                  <Carousels>

                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>

                  </Carousels>
                </div>
                {/*Learn a Skill*/}
                <div className="wae-search-in-slider">
                  <div className="most-popular">Learn a Skill</div>
                  <form>
                    <input
                      type="text"
                      placeholder="Scuba Diving"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Surfing"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Jet Ski"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Kayak"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Yoga"
                      className="search-Guests"
                    />
                  </form>
                  <a href="#" className="link-view-all">
                    View All
                  </a>
                </div>
                <div className="wae-owl-slider">
                  <Carousels>
                    <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                  </Carousels>
                </div>
                {/*Water Sports*/}
                <div className="wae-search-in-slider">
                  <div className="most-popular">Water Sports</div>
                  <form>
                    <input
                      type="text"
                      placeholder="Diving"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Surfing"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Rowing"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Sailing"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Swimming"
                      className="search-Guests"
                    />
                  </form>
                  <a href="#" className="link-view-all">
                    View All
                  </a>
                </div>
                <div className="wae-owl-slider">
                  <Carousels>

                     <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>

                  </Carousels>
                </div>
                {/*All Water Activities*/}
                <div className="wae-search-in-slider">
                  <div className="most-popular">All Water Activities</div>
                  <form>
                    <input
                      type="text"
                      placeholder="Yachts"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Boats"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Jet Skis"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Surfing"
                      className="search-Guests"
                    />
                    <input
                      type="text"
                      placeholder="Tiki Bars"
                      className="search-Guests"
                    />
                  </form>
                  <a href="#" className="link-view-all">
                    View All
                  </a>
                </div>
                <div className="wae-owl-slider">
                  <Carousels>
                         <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <div className="item private-card-slide">
                          <Link
                            to={"/singl_activities/"}
                          >
                             <img src={sliderImage} />
                          </Link>
                        </div>
                      </div>

                    </Carousels>
                  </div>
                </div>
              </>
          </div>
          </div>
        </>
      <Footer/>
    </Div>
  );
}

const Div = styled.div``;
