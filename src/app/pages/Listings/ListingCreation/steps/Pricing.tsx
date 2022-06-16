import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton, Grid, Checkbox } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardCardContainer,WizardCardHeader,WizardCardBody, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { DefaultInput } from '../../../../components/input';
import { DefaultToolTip } from '../../../../components/tooltips';

import { useListcreationSlice } from "../slice";
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";

interface Props{
  setIndex:any;
  activeIndex:number;
}

export function Pricing(props:Props) {

  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const history = useHistory();

  const creationState = useSelector(selectListcreation)

  const [four_hours_active, set_four_hours_active] = React.useState(false);
  const [six_hours_active, set_six_hours_active] = React.useState(false);
  const [eight_hours_active, set_eight_hours_active] = React.useState(false);



  const calculateEarnings = amt => {
    let earnings = (amt -(amt * 0.08))
    return earnings.toFixed(2)
  };


  const handleInputChange = event => {
    //console.log(event)
    const { name, value } = event.target;
    setTimeout(() => dispatch(actions.setDayTripsDetails({name:name, value:value})), 0);
  };

  const handleInputOvernightChange = event => {
    //console.log(event)
    const { name, value } = event.target;
    setTimeout(() => dispatch(actions.setOvernightDetails({name:name, value:value})), 0);
  };

  const handleCheckboxOvernightChange = event => {
    event.preventDefault()
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.setOvernightDetails({name:name, value:true})), 0);
    }else{
      setTimeout(() => dispatch(actions.setOvernightDetails({name:name, value:false})), 0);
    }
  };

  const handleCheckboxChange = event => {
    event.preventDefault()
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.setDayTripsDetails({name:name, value:true})), 0);
    }else{
      setTimeout(() => dispatch(actions.setDayTripsDetails({name:name, value:false})), 0);
    }
  };


  return (
    <>
      <Helmet>
        <title>Pricing & Offerings</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container maxWidth="xl">
        <Box textAlign="center" mt={8}>
        <h2 style={{marginBottom:"0px"}}>What Does Your Boat Offer?</h2>
        <p><b>Owners that offer both Day Trips & Overnight Stays make 40% more on average.</b></p>
        </Box>
        <Grid container spacing={10} alignItems="baseline">
          <Grid item xs={12} sm={6}>
            <WizardCardContainer>
              <WizardCardHeader>Day Trips</WizardCardHeader>
                <WizardCardBody>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display={'flex'} alignItems={'center'}>
                        <Box display={'flex'} width={"50%"} alignItems={'center'}>
                        <Checkbox
                          name="4Hours"
                          checked={creationState.day_trips.price_for_4_hours > 0.00 ?true:false}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <h3>4 Hours</h3>
                        </Box>
                        <Box width={"50%"}>
                          <DefaultInput name="price_for_4_hours" type={"number"} onChange={handleInputChange} value={creationState.day_trips.price_for_4_hours} placeholder="Price Per 4 Hours..." label=""/>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <p>Total (excl. fees)</p>
                      <p>You earn</p>
                      <p style={{color:"#27AE60"}}>Price Breakdown</p>
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <p><b>${creationState.day_trips.price_for_4_hours}</b></p>
                      <p style={{color:"#27AE60"}}><b>${calculateEarnings(creationState.day_trips.price_for_4_hours)}</b></p>
                      <p><b>-</b></p>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display={'flex'} alignItems={'center'}>
                        <Box display={'flex'} width={"50%"} alignItems={'center'}>
                        <Checkbox
                          name="6Hours"
                          checked={creationState.day_trips.price_for_6_hours > 0.00 ?true:false}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <h3>6 Hours</h3>
                        </Box>
                        <Box width={"50%"}>
                          <DefaultInput name="price_for_6_hours" type={"number"} onChange={handleInputChange} value={creationState.day_trips.price_for_6_hours} placeholder="Price Per 4 Hours..." label=""/>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <p>Total (excl. fees)</p>
                      <p>You earn</p>
                      <p style={{color:"#27AE60"}}>Price Breakdown</p>
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <p><b>${creationState.day_trips.price_for_6_hours}</b></p>
                      <p style={{color:"#27AE60"}}><b>${calculateEarnings(creationState.day_trips.price_for_6_hours)}</b></p>
                      <p><b>-</b></p>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display={'flex'} alignItems={'center'}>
                        <Box display={'flex'} width={"50%"} alignItems={'center'}>
                        <Checkbox
                          name="8Hours"
                          checked={creationState.day_trips.price_for_8_hours > 0.00 ?true:false}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <h3>8 Hours</h3>
                        </Box>
                        <Box width={"50%"}>
                          <DefaultInput name="price_for_8_hours" type={"number"} onChange={handleInputChange} value={creationState.day_trips.price_for_8_hours} placeholder="Price Per 8 Hours..." label=""/>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <p>Total (excl. fees)</p>
                      <p>You earn</p>
                      <p style={{color:"#27AE60"}}>Price Breakdown</p>
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <p><b>${creationState.day_trips.price_for_8_hours}</b></p>
                      <p style={{color:"#27AE60"}}><b>${calculateEarnings(creationState.day_trips.price_for_8_hours)}</b></p>
                      <p><b>-</b></p>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                      <Box display={'flex'} alignItems={'center'} justifyContent="center">
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Guest<br/>Capacity</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="Number of guests allowed to stay on your watercraft.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <DefaultInput name="guest_capacity" type={"number"} onChange={handleInputChange} value={creationState.day_trips.guest_capacity} placeholder="- - -" label=""/>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <h1 style={{textAlign:"center"}}>Deposits & Extras (Optional)</h1>
                  </Box>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6} sm={3}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Security Deposit</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="Initial deposit amount for booking this listing.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <DefaultInput name="security_deposit" type={"number"} onChange={handleInputChange} value={creationState.day_trips.security_deposit === 0.00 ? '': creationState.day_trips.security_deposit} placeholder="- - -" label=""/>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" mt={2}>
                    <Grid item xs={6} sm={3}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Taxes</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="Tax amount for this listing.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <DefaultInput name="taxes" type={"number"} onChange={handleInputChange} value={creationState.day_trips.taxes === 0.00 ? '': creationState.day_trips.taxes } placeholder="- - -" label=""/>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" mt={2}>
                    <Grid item xs={6} sm={3}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Gratuity</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="Gratuity amount for this listing.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <DefaultInput name="gratuity" type={"number"} onChange={handleInputChange} value={creationState.day_trips.gratuity === 0.00 ? '': creationState.day_trips.gratuity } placeholder="- - -" label=""/>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" mt={2}>
                    <Grid item xs={6} sm={3}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Fuel Policy</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="If you are charging for fuel, add your cost here, otherwise leave empty.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <DefaultInput name="fuel_policy" type={"number"} onChange={handleInputChange} value={creationState.day_trips.fuel_policy} placeholder="- - -" label=""/>
                    </Grid>
                  </Grid>

                  <Box mt={5}>
                    <h1 style={{textAlign:"center"}}>Add-Ons (Optional)</h1>
                  </Box>

                  <Grid container spacing={2} alignItems="center" mt={2}>
                    <Grid item xs={12}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'}>
                          <Checkbox
                            name="chef"
                            checked={creationState.day_trips.chef}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={handleCheckboxChange}
                          />
                        </Box>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Chef</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="If your vessel offers an onboard chef, check this box.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'}>
                          <Checkbox
                            name="extra_water_toys"
                            checked={creationState.day_trips.extra_water_toys === null ? false : true}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={handleCheckboxChange}
                          />
                        </Box>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Water Toys</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="If your vessel offers water toys, please check this box.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'}>
                          <Checkbox
                            name="catering_service"
                            checked={creationState.day_trips.catering_service}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={handleCheckboxChange}
                          />
                        </Box>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Catering Service</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="If your vessel offers catering serivce, please check this box.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'}>
                          <Checkbox
                            name="additional_crew"
                            checked={creationState.day_trips.additional_crew}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={handleCheckboxChange}
                          />
                        </Box>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Additional Crew</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="If your vessel offers additional_crew, please check this box.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Other</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="Any additional offers, you can use this box to describe.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={5}>
                          <DefaultInput name="other" type={"text"} onChange={handleInputChange} value={creationState.day_trips.other} placeholder="- - -" label=""/>
                        </Box>
                      </Box>

                    </Grid>
                  </Grid>


                </WizardCardBody>
            </WizardCardContainer>

          </Grid>
          <Grid item xs={12} sm={6}>
            <WizardCardContainer>
              <WizardCardHeader>Overnight Stays</WizardCardHeader>
                <WizardCardBody>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display={'flex'} alignItems={'center'}>
                        <Box display={'flex'} width={"50%"} alignItems={'center'}>
                        <Checkbox
                          name="days"
                          checked={creationState.overnight_stays.price_per_day > 0 ?true:false}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <h3>Days</h3>
                        </Box>
                        <Box width={"50%"}>
                          <DefaultInput name="price_per_day" type={"number"} onChange={handleInputOvernightChange} value={creationState.overnight_stays.price_per_day} placeholder="Price Per Day..." label=""/>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <p>Total (excl. fees)</p>
                      <p>You earn</p>
                      <p style={{color:"#27AE60"}}>Price Breakdown</p>
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <p><b>${creationState.overnight_stays.price_per_day}</b></p>
                      <p style={{color:"#27AE60"}}><b>${calculateEarnings(creationState.overnight_stays.price_per_day)}</b></p>
                      <p><b>-</b></p>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display={'flex'} alignItems={'center'}>
                        <Box display={'flex'} width={"50%"} alignItems={'center'}>
                        <Checkbox
                          name="weeks"
                          checked={creationState.overnight_stays.price_per_week > 0 ?true:false}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <h3>Weeks</h3>
                        </Box>
                        <Box width={"50%"}>
                          <DefaultInput name="price_per_week" type={"number"} onChange={handleInputOvernightChange} value={creationState.overnight_stays.price_per_week} placeholder="Price Per Week..." label=""/>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <p>Total (excl. fees)</p>
                      <p>You earn</p>
                      <p style={{color:"#27AE60"}}>Price Breakdown</p>
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <p><b>${creationState.overnight_stays.price_per_week}</b></p>
                      <p style={{color:"#27AE60"}}><b>${calculateEarnings(creationState.overnight_stays.price_per_week)}</b></p>
                      <p><b>-</b></p>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                      <Box display={'flex'} alignItems={'center'} justifyContent="center">
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Guest<br/>Capacity</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="Number of guests allowed to stay on your watercraft overnight.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <DefaultInput name="guest_capacity" type={"number"} onChange={handleInputOvernightChange} value={creationState.overnight_stays.guest_capacity} placeholder="- - -" label=""/>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <h1 style={{textAlign:"center"}}>Deposits & Extras (Optional)</h1>
                  </Box>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6} sm={3}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Security Deposit</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="Initial deposit amount for booking this listing.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <DefaultInput name="security_deposit" type={"number"} onChange={handleInputOvernightChange} value={creationState.overnight_stays.security_deposit === 0.00 ? '': creationState.overnight_stays.security_deposit} placeholder="- - -" label=""/>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" mt={2}>
                    <Grid item xs={6} sm={3}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Taxes</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="Tax amount for this listing.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <DefaultInput name="taxes" type={"number"} onChange={handleInputOvernightChange} value={creationState.overnight_stays.taxes === 0.00 ? '': creationState.overnight_stays.taxes } placeholder="- - -" label=""/>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" mt={2}>
                    <Grid item xs={6} sm={3}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Gratuity</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="Gratuity amount for this listing.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <DefaultInput name="gratuity" type={"number"} onChange={handleInputOvernightChange} value={creationState.overnight_stays.gratuity === 0.00 ? '': creationState.overnight_stays.gratuity } placeholder="- - -" label=""/>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" mt={2}>
                    <Grid item xs={6} sm={3}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>APA</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="If you are charging for APA costs, add your cost here, otherwise leave empty.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <DefaultInput name="apa" type={"number"} onChange={handleInputOvernightChange} value={creationState.overnight_stays.apa} placeholder="- - -" label=""/>
                    </Grid>
                  </Grid>

                  <Box mt={5}>
                    <h1 style={{textAlign:"center"}}>Add-Ons (Optional)</h1>
                  </Box>

                  <Grid container spacing={2} alignItems="center" mt={2}>
                    <Grid item xs={12}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'}>
                          <Checkbox
                            name="chef"
                            checked={creationState.overnight_stays.chef}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={handleCheckboxOvernightChange}
                          />
                        </Box>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Chef</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="If your vessel offers an onboard chef, check this box.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'}>
                          <Checkbox
                            name="extra_water_toys"
                            checked={creationState.overnight_stays.extra_water_toys === null ? false : true}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={handleCheckboxOvernightChange}
                          />
                        </Box>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Water Toys</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="If your vessel offers water toys, please check this box.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'}>
                          <Checkbox
                            name="catering_service"
                            checked={creationState.overnight_stays.catering_service}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={handleCheckboxOvernightChange}
                          />
                        </Box>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Catering Service</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="If your vessel offers catering serivce, please check this box.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'}>
                          <Checkbox
                            name="additional_crew"
                            checked={creationState.overnight_stays.additional_crew}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={handleCheckboxOvernightChange}
                          />
                        </Box>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Additional Crew</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="If your vessel offers additional_crew, please check this box.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box display={'flex'} alignItems={'center'} mr={5}>
                        <Box display={'flex'} alignItems={'center'} textAlign="center">
                          <p>Other</p>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={2}>
                          <DefaultToolTip title="Any additional offers, you can use this box to describe.">
                            <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                          </DefaultToolTip>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} pl={5}>
                          <DefaultInput name="other" type={"text"} onChange={handleInputOvernightChange} value={creationState.day_trips.other} placeholder="- - -" label=""/>
                        </Box>
                      </Box>

                    </Grid>
                  </Grid>


                </WizardCardBody>
            </WizardCardContainer>

          </Grid>
        </Grid>

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

export const HelpIcon = styled.img`
  width: 25px;
  height: 25px;
`;

export const GetingStartedHeader = styled.h1`
  color:white;
`;

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
