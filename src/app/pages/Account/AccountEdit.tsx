/**
 *
 * Account
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { Container, Stack, Divider, Box, Button, IconButton, Skeleton, NativeSelect, Fade} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { EditProfileModal } from '../../components/modals';
import { DefaultInput, DefaultSelect } from '../../components/input';
import { DefaultButton } from '../../components/buttons';
import { SettingsHeader, SettingsBox, SettingsLabel, SettingsText, SettingsCard} from './index';
import moment from "moment";

import {
  selectLoading,
  selectPayload,
  selectError,
  selectUser,
  selectSuccess
} from './slice/selectors';

interface Props {
  user:any,
  actions:any
}

export function AccountEdit(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const [userDetails, setUserDetails] = React.useState({firstName:'', lastName:'', gender:'', dob:'', email:'', phoneNumber:'', governmentID:'', address1:'', address2:'',emergencyContactName:'',emergencyContactNo:''});
  const loading = useSelector(selectLoading)
  const [editActive, set_editActive] = React.useState(false);

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
    setTimeout(() => toggleEditModal(), 1500);

  }

  return (
    <>
      <Helmet>
        <title>Account Edit</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <EditProfileModal onClose={toggleEditModal} open={editActive} title={'EDIT PERSONAL INFORMATION'}>
          <SettingsLabel>Legal Name</SettingsLabel>
          <EditInputFlex>
            <Box width={"50%"} pr={2}>
              <DefaultInput name="firstName" onChange={handleInputChange} value={userDetails.firstName} placeholder="First Name" label="First Name"/>
            </Box>
            <Box width={"50%"} pl={2}>
              <DefaultInput name="lastName" onChange={handleInputChange} value={userDetails.lastName} placeholder="Last Name" label="Last Name"/>
            </Box>
          </EditInputFlex>
          <SettingsLabel>Gender</SettingsLabel>
          <DefaultSelect
              name="gender"
              onChange={handleInputChange}
              value={userDetails.gender}
              placeholder="Select a Gender..."
              label="Gender"
            >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='other'>Prefer Not To Say</option>
          </DefaultSelect>
          <SettingsLabel>Date of Birth</SettingsLabel>
          <DefaultInput name="dob" onChange={handleInputChange} value={moment(userDetails.dob).format('YYYY-MM-DD')} placeholder="Date of Birth" label="Date of Birth" type="date"/>
          <SettingsLabel>Email Address</SettingsLabel>
          <DefaultInput name="email" onChange={handleInputChange} value={userDetails.email} placeholder="Email" label="Email"/>
          <SettingsLabel>Phone Number</SettingsLabel>
          <DefaultInput name="phoneNumber" onChange={handleInputChange} value={userDetails.phoneNumber} placeholder="Phone Number" label="Phone Number"/>
          <SettingsLabel>Government ID</SettingsLabel>
          <SettingsLabel>Address 1</SettingsLabel>
          <DefaultInput name="address1" onChange={handleInputChange} value={userDetails.address1} placeholder="Address 1" label="Address 1"/>
          <SettingsLabel>Address 2</SettingsLabel>
          <DefaultInput name="address2" onChange={handleInputChange} value={userDetails.address2} placeholder="Address 2" label="Address 2"/>
          <SettingsLabel>Emergency Contact</SettingsLabel>
          <EditInputFlex>
            <Box width={"50%"} pr={2}>
              <DefaultInput name="emergencyContactName" onChange={handleInputChange} value={userDetails.emergencyContactName} placeholder="Emergency Contact Name" label="Emergency Contact Name"/>
            </Box>
            <Box width={"50%"} pl={2}>
              <DefaultInput name="emergencyContactNo" onChange={handleInputChange} value={userDetails.emergencyContactNo} placeholder="Emergency Contact Number" label="Emergency Contact Number"/>
            </Box>
          </EditInputFlex>

          <ButtonFlex>
            <Box pr={1}>
              <DefaultButton onClick={()=>set_editActive(!editActive)} text="Cancel" type="secondary"/>
            </Box>
            <Box pl={1}>
              <DefaultButton onClick={handleUpdateUserDetails} loading={loading} text="Save" type="primary"/>
            </Box>
          </ButtonFlex>

      </EditProfileModal>
      <Fade in={true}>
          <SettingsCard>
          <SettingsHeader>
            <SettingsLabel style={{marginBottom:20, paddingLeft:20}}>PERSONAL INFORMATION</SettingsLabel>
            <EditLink onClick={()=>set_editActive(!editActive)}>Edit</EditLink>
          </SettingsHeader>
          <SettingsBox>
            <SettingsLabel>Legal Name</SettingsLabel>
            {!loading
              ? (<>
                {props.user.firstName !== null
                  ? <SettingsText>{props.user.firstName} {props.user.lastName}</SettingsText>
                  : <SettingsText>No name given...</SettingsText>
                }
                </>
              )
              : <Skeleton variant="text" height={40} width={"30%"} animation="wave" />
            }

          </SettingsBox>
          <SettingsBox>
            <SettingsLabel>Gender</SettingsLabel>
            {!loading
              ? (<>
                {props.user.gender !== null
                  ? <SettingsText>{props.user.gender}</SettingsText>
                  : <SettingsText>No specified gender...</SettingsText>
                }
                </>
              )
              : <Skeleton variant="text" height={40} width={"30%"} animation="wave" />
            }

          </SettingsBox>
          <SettingsBox>
            <SettingsLabel>Date of Birth</SettingsLabel>
            {!loading
              ? (<>
                {props.user.dob !== null
                  ? <SettingsText>{moment(props.user.dob).format('MM-DD-YYYY')}</SettingsText>
                  : <SettingsText>No birthday added...</SettingsText>
                }
                </>
              )
              : <Skeleton variant="text" height={40} width={"30%"} animation="wave" />
            }

          </SettingsBox>
          <SettingsBox>
            <SettingsLabel>Email Address</SettingsLabel>
            {!loading
              ? (<>
                {props.user.email !== null
                  ? <SettingsText>{props.user.email}</SettingsText>
                  : <SettingsText>No email...</SettingsText>
                }
                </>
              )
              : <Skeleton variant="text" height={40} width={"30%"} animation="wave" />
            }

          </SettingsBox>
          <SettingsBox>
            <SettingsLabel>Phone Number</SettingsLabel>
            {!loading
              ? (<>
                {props.user.phoneNumber !== null
                  ? <SettingsText>{props.user.phoneNumber}</SettingsText>
                  : <SettingsText>No phone number...</SettingsText>
                }
                </>
              )
              : <Skeleton variant="text" height={40} width={"30%"} animation="wave" />
            }

          </SettingsBox>
          <SettingsBox>
            <SettingsLabel>Government ID</SettingsLabel>
            {!loading
              ? (<>
                {props.user.governmentID !== null
                  ? <SettingsText>{props.user.governmentID}</SettingsText>
                  : <SettingsText>Government identification not added yet...</SettingsText>
                }
                </>
              )
              : <Skeleton variant="text" height={40} width={"30%"} animation="wave" />
            }
          </SettingsBox>
          <SettingsBox>
            <SettingsLabel>Address 1</SettingsLabel>
            {!loading
              ? (<>
                {props.user.address1 !== null
                  ? <SettingsText>{props.user.address1}</SettingsText>
                  : <SettingsText>No Address 1...</SettingsText>
                }
                </>
              )
              : <Skeleton variant="text" height={40} width={"30%"} animation="wave" />
            }
          </SettingsBox>
          <SettingsBox>
            <SettingsLabel>Address 2</SettingsLabel>
            {!loading
              ? (<>
                {props.user.address2 !== null
                  ? <SettingsText>{props.user.address2}</SettingsText>
                  : <SettingsText>No Address 2...</SettingsText>
                }
                </>
              )
              : <Skeleton variant="text" height={40} width={"30%"} animation="wave" />
            }
          </SettingsBox>
          <SettingsBox>
            <SettingsLabel>Emergency Contact</SettingsLabel>
            {!loading
              ? (<>
                {props.user.emergencyContactName !== null
                  ? <SettingsText>{props.user.emergencyContactName} - {props.user.emergencyContactNo}</SettingsText>
                  : <SettingsText>No emergency contact...</SettingsText>
                }
                </>
              )
              : <Skeleton variant="text" height={40} width={"30%"} animation="wave" />
            }
          </SettingsBox>
          <br/>
          </SettingsCard>
      </Fade>
    </>
  );
}


const ButtonFlex = styled.div`
  display:flex;
  width:100%;
  justify-content:flex-end;
  margin-top:30px;
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
