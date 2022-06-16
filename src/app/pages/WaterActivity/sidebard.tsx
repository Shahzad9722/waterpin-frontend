/**
 *
 * Listings
 *
 */
 import * as React from 'react';
 import Boats from "../../assets/wateractivity/boats.png";
 import Fishing from "../../assets/wateractivity/fishing.png";
 import home from "../../assets/wateractivity/home.png";
 import jetsky from "../../assets/wateractivity/jetsky.png";
 import kayaks from "../../assets/wateractivity/kayaks.png";
 import kitesufing from "../../assets/wateractivity/sufing.png";
 import kit_surfing from "../../assets/wateractivity/kitesufing.png";
 import other from "../../assets/wateractivity/other.png";
 import windSurfng from "../../assets/wateractivity/parasailing.png";
 import Pantoon from "../../assets/wateractivity/parasailing.png";
 import Parasailing from "../../assets/wateractivity/parasailing.png";
 import scubadiving from "../../assets/wateractivity/scubadiving.png";
 import seabob from "../../assets/wateractivity/seabob.png";
 import winsurfing from "../../assets/wateractivity/sufing.png";

 import swimming from "../../assets/wateractivity/swimming.png";
 import tenders from "../../assets/wateractivity/tenders.png";
 import tikibars from "../../assets/wateractivity/tikibars.png";
 import waterjetpacks from "../../assets/wateractivity/jetsky.png";
 import yachts from "../../assets/wateractivity/yachts.png";
import { Link } from 'react-router-dom';

 export const Sidebar: React.FC = () => {
  const sideMeta = [
    {
      icon: `${home}`,
      linkText: "Home",
    },
    {
      icon: `${yachts}`,
      linkText: "Yachts",
    },
    {
      icon: `${Boats}`,
      linkText: "Boats",
    },
    {
      icon: `${jetsky}`,
      linkText: "Jet Skis",
    },
    {
      icon: `${tenders}`,
      linkText: "Tenders",
    },
    {
      icon: `${Parasailing}`,
      linkText: "Parasailing",
    },
    {
      icon: `${tikibars}`,
      linkText: "Tiki Bars",
    },
    {
      icon: `${waterjetpacks}`,
      linkText: "Water Jetpacks",
    },
    {
      icon: `${Pantoon}`,
      linkText: "parasailing",
    },
    {
      icon: `${kitesufing}`,
      linkText: "Kite Surfing",
    },
    {
      icon: `${Fishing}`,
      linkText: "Fishing",
    },

    {
      icon: `${swimming}`,
      linkText: "Swimming",
    },

    {
      icon: `${kit_surfing}`,
      linkText: "Windsurfing",
    },
    {
      icon: `${windSurfng}`,
      linkText: "windsurfingsdfs",
    },

    {
      icon: `${winsurfing}`,
      linkText: "ddfdf",
    },
    {
      icon: `${kayaks}`,
      linkText: "Kayaks",
    },
    {
      icon: `${seabob}`,
      linkText: "Sea Bob",
    },
    {
      icon: `${scubadiving}`,
      linkText: "Scuba Diving",
    },

    {
      icon: `${other}`,
      linkText: "Others",
    },
  ];
  const saveIdToStore= ()=>{

  }
	return (
    <>
    {sideMeta.map((item, ind)=>
      <div className='side-btn'>
        <Link to={item.linkText} onClick={saveIdToStore}>
         <div className="home-btn btn-list">
            <img className="home-icon" src={item.icon} />
            <span>{item.linkText}</span>
          </div>
         </Link>
      </div>
      )}
    </>
  )
 }
