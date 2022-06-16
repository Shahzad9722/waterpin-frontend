import React from 'react';
import './fleet.scss';
import styled from 'styled-components/macro';
import { Carousels } from '../../../components/Carousels';
import { Grid, Button, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper} from '@mui/material';
import { DefaultSwitch } from '../../../components/input';
import { makeStyles } from "@mui/styles";
import { useHistory } from 'react-router-dom';
import { handleListingEditRedirect } from '../../../components/utils';



interface Props{
  listings:any[];
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const useStyles = makeStyles({
    table: {
      width: '100%',
    },
    cell: {
      background: '#FFFFFF',
      border: '1px solid #E0E0E0',
      fontFamily: 'GilroyMedium',
      fontSize: '0.833vw',
      color: '#333333',
      padding: '0.521vw 0px 0.521vw 1.042vw',
      minHeight: '50px',
    },
    buttonCell: {
      background: '#FFFFFF',
      border: '1px solid #E0E0E0',
      fontFamily: 'GilroyMedium',
      fontSize: '0.833vw',
      color: '#333333',
      padding: '0.469vw',
      textAlign: 'center',
      minHeight: '50px',
    },
    rowHeader: {
      background: '#F5F5F7',
    },
    rowHeaderCell: {
      fontFamily: ' GilroyBold',
      fontSize: ' 0.8vw',
      padding: '0.938vw 0px 0.938vw 1.042vw',
    },
    rowHeaderCellTitle: {
      fontFamily: ' GilroyBold',
      fontSize: ' 0.8vw',
      padding: '0.938vw 0px 0.938vw 20px',
      textAlign: 'left',
    },
  });

export const FleetListView = (props:Props) => {
  const history = useHistory();


  const [listing_images, set_listing_images] = React.useState<any>([]);
  const classes = useStyles();


  // React.useEffect(() => {
  //   if(props.listing !== undefined && props.listing !== null){
  //     if (props.listing.images) {
  //       if (isEmpty(props.listing.images) === false) {
  //         const images:any = [...props.listing.images];
  //         set_listing_images(images)
  //       }
  //     }
  //   }
  // },[props.listing])

  return (
      <TableContainer style={{ padding: '0px', marginTop: '10px' }}>
      <Table className={classes.table}>
        <TableHead className={classes.rowHeader}>
          <TableRow>
            <TableCell className={classes.rowHeaderCell}>TYPE</TableCell>
            <TableCell className={classes.rowHeaderCellTitle}>
              {' '}
              TITLE{' '}
            </TableCell>
            <TableCell className={classes.rowHeaderCell}>STATUS</TableCell>
            <TableCell className={classes.rowHeaderCell}>CAPACITY (Day / Nights) </TableCell>
            <TableCell className={classes.rowHeaderCell}>LOCATION </TableCell>
            <TableCell className={classes.rowHeaderCell}>REVIEWS </TableCell>
            <TableCell className={classes.rowHeaderCell}>
              CANCELATION POLICY
            </TableCell>
            <TableCell className={classes.rowHeaderCell}>BOOKINGS </TableCell>
            <TableCell className={classes.rowHeaderCell}>ACTION </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.listings.map((row) => (
            <TableRow key={row.title}>
              <TableCell className={classes.cell} style={{ width: '6.771vw' }}>
                {row.listing_type_id === 1 ? 'Boat' : row.listing_type_id === 2 ? "Yacht": row.listing_type_id === 3 ? "Water Activity" : "Vessel" }
              </TableCell>
              <TableCell className={classes.cell} style={{ width: '19.010vw' }}>
                {row.listing_name}
              </TableCell>
              <TableCell
                className={classes.buttonCell}
                style={{ width: '5.313vw' }}
              >
                {row.status === 'Active' ? (
                  <DefaultSwitch
                    value={true}
                    onChange={() => console.log('hello')}
                  />
                ) : (
                  <DefaultSwitch
                    value={false}
                    onChange={() => console.log('hello')}
                  />
                )}
              </TableCell>
              <TableCell className={classes.cell} style={{ width: '6.771vw' }}>
                {row.day_trips === 1 && row.overnight_stays === 0
                  ? <>{row.day_trip_related && row.day_trip_related.guest_capacity}</>
                  : row.overnight_stays === 1 && row.day_trips === 0
                  ? <>{row.overnights_related &&  row.overnights_related.guest_capacity}</>
                  :<>{row.day_trip_related && row.day_trip_related.guest_capacity} / {row.overnights_related && row.overnights_related.guest_capacity} </>
                }
              </TableCell>
              <TableCell className={classes.cell} style={{ width: '9.271vw' }}>
                {row.street_address}, {row.city}
              </TableCell>
              <TableCell className={classes.cell} style={{ width: '7.813vw' }}>
                {row.reviews && row.reviews.length} Reviews
              </TableCell>
              <TableCell className={classes.cell} style={{ width: '11.302vw' }}>

                {row.cancelation_policy && row.cancelation_policy.flexible === 1
                  ? <>{`Flexible`}</>
                  : row.cancelation_policy && row.cancelation_policy.moderate === 1
                  ? <>{`Moderate`}</>
                  : row.cancelation_policy && row.cancelation_policy.strict === 1
                  ? <>{`Strict`}</>
                  : row.cancelation_policy && row.cancelation_policy.use_your_own !== ""
                  ? <>{row.cancelation_policy.use_your_own}</>
                  :<>{`Flexible`}</>
                }
              </TableCell>
              <TableCell className={classes.cell} style={{ width: '7.656vw' }}>
                {row.bookings && row.bookings.length}
              </TableCell>
              <TableCell
                className={classes.buttonCell}
                style={{ display: 'flex', width: '5.677vw' }}
              >
                <ActionSpan onClick={()=>handleListingEditRedirect(row, history)} style={{color:"#4385f3"}}>
                  <img src={process.env.PUBLIC_URL + `/edit.svg`} style={{ marginBottom: '2px' }} />
                  <div>Edit</div>
                </ActionSpan>
                <span style={{ width: '20px' }}></span>
                <ActionSpan onClick={()=>history.push(`/listings/detail/${row.listing_id}`)}>
                  <img src={process.env.PUBLIC_URL + `/eye-outline.svg`} style={{ marginBottom: '2px' }} />
                  <div>View</div>
                </ActionSpan>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ActionSpan = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  cursor:pointer;
  &:hover{
    opacity:0.5;
  }
`;

const ListingCardImageWrapper = styled.div`
  height:235px;
  img{
    border-radius: 20px;
    width:100%;
    height:100%;
  }
`;

export default FleetListView;
