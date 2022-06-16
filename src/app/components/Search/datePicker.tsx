/**
 *
 * ListView
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import 'react-dates/initialize';
import { DayPickerRangeController, FocusedInputShape } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment, { Moment } from 'moment';
import isInclusivelyAfterDay from './isInclusivelyAfterDay';
import './datePicker.css';

interface Props {
  handleOpenDatePicker;
  handleClearDates;
  handleCloseDatePicker;
}

export function DatePicker(props: Props) {
  const [startDate, setStartDate] = React.useState<Moment | null>(null);
  const [endDate, setEndDate] = React.useState<Moment | null>(null);
  const [showInput, setShowInput] = React.useState(false);
  const [
    focusedInput,
    setFocusedInput,
  ] = React.useState<FocusedInputShape | null>('startDate');

  const handlendDatesChange = (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    props.handleOpenDatePicker(arg.startDate, arg.endDate)
    setStartDate(arg.startDate);
    setEndDate(arg.endDate);
  };

  const renderCalendarInfo = () => {
    return (
      <div>
        <CloseButton onClick={props.handleCloseDatePicker}>Close</CloseButton>
        <ClearTextSpan onClick={handleClearDates}>Clear dates</ClearTextSpan>
      </div>
    );
  };
  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
    props.handleClearDates();
  };

  return (
    <>
      <DayPickerRangeController
        startDate={startDate}
        endDate={endDate}
        onDatesChange={handlendDatesChange}
        focusedInput={focusedInput}
        orientation="horizontal"
        keepOpenOnDateSelect
        onFocusChange={focus => setFocusedInput(focus || 'startDate')}
        numberOfMonths={2}
        isOutsideRange={day => !isInclusivelyAfterDay(day, moment())}
        renderCalendarInfo={renderCalendarInfo}
        calendarInfoPosition="bottom"
      />
    </>
  );
}

export const ClearTextSpan = styled.button`
  float: right;
  color: #333333;
  text-decoration: underline;
  border: none;
  background: none;
  padding-top: 10px;
  font-family: GilroyMedium;
  cursor: pointer;
`;
export const CloseButton = styled.button`
  float: right;
  color: #333333;
  background: none;
  width: 70px;
  height: 40px;
  border-radius: 8px;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 10px;
  font-family: GilroyMedium;
  cursor: pointer;
`;
