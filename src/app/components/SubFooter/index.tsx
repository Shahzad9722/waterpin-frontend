/**
 *
 * SubFooter
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Container, Grid } from '@mui/material';
import globe from './images/Vector.png';
import arrow from './images/Vector (1).png';
import { useHistory } from 'react-router-dom';

interface Props {}

export function SubFooter(props: Props) {
  const history = useHistory();


  return (
    <>
      <Div>
        <Container>
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
              <Title>
                © 2020 <TitleSpan>Waterpin</TitleSpan> Inc. All rights reserved
              </Title>
            </Grid>
            <Grid item xs={12} sm={6} md={2} textAlign="center">
              <a onClick={()=>history.push('/help-center/terms-and-conditions/privacy-policy')}>
                <Title>Privacy</Title>
              </a>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <a onClick={()=>history.push('/help-center/terms-and-conditions/general-terms')}>
                <Title>Terms</Title>
              </a>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <SubTitle>
                <SubTitleImage src={globe} />{' '}
                <SubTitleSpan> English </SubTitleSpan>{' '}
                <SubTitleImage2 src={arrow} />
              </SubTitle>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <SubTitle>
                $ <SubTitleSpan>USD</SubTitleSpan>
              </SubTitle>
            </Grid>
          </Grid>
        </Container>
      </Div>
    </>
  );
}

const Div = styled.div`
  background: #f5f5f7;
`;

const Title = styled.h2`
  font-family: GilroyRegular;
  font-size: 18px;
  line-height: 21px;
  color: #828282;
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  @media only screen and (max-width: 800px) and (min-width: 599.98px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const TitleSpan = styled.span`
  font-family: GilroyBold;
  font-size: 18px;
  line-height: 21px;
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
`;

const SubTitle = styled.p`
  font-family: GilroyRegular;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #000000;
`;

const SubTitleSpan = styled.span`
  font-family: GilroyRegular;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  text-decoration-line: underline;
  color: #000000;
`;

const SubTitleImage = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 7px;
`;

const SubTitleImage2 = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 7px;
`;
