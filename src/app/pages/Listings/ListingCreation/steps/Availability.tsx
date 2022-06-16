import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer, WizardHeader} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { WizardSelect, WizardSelectOption, WizardField, FieldLabel} from '../common/input';
import {Calendar, DateObject} from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { useListcreationSlice } from "../slice";
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";
import "./cal.css";
interface Props{
  setIndex:any;
  activeIndex:number;
}

export function Availability(props:Props) {

  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const history = useHistory();

  const creationState = useSelector(selectListcreation)

  const farAdvanceOptions = [
  { title: 'Anytime (up to 2 years in advance)' },
  { title: '3 months' },
  { title: '6 months' },
  { title: '1 Year' },
  { title: 'Unavailable For Now' },
];
const availabilityOptions = [
  { title: 'Always Available' },
  { title: 'Limited Availability' },
  { title: 'Weekends Only' },
  { title: 'Weekdays Only' },
];

  const handleInputChange = event => {
    //console.log(event)
    const { name, value } = event.target;
    setTimeout(() => dispatch(actions.setAvailabilityDetails({name:name, value:value})), 0);
  };

 const [typeTime, setTypeTime] = React.useState('');
 const [availabilityType, setAvailabilityType] = React.useState('');

 const [value, setValue] = React.useState<any>([]);
 const months = new DateObject().months.map(month => month.shortName)
 const [currentMonthShow, setCurrentMonth] = React.useState<any>(false)
 const [isBlocked, setIsBlocked] = React.useState<any>([]);
 const [selectedDays , setSelectedDays] = React.useState<any>([]);

 const AvailabilityType = (date:any, currentMonth:any, selectedDate:any) => {

     if (date.format("MM/YYYY") !== currentMonth ) {
         setCurrentMonth(date.format("MM/YYYY"));
     }
     if (isBlocked.includes(date.format("MM/YYYY"))) {
         return {
             disabled: true,
         }
     }

     if (availabilityType != null && availabilityType != "Always Available") {
         if (availabilityType == "Weekends Only") {
             let isWeekend = [0, 6].includes(date.weekDay.index)
             if (!isWeekend){
                 return {
                     className: "disabled_date",
                     style: {color: "#ccc"}
                 }
             }else {
                 return {
                     className: "other_disabled_date",
                 }
             }
         } else {
             let isWeekend = [0, 6].includes(date.weekDay.index)
             if (isWeekend){
                 return {
                     className: "disabled_date",
                     style: {color: "#ccc"}
                 }
             }else {
                 return {
                     className: "other_disabled_date",
                 }
             }
         }
     }
 }

 React.useEffect(()=>{
     if (creationState.availability){
         setAvailabilityType(creationState.availability.availability_type);
         setTypeTime(creationState.availability.how_far_in_advance_book);
         if (creationState.availability.restrict_month !== null) {
           setIsBlocked(JSON.parse(creationState.availability.restrict_month));
         }

         if (creationState.availability.yacht_availability !== null && creationState.availability.yacht_availability.length > 0) {
           let selectedDaysArray = JSON.parse(creationState.availability.yacht_availability).map((item)=>{
               let itemSplit = item.split("/");
               let days = new DateObject({ year: itemSplit[2], month: itemSplit[1], day: itemSplit[0] });
               return days;
           })
           setValue(selectedDaysArray)
         }
     }
 },[])


 React.useEffect(()=>{
     if (creationState.availability !== undefined && creationState.availability !== null){

       if (creationState.availability.availability_type !== null) {
         setAvailabilityType(creationState.availability.availability_type);
       }
       setTypeTime(creationState.availability.how_far_in_advance_book);
       //setIsBlocked(JSON.parse(creationState.availability.restrict_month));
     }
 },[creationState.availability])

 React.useEffect(()=>{
       if (value) {
           let selectedDay:any  = [];
           value.map((dd) => {
               let day = dd.format("MM/DD/YYYY");
               selectedDay.push(day);
           })
           setSelectedDays(selectedDay);
           setTimeout(() => dispatch(actions.setAvailabilityDetails({name:'yacht_availability', value:JSON.stringify(selectedDay)})), 0);
       }
       // if (typeTime){
       //     //creationState.availability.how_far_in_advance_book = typeTime;
       // }
       // if (availabilityType){
       //   console.log(availabilityType)
       //     //ListingModel.availability.availability_type = availabilityType;
       // }
       // if (isBlocked){
       //     //ListingModel.availability.restrict_month = JSON.stringify(isBlocked);
       // }
   },[value,typeTime,availabilityType,isBlocked, creationState.availability])

   const blockThisMonth = () => {
       isBlocked.push(currentMonthShow);
       setIsBlocked(isBlocked);
       //$('.rmdp-day-picker .rmdp-week .rmdp-day').trigger('click');
   }

   const unblockThisMonth = () => {
       const remainingBlock = isBlocked.filter((index) => index !== currentMonthShow);
       setIsBlocked(remainingBlock);
   }

  return (
    <>
      <Helmet>
        <title>Availability</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>
        <WizardContainer>
          <WizardLeftHandContainer>
            <WizardHeader>How Far in Advance Can Guests Book?</WizardHeader>
            <WizardSelect value={creationState.availability.how_far_in_advance_book} name="how_far_in_advance_book" onChange={(e)=>handleInputChange(e)}>
            <WizardSelectOption key={"empty"} selected disabled>How Far in Advance?</WizardSelectOption>
              {farAdvanceOptions.map(opt => (
                <WizardSelectOption key={opt.title} value={opt.title}>{opt.title}</WizardSelectOption>
              ))}
            </WizardSelect>
            <br/>
            <WizardHeader>What’s Your Yacht Availability?</WizardHeader>
            <WizardSelect value={creationState.availability.availability_type} name="availability_type" onChange={(e)=>handleInputChange(e)}>
            <WizardSelectOption key={"empty"} selected disabled>Availability Type</WizardSelectOption>
              {availabilityOptions.map(opt => (
                <WizardSelectOption key={opt.title} value={opt.title}>{opt.title}</WizardSelectOption>
              ))}
            </WizardSelect>
          </WizardLeftHandContainer>
          <WizardRightHandContainer>

          <Calendar
           className="rmdp-mobile"
           value={value}
           onChange={setValue}
           months={months}
           multiple
           minDate={new Date()}
           mapDays={({
                         date,
                         currentMonth,
                         selectedDate
                     }) => AvailabilityType(date, currentMonth, selectedDate)}
               plugins={[
                   <DatePanel sort="date" disabled={true}/>,
               ]}
           />

          </WizardRightHandContainer>
        </WizardContainer>
        <WizardButtonFlex>
          <WizardSecondaryBtn
             name={"Back"}
             onClick={()=>props.setIndex(props.activeIndex-1)}
             disabled={false}
           >
            Back
           </WizardSecondaryBtn>

           <WizardNextBtn
              name={"cancel"}
              onClick={()=>props.setIndex(props.activeIndex+1)}
              disabled={false}
            >
             Next
            </WizardNextBtn>
        </WizardButtonFlex>
      </Container>
    </>
  );
}



export const GetingStartedSubText = styled.p`
  color:white;
`;

export const GetingStartedImage = styled.div`
  width: 100%;
  height: 315px;
  display:flex;
  align-items:center;
  justify-content:center;
  align-content:center;
  img{
    border-radius: 20px;
    width:100%;
    height:100%;
  }
`;
