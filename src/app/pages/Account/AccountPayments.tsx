/**
 *
 * Account
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { Container, Stack, Divider, Box, Button, IconButton, Skeleton, NativeSelect, Menu, MenuItem, ListItemIcon, Fade} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { EditProfileModal, AddPaymentMethodModal, AddPaymentMethodWrapper} from '../../components/modals';
import { DefaultInput, DefaultSelect } from '../../components/input';
import { DefaultButton } from '../../components/buttons';
import { PaymentMethodComponent, PaymentMethodActionsMenu } from '../../components/user-related';
import { SettingsHeader, SettingsBox, SettingsLabel, SettingsText, SettingsCard} from './index';


import {
  selectLoading,
  selectPayload,
  selectError,
  selectUser,
  selectSuccess
} from './slice/selectors';

import {
  selectActiveViewMode
} from '../../slice/selectors';

interface Props {
  user:any,
  actions:any
}





export function AccountPayments(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const [userDetails, setUserDetails] = React.useState({firstName:'', lastName:'', gender:'', dob:'', email:'', phoneNumber:'', governmentID:'', address1:'', address2:'', payment_methods:[], emergencyContactName:'',emergencyContactNo:''});
  const loading = useSelector(selectLoading)
  const [editActive, set_editActive] = React.useState(false);
  const view_mode = useSelector(selectActiveViewMode)
  const [active_tab_index, set_active_tab_index] = React.useState(0);

  const [addNewPMActive, set_addNewPMActive] = React.useState(false);

  const modalRoot:any = React.useRef()

  React.useEffect(() => {
    if(props !== null && props !== undefined){
      setUserDetails(props.user)
    }
  },[props])

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const toggleEditModal = () => {
    set_editActive(!editActive)
  };

  function handleUpdateUserDetails(e:any) {
    setTimeout(() => dispatch(props.actions.updateAccount(userDetails)), 100);
    setTimeout(() => toggleEditModal(), 2000);

  }

  function renderPaymentMethods(pms:any[]) {
    if (pms === undefined || pms === null) {
      return null
    }
    let renderList:any = []
    pms.forEach(method => {
      renderList.push(
        <PaymentMethodComponent method={method}/>
      )
    });
    return(<>
      {renderList}
    </>
    )
  }

  function handleAddPMToggle() {
    set_addNewPMActive(!addNewPMActive)
  }

  return (
    <>
      <Helmet>
        <title>Account Edit</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <AddPaymentMethodWrapper>
        <div ref={modalRoot} id="modal-root"></div>
        <AddPaymentMethodModal open={addNewPMActive} onClose={handleAddPMToggle} modalRoot={modalRoot} user={props.user}/>
      </AddPaymentMethodWrapper>
      <Fade in={true}>
        <SettingsCard>
        <CardTabHeader>
          <CardTab onClick={()=>set_active_tab_index(0)} selected={active_tab_index === 0?true:false}>
            <SettingsLabel>Payments</SettingsLabel>
          </CardTab>
          {view_mode === "owner"
            ? (
              <CardTab onClick={()=>set_active_tab_index(1)} selected={active_tab_index === 1?true:false}>
                <SettingsLabel>Payouts</SettingsLabel>
              </CardTab>
            )
            : null
          }

        </CardTabHeader>

        {active_tab_index === 0
        ? (
          <CardContainer>
            <SettingsLabel>Payment Methods</SettingsLabel>
            <SettingsText style={{fontSize:18, color:"#828282"}}>Add and manage your payment methods using our secure payment system.</SettingsText>
            {userDetails && renderPaymentMethods(userDetails.payment_methods)}

          </CardContainer>
        )
        : active_tab_index === 1
        ? (
          <CardContainer>
            <SettingsLabel>Payouts</SettingsLabel>
            <SettingsText style={{fontSize:18, color:"#828282"}}>Add and manage your payment methods using our secure payment system.</SettingsText>

          </CardContainer>
        )
        :null
        }
        <br/>
        </SettingsCard>
      </Fade>
      <Box display={'flex'} justifyContent={'flex-end'} width={'100%'} mt={5}>
      <DefaultButton onClick={handleAddPMToggle} text="Add Payment Method"/>
      </Box>
    </>
  );
}




const CardContainer = styled.div`
  display:flex;
  width:100%;
  justify-content:flex-start;
  flex-direction:column;
  padding:45px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 0px 0px 15px 15px;
  margin-top:10px;
`;

const CardTab = styled.div<{selected:boolean}>`
  padding:15px;
  border-bottom: 3px solid black;
  text-align:center;
  transition: all ease-in-out 0.2s;
  cursor:pointer;
  margin-right:20px;
  &&:hover{
    border-bottom: 3px solid #00C2CB;
    color:#00C2CB;
  }

  ${({ selected }) => selected && `
    border-bottom: 3px solid #00C2CB;
    color:#00C2CB;
   `}

`;

const CardTabHeader = styled.div`
  display:flex;
  width:100%;
  justify-content:flex-start;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 15px 15px 0px 0px;
  padding: 0px 20px;
`;

const ButtonFlex = styled.div`
  display:flex;
  width:100%;
  justify-content:flex-end;
  margin-top:15px;
`;

const EditInputFlex = styled.div`
  display:flex;
  width:100%;
`;

const EditLink = styled.a`
  text-decoration-line: underline;
  font-family: GilroyMedium;
  font-size: 16px;
  line-height: 19px;
  color:#4285f4;
  padding-right:10px;
`;
