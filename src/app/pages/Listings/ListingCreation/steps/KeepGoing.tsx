import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton, Grid } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";
import { useListcreationSlice } from "../slice";

interface Props{
  setIndex:any;
  activeIndex:number;
  percent:string;
}

export function KeepGoing(props:Props) {

  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const creationState = useSelector(selectListcreation)


  const [media, set_media] = React.useState<any>([]);

  const history = useHistory();

  function addFiles(e:any) {
    let files = e.currentTarget.files
    let media = Array.from(files)
    console.log(media)
    let urlList:any = [];
    for (let index = 0; index < media.length; index++) {
      const element = media[index];
      const fileUrl = URL.createObjectURL(element)
      urlList.push(fileUrl)
    }
    set_media(urlList)
    setTimeout(() => dispatch(actions.setImages({images:urlList})), 0);

  }



  return (
    <>
      <Container>
        <KeepGoingContainer>
          <Box width="20%">
            <h1>{props.percent}%</h1>
          </Box>
          <Box width="80%">
            <KeepGoingHeader>Keep Going, You’re getting there!</KeepGoingHeader>
            {props.percent === "60"
            ? <p>Thank you for helping us understand more about your boat! Now let's see what makes your boat unique.</p>
            : <p>Thank you for listing what makes your yacht unique. Just 1 step left to go!</p>

            }
            <WizardButtonFlex>
              <WizardSecondaryBtn
                 name={"Back"}
                 onClick={()=>props.setIndex(props.activeIndex-1)}
                 disabled={false}
               >
                Go Back
               </WizardSecondaryBtn>

               <WizardNextBtn
                  name={"cancel"}
                  onClick={()=>props.setIndex(props.activeIndex+1)}
                  disabled={false}
                >
                 Continue
                </WizardNextBtn>
            </WizardButtonFlex>
          </Box>
        </KeepGoingContainer>
      </Container>
    </>
  );
}

export const KeepGoingHeader = styled.h1`
  font-family: GilroyBold;
  font-size: clamp(16px, 3.5vw, 30px);
  line-height: 30px;
  text-transform: uppercase;
  color:#4285F4;
`;

export const KeepGoingContainer = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  align-content:center;
  text-align:center;
  width: 795px;
  height: 440px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 20px;
  margin:auto;
  margin-top:75px;
  padding:25px;
`;
