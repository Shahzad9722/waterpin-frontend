/**
 *
 * Footer
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Container, Grid, Rating, Button, Box } from '@mui/material';
import star from './images/Star 13.png';
import { useHistory } from 'react-router-dom';

import { SubFooter } from "../SubFooter";

interface Props {
  no_margin?:boolean;
}

export function Footer(props: Props) {

  const history = useHistory();

  return (
    <>
      <Div no_margin={props.no_margin}>
        <Container>
          <Grid container mb={10}>
            <Grid item xs={12} sm={6} md={3}>
              <Title>About</Title>
              <FooterLink onClick={()=>history.push('/site/how-it-works')}>How It Works</FooterLink>
              <FooterLink onClick={()=>history.push('/rewards/')}>Points & Rewards</FooterLink>
              <FooterLink onClick={()=>history.push('/help-center/')}>Policies</FooterLink>
              <FooterLink onClick={()=>history.push('/blog')}>Blog</FooterLink>
              <FooterLink onClick={()=>history.push('/site/reviews')}>Reviews</FooterLink>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Title>Explore</Title>
              <FooterLink onClick={()=>history.push('/listings/overnights')}>Overnight Stays</FooterLink>
              <FooterLink onClick={()=>history.push('/listings/day-trips')}>Day Trips</FooterLink>
              <FooterLink onClick={()=>history.push('/listings/water-activities')}>Water Activities</FooterLink>
              <FooterLink onClick={()=>history.push('/destinations')}>Destinations</FooterLink>
              <FooterLink onClick={()=>history.push('/listings/overnights')}>New Listings</FooterLink>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Title>Support</Title>
              <FooterLink onClick={()=>history.push('/help-center/renter/cancellation-policy-renter')}>Cancellation Policy</FooterLink>
              <FooterLink onClick={()=>history.push('/help-center')}>Trust & Safety</FooterLink>
              <FooterLink onClick={()=>history.push('/help-center')}>Help Center</FooterLink>
              <FooterLink onClick={()=>history.push('/site/careers')}>Careers</FooterLink>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Title>Connect With Us</Title>
              <SubTitle>
                <RoundButton>
                  <i className="fab fa-instagram"></i>
                </RoundButton>{' '}
                <FBRoundButton>
                  <i className="fab fa-facebook-f"></i>
                </FBRoundButton>{' '}
                <RoundButton>
                  <i className="fab fa-twitter"></i>
                </RoundButton>{' '}
                <RoundButton>
                  {/* <i className="fab fa-pinterest-p"></i> */}
                  <i className="fab fa-pinterest"></i>
                </RoundButton>
              </SubTitle>
              <SubTitleBold>Customer Reviews</SubTitleBold>

              <SubTitle>
                {/* <StarIcon src={star} />
                <StarIcon src={star} />
                <StarIcon src={star} />
                <StarIcon src={star} />
                <StarIcon src={star} /> */}
                <Rating readOnly size="large" defaultValue={5} /> 5.00 / 5.00
              </SubTitle>
              <SubTitle>Based on 8 Reviews</SubTitle>
            </Grid>
          </Grid>
          <Line></Line>
          <SubFooter/>
        </Container>

      </Div>
    </>
  );
}

const Div = styled.div<{no_margin?:boolean}>`
  margin-top:5rem;
  background: #f5f5f7;

  ${({ no_margin }) => no_margin === true && `
    margin-top:0rem;
   `}
`;

const Title = styled.h2`
  padding-top: 100px;
  font-family: GilroyBold;
  font-size: 24px;
  line-height: 28px;
  color: #333333;
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 0px;
  }

  @media only screen and (max-width: 800px) and (min-width: 599.98px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 0px;
  }
  @media only screen and (max-width: 1050px) and (min-width: 799.98px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 0px;
  }
`;

const FooterLink = styled.a`
  display: flex;
  margin-top:1rem;
  align-items: center;
  font-family: GilroyMedium;
  font-size: 18px;
  line-height: 21px;
  color: #828282;
  cursor:pointer;

  :hover{
    text-decoration:underline;
  }

  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // margin: 0 0 0 0;
  }
  @media only screen and (max-width: 800px) and (min-width: 599.98px) {
    display: flex;
    justify-content: center;
    align-items: center;
    // flex-direction: column;
    margin-top: 0px;
  }
  @media only screen and (max-width: 1050px) and (min-width: 799.98px) {
    display: flex;
    justify-content: center;
    align-items: center;
    // flex-direction: column;
    margin-top: 0px;
  }
`;

const SubTitle = styled.p`
  display: flex;
  align-items: center;
  font-family: GilroyMedium;
  font-size: 18px;
  line-height: 21px;
  color: #828282;
  cursor:pointer;

  :hover{
    text-decoration:underline;
  }

  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // margin: 0 0 0 0;
  }
  @media only screen and (max-width: 800px) and (min-width: 599.98px) {
    display: flex;
    justify-content: center;
    align-items: center;
    // flex-direction: column;
    margin-top: 0px;
  }
  @media only screen and (max-width: 1050px) and (min-width: 799.98px) {
    display: flex;
    justify-content: center;
    align-items: center;
    // flex-direction: column;
    margin-top: 0px;
  }
`;

const SubTitleBold = styled.p`
  font-family: GilroyBold;
  font-size: 18px;
  line-height: 21px;
  color: #333333;
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // margin: 0 0 0 0;
  }
  @media only screen and (max-width: 800px) and (min-width: 599.98px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 0px;
  }
  @media only screen and (max-width: 1050px) and (min-width: 799.98px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 0px;
  }
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 0px;
  border: 1px solid #c9c9c9;
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 0 0 30px;
  }
  @media only screen and (max-width: 800px) and (min-width: 599.98px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 0 0 50px;
    width: 650px;
  }
  @media only screen and (max-width: 1050px) and (min-width: 799.98px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 0 0 20px;
  }
`;

const RoundButton = styled.button`
  border-radius: 50%;
  padding: 10px 10px 10px 10px;
  color: #ffffff;
  background: #828282;
  border: 0px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const FBRoundButton = styled.button`
  border-radius: 50%;
  padding: 10px 12px 10px 12px;
  color: #ffffff;
  background: #4285f4;
  border: 0px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const StarSubTitle = styled.p`
  font-family: GilroyMedium;
  font-size: 20px;
  line-height: 21px;
  color: #828282;
  // @media only screen and (max-width: 600px) {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   flex-direction: column;
  //   margin-top: 0px;
  // }
  // @media only screen and (max-width: 800px) and (min-width: 599.98px) {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   flex-direction: column;
  //   margin-top: 0px;
  // }
  // @media only screen and (max-width: 1050px) and (min-width: 799.98px) {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   flex-direction: column;
  //   margin-top: 0px;
  // }
`;

const StarIcon = styled.img`
  width: 25px;
  height: 25px;
  margin: -10px 7px 0 0;
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    // margin: 0 0 0 0;
  }
`;
