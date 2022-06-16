/**
 *
 * Account
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import {
  Container,
  Stack,
  Divider,
  Box,
  Button,
  IconButton,
  Skeleton,
  NativeSelect,
  Switch,
  Fade,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { EditProfileModal } from '../../components/modals';
import {
  DefaultInput,
  DefaultSelect,
  DefaultSwitch,
} from '../../components/input';
import { DefaultButton } from '../../components/buttons';
import {
  SettingsHeader,
  SettingsBox,
  SettingsLabel,
  SettingsText,
  SettingsCard,
} from './index';

import {
  selectLoading,
  selectPayload,
  selectError,
  selectUser,
  selectSuccess,
} from './slice/selectors';

interface Props {
  user: any;
  actions: any;
}

export function LoginAndSecurity(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const [userDetails, setUserDetails] = React.useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
    phoneNumber: '',
    governmentID: '',
    address1: '',
    address2: '',
    emergencyContactName: '',
    emergencyContactNo: '',
    googleUserId: '',
    facebookUserId: '',
    instagramUserId: null,
  });
  const loading = useSelector(selectLoading);
  const authUser = useSelector(selectUser);
  const [editActive, set_editActive] = React.useState(false);
  const [password, set_password] = React.useState('');
  const [password_changed_ago, set_password_changed_ago] =
    React.useState('never');
  const [checked, setChecked]: any = React.useState(
    authUser && authUser.twoStepAuth,
  );

  React.useEffect(() => {
    if (props !== null && props !== undefined) {
      setUserDetails(props.user);
    }
  }, [props]);

  const handletoggleClick = (e, val) => {
    console.log('before', val);
    setChecked(val);
    setTimeout(
      () =>
        dispatch(
          props.actions.toggleTwoStep({
            user_id: authUser.id,
            isChecked: val,
          }),
        ),
      100,
    );
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const toggleEditModal = () => {
    set_editActive(!editActive);
  };

  function handleUpdateUserDetails(e: any) {
    setTimeout(() => dispatch(props.actions.updateAccount(userDetails)), 100);
    setTimeout(() => toggleEditModal(), 2000);
  }

  return (
    <>
      <Helmet>
        <title>Login And Security</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <EditProfileModal
        onClose={toggleEditModal}
        open={editActive}
        title={'EDIT PERSONAL INFORMATION'}
      >
        <SettingsLabel>Legal Name</SettingsLabel>
        <EditInputFlex>
          <Box width={'50%'} pr={2}>
            <DefaultInput
              name="firstName"
              onChange={handleInputChange}
              value={userDetails.firstName}
              placeholder="First Name"
              label="First Name"
            />
          </Box>
          <Box width={'50%'} pl={2}>
            <DefaultInput
              name="lastName"
              onChange={handleInputChange}
              value={userDetails.lastName}
              placeholder="Last Name"
              label="Last Name"
            />
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
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="other">Prefer Not To Say</option>
        </DefaultSelect>
        <SettingsLabel>Date of Birth</SettingsLabel>
        <DefaultInput
          name="dob"
          onChange={handleInputChange}
          value={userDetails.dob}
          placeholder="Date of Birth"
          label="Date of Birth"
          type="date"
        />
        <SettingsLabel>Email Address</SettingsLabel>
        <DefaultInput
          name="email"
          onChange={handleInputChange}
          value={userDetails.email}
          placeholder="Email"
          label="Email"
        />
        <SettingsLabel>Phone Number</SettingsLabel>
        <DefaultInput
          name="phoneNumber"
          onChange={handleInputChange}
          value={userDetails.phoneNumber}
          placeholder="Phone Number"
          label="Phone Number"
        />
        <SettingsLabel>Government ID</SettingsLabel>
        <SettingsLabel>Address 1</SettingsLabel>
        <DefaultInput
          name="address1"
          onChange={handleInputChange}
          value={userDetails.address1}
          placeholder="Address 1"
          label="Address 1"
        />
        <SettingsLabel>Address 2</SettingsLabel>
        <DefaultInput
          name="address2"
          onChange={handleInputChange}
          value={userDetails.address2}
          placeholder="Address 2"
          label="Address 2"
        />
        <SettingsLabel>Emergency Contact</SettingsLabel>
        <EditInputFlex>
          <Box width={'50%'} pr={2}>
            <DefaultInput
              name="emergencyContactName"
              onChange={handleInputChange}
              value={userDetails.emergencyContactName}
              placeholder="Emergency Contact Name"
              label="Emergency Contact Name"
            />
          </Box>
          <Box width={'50%'} pl={2}>
            <DefaultInput
              name="emergencyContactNo"
              onChange={handleInputChange}
              value={userDetails.emergencyContactNo}
              placeholder="Emergency Contact Number"
              label="Emergency Contact Number"
            />
          </Box>
        </EditInputFlex>

        <ButtonFlex>
          <Box pr={1}>
            <DefaultButton
              onClick={() => set_editActive(!editActive)}
              text="Cancel"
              type="secondary"
            />
          </Box>
          <Box pl={1}>
            <DefaultButton
              onClick={handleUpdateUserDetails}
              loading={loading}
              text="Save"
              type="primary"
            />
          </Box>
        </ButtonFlex>
      </EditProfileModal>
      <Fade in={true}>
        <SettingsCard>
          <SettingsHeader>
            <SettingsLabel style={{ marginBottom: 20, paddingLeft: 20 }}>
              LOGIN
            </SettingsLabel>
          </SettingsHeader>
          <SettingsBox>
            <SettingsLabel>Password</SettingsLabel>
            {!loading ? (
              <>
                <SettingsText>
                  Password changed {password_changed_ago}...
                </SettingsText>
              </>
            ) : (
              <Skeleton
                variant="text"
                height={40}
                width={'30%'}
                animation="wave"
              />
            )}
          </SettingsBox>
          <SettingsHeader>
            <SettingsLabel style={{ marginBottom: 20, paddingLeft: 20 }}>
              SOCIAL ACCOUNTS
            </SettingsLabel>
          </SettingsHeader>
          <SettingsBox>
            <SettingsLabel>Facebook</SettingsLabel>
            {!loading ? (
              <>
                {userDetails.facebookUserId !== null ? (
                  <SettingsText>{userDetails.facebookUserId}</SettingsText>
                ) : (
                  <SettingsText>Not Connected...</SettingsText>
                )}
              </>
            ) : (
              <Skeleton
                variant="text"
                height={40}
                width={'30%'}
                animation="wave"
              />
            )}
          </SettingsBox>
          <SettingsBox>
            <SettingsLabel>Google</SettingsLabel>
            {!loading ? (
              <>
                {userDetails.googleUserId !== null ? (
                  <SettingsText>{userDetails.googleUserId}</SettingsText>
                ) : (
                  <SettingsText>Not Connected...</SettingsText>
                )}
              </>
            ) : (
              <Skeleton
                variant="text"
                height={40}
                width={'30%'}
                animation="wave"
              />
            )}
          </SettingsBox>
          <SettingsBox>
            <SettingsLabel>Instagram</SettingsLabel>
            {!loading ? (
              <>
                {userDetails.instagramUserId !== undefined ? (
                  <SettingsText>{userDetails.instagramUserId}</SettingsText>
                ) : (
                  <SettingsText>Not Connected...</SettingsText>
                )}
              </>
            ) : (
              <Skeleton
                variant="text"
                height={40}
                width={'30%'}
                animation="wave"
              />
            )}
          </SettingsBox>
          <br />
        </SettingsCard>
      </Fade>
      <br />
      <SettingsCard>
        <SettingsBox style={{ padding: 72 }}>
          <SettingsHeader
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
            }}
          >
            <SettingsLabel style={{ marginBottom: 20, textAlign: 'left' }}>
              VERIFICATION
            </SettingsLabel>
            <SettingsText style={{ textAlign: 'left' }}>
              Verifying your account helps keep the Waterpin community secure.
            </SettingsText>
          </SettingsHeader>
          <VerifyBox>
            <Box>
              <SettingsText>Identity</SettingsText>
            </Box>
            <Box>
              <EditLink>Upload</EditLink>
            </Box>
          </VerifyBox>
          <VerifyBox>
            <Box>
              <SettingsText>Phone Number</SettingsText>
            </Box>
            <Box>
              <EditLink>Verify</EditLink>
            </Box>
          </VerifyBox>
          <VerifyBox>
            <Box>
              <SettingsText>Email</SettingsText>
            </Box>
            <Box>
              <EditLink>Verify</EditLink>
            </Box>
          </VerifyBox>
          <SettingsHeader style={{ alignItems: 'center', textAlign: 'left' }}>
            <SettingsLabel style={{ marginBottom: 20, textAlign: 'left' }}>
              2-Step Authentication
            </SettingsLabel>
            <Switch
              inputProps={{ 'aria-label': 'twoStepAuth' }}
              checked={checked}
              onChange={handletoggleClick}
            />
          </SettingsHeader>
          <SettingsText style={{ textAlign: 'left' }}>
            2 Step Authentication adds a layer of security to your account. When
            turned on, you will need to enter your password plus a verification
            code every time you log-in.
          </SettingsText>
        </SettingsBox>
      </SettingsCard>
    </>
  );
}

const VerifyBox = styled.div`
  display: flex;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 10px;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonFlex = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 15px;
`;

const EditInputFlex = styled.div`
  display: flex;
  width: 100%;
`;

const EditLink = styled.a`
  text-decoration-line: underline;
  font-family: GilroyMedium;
  font-size: 16px;
  line-height: 19px;
  color: #4285f4;
  padding-right: 10px;
`;
