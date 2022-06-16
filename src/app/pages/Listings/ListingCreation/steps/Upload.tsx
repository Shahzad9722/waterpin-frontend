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
}

export function Upload(props:Props) {

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
    setTimeout(() => dispatch(actions.setImages({images:media})), 0);

  }



  return (
    <>
      <Helmet>
        <title>Location</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>

        {media.length > 0
        ? (
          <>
            <Box width="100%">
              <h1>Click and drag to reorder photos</h1>
              <p>We require minimum 3 photos</p>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={3}>
                <form action="#" encType="multipart/form-data" method="post">
                  <UploadButton htmlFor="file-upload" style={{width:"100%"}}>
                    <img src={process.env.PUBLIC_URL+'/upload.png'}/>
                    <h1 style={{fontWeight:200}}>Upload</h1>
                    <input name='files[]' id="file-upload" type="file" onChange={(e:any)=> addFiles(e)} multiple />
                  </UploadButton>
                </form>
              </Grid>
              {media.map((img:any) => (
                <Grid item xs={3}>
                  <PhotoContainer>
                    <img src={img}/>
                  </PhotoContainer>
                </Grid>
              ))}
            </Grid>
          </>
        )
        : (
          <UploadContainer>
            <Box width="100%">
              <h1>Drag and Drop or Click Here To Choose Photos</h1>
            </Box>
            <Box>
            <form action="#" encType="multipart/form-data" method="post">
              <UploadButton htmlFor="file-upload">
                <img src={process.env.PUBLIC_URL+'/upload.png'}/>
                <h1 style={{fontWeight:200}}>Upload</h1>
                <input id="file-upload" type="file" onChange={(e:any)=> addFiles(e)} multiple />
              </UploadButton>
            </form>
            </Box>
          </UploadContainer>
        )
        }


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

export const UploadButton = styled.label`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  align-content:center;
  width: 320px;
  height: 215px;
  background: #FFFFFF;
  border: 2px solid #333333;
  box-sizing: border-box;
  margin-top:10px;
  border-radius: 20px;
  cursor:pointer;
  transition: all ease-in-out .3s;

  input[type="file"] {
    display: none;
  }

  &:hover {
    box-shadow: 0px 8px 20px -5px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);
    opacity: 100;
  }

`;


export const PhotoContainer = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  align-content:center;
  width: 250px;
  height:100%;
  background: #FFFFFF;
  border: 0px solid #333333;

  cursor:pointer;
  transition: all ease-in-out .3s;

  &:hover {
    box-shadow: 0px 8px 20px -5px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);
    opacity: 100;
  }

  img{
    width: 100%;
  }

`;

export const UploadContainer = styled.div`
  width: 100%;
  height: 400px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  align-content:center;
  text-align:center;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 20px;
  margin-top:45px;
`;
