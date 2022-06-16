/**
 *
 * PlaceCard
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { DestinationPopup } from '../DestinationPopup';

interface Props {
  title?: string;
  image?: string;
  description?: string;
}

export function PlaceCard(props: Props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleModal = () => {
    setOpen(true);
  };

  return (
    <>
      <DestinationPopup
        open={open}
        handleClose={handleClose}
        image={props.image}
        title={props.title}
        description={props.description}
      />
      <Card onClick={toggleModal}>
        <CardMedia component="img" height="200" image={props.image} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            fontFamily={'Gilroy-Bold'}
            display={'flex'}
            style={{ flex: 1 }}
            component="div"
          >
            {props.title}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

const Div = styled.div``;
