/**
 *
 * DestinationPopup
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Container, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import {
  Modal,
  Typography,
  Box,
  IconButton,
  ListItemIcon,
  TextField,
  InputBase,
  Button,
  NativeSelect,
  CircularProgress,
} from '@mui/material';

interface Props {
  open: boolean;
  handleClose: any;
  title?: string;
  image?: string;
  description?: string;
}

export function DestinationPopup(props: Props) {
  const history = useHistory();
  const style: any = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    displey: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'translate(-50%, -50%)',
    width: 1350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Div>
        <Modal open={props.open} onClose={props.handleClose}>
          <Box sx={style}>
            <Icon onClick={props.handleClose}>
              <CloseIcon />
            </Icon>
            <Container>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <DestinationImage height="400" src={props.image} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DestinationTitle>{props.title}</DestinationTitle>
                  <DestinationDescription>
                    {props.description}
                  </DestinationDescription>
                  <Btn1
                    onClick={() => history.push('/listings/water-activities/')}
                  >
                    Water Activities
                  </Btn1>{' '}
                  <Btn1 onClick={() => history.push('/listings/overnights/')}>
                    Overnight Stays
                  </Btn1>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Modal>
      </Div>
    </>
  );
}

const Div = styled.div``;

const Icon = styled(IconButton)`
  position: absolute;
  left: 94.37%;
  right: 4.64%;
  top: 19.28%;
  bottom: 77.66%;

  background: #000000;
`;

const DestinationImage = styled.img`
  width: 500px;
  height: 400px;
  border-radius: 20px;
  margin: 0 0 0 50px;
`;

const DestinationTitle = styled.h2`
  // position: absolute;
  margin: -3px 0 0 0;
  font-family: GilroyBold;
  font-size: 52px;
  line-height: 61px;
  text-transform: capitalize;
  color: #000000;
`;

const DestinationDescription = styled.p`
  margin: 25px 25px 0 0;
  font-family: GilroyRegular;
  font-size: 16px;
  line-height: 28px;
  color: #333333;
`;

const Btn1 = styled.button`
  margin: 25px 10px 0 0;
  width: 266px;
  height: 56px;
  background: #ffffff;
  border: 1px solid #333333;
  box-sizing: border-box;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background: #00c2cb;
    border: 0px;
  }
`;
